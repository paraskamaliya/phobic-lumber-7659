import { Box, Button, Flex, HStack, Heading, IconButton, Image, Input, Spacer, Stack, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { AddIcon, DeleteIcon, MinusIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
const Cartpage = () => {
    const [cartData, setCartData] = useState([]);
    const [id, setId] = useState();
    const navigate = useNavigate();
    const fetchCartData = () => {
        const data = JSON.parse(localStorage.getItem("user"))
        setCartData(data.cart);
        setId(data.id);
    }
    const increaseQuantity = (productId) => {
        const updatedCart = cartData.map((product) =>
            product.id === productId ? { ...product, quantity: product.quantity + 1 } : product
        );
        setCartData(updatedCart);
        calculateTotalAmount();
        updateCartAPI(updatedCart);
    };
    const deleteProduct = async (productId) => {
        const updatedCart = cartData.filter(product => product.id !== productId);
        setCartData(updatedCart);
        calculateTotalAmount();
        updateCartAPI(updatedCart);
    };
    const updateCartAPI = async (updatedCart) => {
        try {
            const data = JSON.parse(localStorage.getItem("user"));
            data.cart = updatedCart;

            const response = await axios.put(`https://64e37895bac46e480e78da47.mockapi.io/Users/${id}`, data);

            localStorage.setItem("user", JSON.stringify(data));

        } catch (error) {
            console.error("Error updating cart:", error);
        }
    };
    const decreaseQuantity = (productId) => {
        const updatedCart = cartData.map((product) =>
            product.id === productId && product.quantity > 1 ? { ...product, quantity: product.quantity - 1 } : product
        );
        setCartData(updatedCart);
        calculateTotalAmount();
        updateCartAPI(updatedCart);
    };
    const calculateTotalQuantity = () => {
        return cartData.reduce((total, product) => total + product.quantity, 0);
    };
    const calculateTotalAmount = () => {
        let amount = cartData.reduce((total, product) => total + product.quantity * product.price, 0);
        localStorage.setItem("amount", JSON.stringify(amount))
        return amount;
    };

    useEffect(() => {
        fetchCartData();
        let amount = calculateTotalAmount();
        document.title = "Cart | E-Plant"
    }, []);
    return <Box minHeight={"90vh"} bg={"#fff6f4"}>
        {
            cartData.length == 0 ?
                <Flex height={"83vh"} alignItems={"center"} justifyContent={"center"}>
                    <Heading color={"#426800"} >Oops! Your cart is empty.</Heading>
                </Flex> :
                <Box>
                    <Heading color={"#426800"} p={3}>Cart Page</Heading>
                    <TableContainer w={"90%"} m={"auto"} borderRadius={"15px"} mt={5} border={"1px solid #426800"}>
                        <Table >
                            <Thead>
                                <Tr bg={"green.50"}>
                                    <Th textAlign={"center"}>ID</Th>
                                    <Th textAlign={"center"}>Image</Th>
                                    <Th textAlign={"center"}>Title</Th>
                                    <Th textAlign={"center"}>Quantity</Th>
                                    <Th textAlign={"center"}>Category</Th>
                                    <Th textAlign={"center"}>Rating</Th>
                                    <Th textAlign={"center"}>Price</Th>
                                    <Th textAlign={"center"}>Delete</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {cartData.map((product) => (
                                    <Tr textAlign={"center"} alignItems={"center"} key={product.id} bg={"white"}>
                                        <Td textAlign={"center"}>{product.id}.</Td>
                                        <Td justifySelf={"center"}>
                                            <Image m="auto" src={product.image} alt={product.title} h={"100"} w={"100"} />
                                        </Td>
                                        <Td textAlign={"center"} fontSize={"xl"}>{product.title}</Td>
                                        <Td >
                                            <HStack justify={"center"}>
                                                <IconButton isDisabled={product.quantity === 1} icon={<MinusIcon />} borderRadius={50} bg={"#426800"} color={"white"} onClick={() => decreaseQuantity(product.id)} />
                                                <Text fontSize={"xl"}>{product.quantity}</Text>
                                                <IconButton icon={<AddIcon />} borderRadius={50} bg={"#426800"} color={"white"} onClick={() => increaseQuantity(product.id)} />
                                            </HStack>
                                        </Td>
                                        <Td textAlign={"center"} fontSize={"xl"}>{product.category}</Td>
                                        <Td textAlign={"center"} fontSize={"xl"}>{product.rating}⭐</Td>
                                        <Td textAlign={"center"} fontSize={"xl"}>₹{product.price}</Td>
                                        <Td textAlign={"center"}>
                                            <IconButton
                                                aria-label="Remove from Cart"
                                                icon={<DeleteIcon />}
                                                colorScheme="red"
                                                size="sm"
                                                onClick={() => deleteProduct(product.id)}
                                            />
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                    <Box>
                        <Stack direction={["column", "column", "row"]} m={"auto"} w={"80%"} gap={"20%"}>
                            <Box m={"auto"} w={["80%", "80%", "50%"]}>
                                <Text fontSize={"2xl"}>Total Quantity: {calculateTotalQuantity()}</Text>
                                <Text fontSize={"2xl"}>Total Amount: ₹{calculateTotalAmount()}</Text>
                            </Box>
                        </Stack>
                    </Box>
                    <Button bg={"#426800"} color={"white"} onClick={() => { navigate("/payment") }}>Place Order</Button>
                </Box >
        }
    </Box>
}
export default Cartpage