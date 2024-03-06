import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { Container, Row, Col, Card, Carousel, Dropdown, Button } from 'react-bootstrap';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { changeLoader } from '../../Store/action/loaderAction';
import LoaderComponent from '../Loader/loader';

export default function Product() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const loader = useSelector((state) => state.loader.loader);
  const dispatch = useDispatch();


  async function getData() {
    try {
          dispatch(changeLoader(false))
      const productsResponse = await axios.get("https://yomnaelshorbagy.onrender.com/products");
      setProducts(productsResponse.data.products);
      
      const categoriesResponse = await axios.get("https://yomnaelshorbagy.onrender.com/category");
      setCategories(categoriesResponse.data.categories);
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

  // const handleAddToCart = async (productId) => {
  //   try {
  //     const updatedProducts = products.map(product => {
  //       if (product._id === productId && product.stock > 0) {
  //         return { ...product, stock: product.stock - 1 };
  //       }
  //       return product;
  //     });
  
  //     setProducts(updatedProducts);
  
  //     const productToUpdate = products.find(p => p._id === productId);
  
  //     await axios.put(`http://localhost:5000/products/${productId}`, { stock: productToUpdate.stock });
  //   } catch (error) {
  //     console.error("Error updating stock:", error);
  //   }
  // };

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
            <Carousel className="mt-3">
              {categories.map((category, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100"
                    src={category.image}
                    alt={category.categoryName}
                  />
                  <Carousel.Caption>
                    <h3>{category.categoryName}</h3>
                    <p>{category.description}</p>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
         



              { !loader ? (<LoaderComponent/>): (<>


          <Col md={9}>
            <Row>
              {products
                .filter(product => !selectedCategory || product.category === selectedCategory)
                .map((product, index) => (
                  <Col key={index} md={4} className="mb-4">
                    <Card className="product-card">
                      
                      <Card.Img variant="top" src={product.productImage} alt="Product" className="product-image" />
                      <Card.Body>
                        <Card.Title>{product.productName}</Card.Title>
                        <Card.Text>Price: {product.ProductPrice}</Card.Text>
                        <Card.Text>In Stock: {product.stock}</Card.Text>
                        <Link to={`/products/${product._id}`} className="btn btn-primary">View Details</Link>
                        {/* <Button 
                          variant="primary" 
                          disabled={product.stock === 0}
                          onClick={() => handleAddToCart(product._id)}
                          className=' float-end'
                        >
                          <i class="fa-solid fa-cart-shopping"></i>
                        </Button> */}
                      </Card.Body>
                    </Card>
                  </Col>
              ))} 
            </Row>
          </Col>

</>)}

        </Row>
      </Container>

    </>
  );
}
