
import React, { useState, useEffect } from "react";
import { useParams , useNavigate} from "react-router-dom";
import LoaderComponent from "../Loader/loader";
import { Helmet } from "react-helmet";

export default function ProductDetail() {
    let { id: productId } = useParams();
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProductDetails = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`https://yomnaelshorbagy.onrender.com/products/${productId}`);
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(`Server responded with ${response.status}: ${errorData.message}`);
                }
                const data = await response.json();
                setProduct(data.product); 
            } catch (err) {
                setError(err.message);
                console.error("Error fetching product details:", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProductDetails();
    }, [productId]);



    const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to add items to the cart.");
      return;
    }

    try {
      const response = await fetch(
        "https://yomnaelshorbagy.onrender.com/usercart",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"  
          },
          body: JSON.stringify({
            cart: [
              {
                product: productId,
                count: 1,
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        const errorBody = await response.text();
        console.error("Server Error Response:", errorBody);
        throw new Error("Failed to add item to cart");
      }

      const data = await response.json();
      console.log("Server Response:", data);
      alert("Item added to cart successfully");
      navigate("/cart");
    } catch (error) {
      console.error("Error adding item to cart:", error);
      alert(error.message);
    }
  };

    if (isLoading) return <div><LoaderComponent/></div>;
    if (error) return <div>Error: {error}</div>;
    if (!product) return <div>No product found</div>;

    return (<>
      <Helmet>
      <title>Product details</title>
      <meta name="description" content="Your page description" />
    </Helmet>
        <div className="product-detail">
            <div className="container my-5">
                <div className="row">
                    <div className="col-md-6">
                    <div className="img-container" style={{ width: '300px', height: '400px' }}>
                        <img
                            src={product.productImage}
                            alt={product.productName}
                            className="img-fluid product-image"
                        />
                    </div>
                    </div>
                    <div className="col-md-6">
                        <h2>{product.productName}</h2>
                        <p className="fw-bold">Price: ${product.ProductPrice}</p>
                        <p className="fw-bold">Discount: {product.discount}%</p>
                        <p className="fw-bold">Price After Discount: ${product.priceAfterDiscount}</p>
                        <p className="fw-bold">Stock: {product.stock}</p>

                        <div className="mt-4">
                            <button className="btn btn-primary" onClick={handleAddToCart}>
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}
