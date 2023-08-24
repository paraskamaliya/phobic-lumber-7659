import React, { useContext } from "react";
import { Card, CardBody, CardFooter, Link, Image, Text, Button } from "@chakra-ui/react";
import { Link as ReactRouterDom, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContextProvider";
import axios from "axios";

const ProductCard = ({ images, title, rating, price, id }) => {
    const { isAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const updateTheCart = async (productId) => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const updatedCart = [...user.cart, productId];
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

    const handleClick = (productId) => {
        if (!isAuth) {
            navigate("/login");
        } else {
            updateTheCart(productId);
        }
    };

    return (
        <Card>
            <CardBody>
                <Link as={ReactRouterDom} to={`/products/${id}`} textDecoration="none" _hover={{ textDecoration: "none" }}>
                    <Image src={images[0]} h="400px" />
                    <Text fontSize="xl" textAlign="left" fontWeight={500}>{title}</Text>
                    <Text textAlign="left">{rating} ⭐</Text>
                    <Text textAlign="left" fontSize="md" fontWeight={500}>₹ {price}</Text>
                </Link>
            </CardBody>
            <CardFooter>
                <Button bg="#426800" color="white" onClick={() => handleClick(id)}>Add to Cart</Button>
            </CardFooter>
        </Card>
    );
};

export default ProductCard;
