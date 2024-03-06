import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import LoaderComponent from "../Loader/loader";
import { Helmet } from "react-helmet";


export default function CartPage() {
    const [cart, setCart] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchCartData = async () => {
        setIsLoading(true);
        try {
            const response = await fetch("https://yomnaelshorbagy.onrender.com/usercart", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Server responded with ${response.status}`);
            }

            const data = await response.json();
            setCart(data.data.cart);
        } catch (error) {
            setError(error.message);
            console.error("Error fetching cart data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCartData();
    }, []);

    const updateCart = async (productId, count, cartId) => {
        try {
            const response = await fetch(`https://yomnaelshorbagy.onrender.com/${cartId}/${productId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ count }),               
            });

            if (!response.ok) {
                throw new Error(`Server responded with ${response.status}`);
            }

            fetchCartData();
        } catch (error) {
            setError(error.message);
            console.error("Error updating cart:", error);
        }
    };

    const increaseQuantity = (item) => {
        const updatedCount = item.count + 1;
        updateCart(item.product._id, updatedCount, item._id);
    };

    if (isLoading) return <div><LoaderComponent /></div>;
    if (error) return <div>Error: {error}</div>;
    if (!cart || cart.length === 0) return <div>Your cart is empty</div>;

    return (<>
       <Helmet>
        <title>cart page</title>
        <meta name="description" content="Your page description" />
      </Helmet>

        <div className="cart-page">
            <div className="container">
                <h1>Your Cart</h1>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((item) => (
                            <tr key={item.product._id}>
                                <td>{item.product.productName}</td>
                                <td>
                                    <input
                                        type="number"
                                        value={item.count}
                                        onChange={(e) => updateCart(item.product._id, e.target.value, item._id)}
                                    />
                                    <Button variant="primary" onClick={() => increaseQuantity(item)}>+</Button>
                                </td>
                                <td>${item.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Button variant="primary" className="btn btn-primary">Proceed to Checkout</Button>
            </div>
        </div>
        </>
    );
}
