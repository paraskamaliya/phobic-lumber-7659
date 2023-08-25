import React, { useContext } from "react";
import { Card, CardBody, CardFooter, Link, Image, Text, Button } from "@chakra-ui/react";
import { Link as ReactRouterDom, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContextProvider";
import axios from "axios";

const ProductCard = ({ images, title, rating, price, id, popular }) => {
    const { isAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const updateTheCart = async (product) => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const updatedCart = [...user.cart, product];
            const response = await axios.put(`https://64e37895bac46e480e78da47.mockapi.io/Users/${user.id}`, {
                cart: updatedCart
            });

            if (response.status === 200) {
                localStorage.setItem("user", JSON.stringify({ ...user, cart: updatedCart }));
                console.log("Cart updated successfully.");
            } else {
                console.error("Failed to update cart.");
            }
        } catch (error) {
            console.error("Error updating the cart:", error);
        }
    };

    const handleClick = (productId, quantity) => {
        const product = { id: productId, quantity: quantity };
        updateTheCart(product);
    };

    const updateTherecent = async (productId) => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const updatedRecent = [...user.recent, productId];
            const response = await axios.put(`https://64e37895bac46e480e78da47.mockapi.io/Users/${user.id}`, {
                recent: updatedRecent
            });

            if (response.status === 200) {
                localStorage.setItem("user", JSON.stringify({ ...user, recent: updatedRecent }));
                console.log("Recent updated successfully.");
            } else {
                console.error("Failed to update Recent.");
            }
        } catch (error) {
            console.error("Error updating the recent:", error);
        }
    };

    const handlerecent = (productId) => {
        if (!isAuth) {
            navigate("/login");
        } else {
            navigate(`/products/${productId}`)
            updateTherecent(productId);
        }
    };

    return (
        <Card>
            <CardBody onClick={() => handlerecent(id)} position={"relative"}>
                <Link as={ReactRouterDom} textDecoration="none" _hover={{ textDecoration: "none" }}>
                    <Image src={images[0]} h="400px" />
                    {popular == "true" && <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
                        <Text bg={"#FED02F"} letterSpacing={1} p={"1"}>POPULAR</Text>
                    </div>}
                    <Text fontSize="xl" textAlign="left" fontWeight={500}>{title}</Text>
                    <Text textAlign="left">{rating} ⭐</Text>
                    <Text textAlign="left" fontSize="md" fontWeight={500}>₹ {price}</Text>
                </Link>
            </CardBody>
            <CardFooter>
                <Button bg="#426800" color="white" onClick={() => handleClick(id, 1)}>Add to Cart</Button>
            </CardFooter>
        </Card>
    );
};

export default ProductCard;
