import React, { useContext } from "react";
import { Card, CardBody, CardFooter, Link, Image, Text, Button, useToast } from "@chakra-ui/react";
import { Link as ReactRouterDom, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContextProvider";
import axios from "axios";
import { IoCartOutline } from "react-icons/io5";

const ProductCard = ({ images, title, rating, price, id, popular, category }) => {
    const { isAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const toast = useToast();

    const updateTheCart = async (updatedCart) => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const response = await axios.put(`https://64e37895bac46e480e78da47.mockapi.io/Users/${user.id}`, {
                cart: updatedCart
            });

            if (response.status === 200) {
                localStorage.setItem("user", JSON.stringify({ ...user, cart: updatedCart }));
                toast({
                    title: 'Cart updated successfully',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                toast({
                    title: 'Error updating the cart',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error("Error updating the cart:", error);
        }
    };

    const handleClick = (productId, quantity) => {
        if (!isAuth) {
            navigate("/login");
            return;
        }
        const user = JSON.parse(localStorage.getItem("user"));
        const existingProduct = user.cart?.find(product => product.id === productId);

        if (existingProduct) {
            const updatedCart = user.cart.map(product =>
                product.id === productId ? { ...product, quantity: product.quantity + quantity } : product
            );
            updateTheCart(updatedCart);
        } else {
            const product = {
                id: productId,
                image: images[0],
                title: title,
                category: category,
                rating: rating,
                price: price,
                quantity: quantity
            };
            const updatedCart = [...user.cart, product];
            updateTheCart(updatedCart);
        }
    };

    const updateTheRecent = async (updatedRecent) => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const response = await axios.put(`https://64e37895bac46e480e78da47.mockapi.io/Users/${user.id}`, {
                recent: updatedRecent
            });
            if (response.status === 200) {
                localStorage.setItem("user", JSON.stringify({ ...user, recent: updatedRecent }));
            }
        }
        catch {
            console.log("Error")
        }
    };

    const handlerecent = (productId, quantity) => {
        if (!isAuth) {
            navigate("/login");
            return;
        }
        const user = JSON.parse(localStorage.getItem("user"));
        const existingProduct = user.recent?.find(product => product.id === productId);

        if (existingProduct) {
            navigate(`/products/${productId}`)
        } else {
            const product = {
                id: productId,
                image: images[0],
                title: title,
                category: category,
                rating: rating,
                price: price,
                quantity: 1
            };
            const updatedRecent = [product, ...user.recent];
            updateTheRecent(updatedRecent);
            navigate(`/products/${productId}`)
        }
    };

    return (
        <Card boxShadow={"lg"}>
            <CardBody mb={"auto"} onClick={() => handlerecent(id)} position={"relative"}>
                <Link as={ReactRouterDom} textDecoration="none" _hover={{ textDecoration: "none" }}>
                    <Image src={images[0]} h="400px" m={"auto"} justifySelf={"center"} />
                    {popular === "true" && <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
                        <Text bg={"#FED02F"} letterSpacing={1} p={"1"}>POPULAR</Text>
                    </div>}
                    <Text fontSize="xl" textAlign="left" fontWeight={500}>{title}</Text>
                    <Text textAlign="left">{rating} ⭐</Text>
                    <Text textAlign="left" fontSize="md" fontWeight={500}>₹ {price}</Text>
                </Link>
            </CardBody>
            <CardFooter mt={"auto"}>
                <Button bg="#426800" leftIcon={<IoCartOutline />} color="white" onClick={() => handleClick(id, 1)}>Add to Cart</Button>
            </CardFooter>
        </Card>
    );
};

export default ProductCard;
