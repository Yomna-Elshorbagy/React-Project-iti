
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { Container, Row, Col, Card, Carousel, Dropdown, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { changeLoader } from '../../Store/action/loaderAction';
import LoaderComponent from '../Loader/loader';

export default function Product() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const loader = useSelector((state) => state.loader.loader);
  const dispatch = useDispatch();

  async function getData() {
    try {
      dispatch(changeLoader(false));
      const productsResponse = await axios.get("https://yomnaelshorbagy.onrender.com/products");
      setProducts(productsResponse.data.products);

      const categoriesResponse = await axios.get("https://yomnaelshorbagy.onrender.com/category");
      setCategories(categoriesResponse.data.categories);
      dispatch(changeLoader(true)); 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleCheckboxChange = (categoryId) => {
    const updatedSelectedCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((cat) => cat !== categoryId)
      : [...selectedCategories, categoryId];
    setSelectedCategories(updatedSelectedCategories);
  };

  return (
    <>
      <Helmet>
        <title>Product page</title>
        <meta name="description" content="Your page description" />
      </Helmet>

      <Container className="py-5">
        <h1 className="text-center">Latest products</h1>
        <hr />
        <Row>
          <Col md={3}>
            <Dropdown>
              <Dropdown.Toggle variant="primary" id="categoryDropdown">
                Select Category
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {categories.map((category, index) => (
                  <Dropdown.Item
                    key={index}
                    onClick={() => handleCategorySelect(category._id)}
                  >
                    {category.categoryName}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <Form className="mt-3">
              {categories.map((category, index) => (
                <Form.Check
                  key={index}
                  type="checkbox"
                  id={`checkbox-${category._id}`}
                  label={category.categoryName}
                  onChange={() => handleCheckboxChange(category._id)}
                />
              ))}
            </Form>
            <Carousel className="mt-3">
              {categories.map((category, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100"
                    src={category.image}
                    alt={category.categoryName}
                    style={{ height: '300px', objectFit: 'cover' }} 
                  />
                  <Carousel.Caption>
                    <h3>{category.categoryName}</h3>
                    <p>{category.description}</p>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>

          {!loader ? (
            <LoaderComponent />
          ) : (
            <Col md={9}>
              <Row>
                {products
                  .filter(
                    (product) =>
                      (!selectedCategory || product.category === selectedCategory) &&
                      (selectedCategories.length === 0 ||
                        selectedCategories.includes(product.category))
                  )
                  .map((product, index) => (
                    <Col key={index} md={4} className="mb-4">
                      <Card className="product-card">
                        <Card.Img
                          variant="top"
                          src={product.productImage}
                          alt="Product"
                          className="product-image"
                        />
                        <Card.Body>
                          <Card.Title>{product.productName}</Card.Title>
                          <Card.Text>Price: {product.ProductPrice}</Card.Text>
                          <Card.Text>In Stock: {product.stock}</Card.Text>
                          <Link
                            to={`/products/${product._id}`}
                            className="btn btn-primary"
                          >
                            View Details
                          </Link>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
              </Row>
            </Col>
          )}   
        </Row>
      </Container>
    </>
  );
}
