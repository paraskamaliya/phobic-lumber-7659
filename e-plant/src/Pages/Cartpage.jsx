import { Box, Heading, IconButton, Image, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { DeleteIcon } from "@chakra-ui/icons";

const Cartpage = () => {
    const [cartData, setCartData] = useState([]);
    let products = [];
    const fetchCartData = () => {
        const data = JSON.parse(localStorage.getItem("user"))
        setCartData(data.cart);
    }
    const cartProduct = () => {
        products = [];
        cartData.map((item) => {
            axios.get(`https://64e37895bac46e480e78da47.mockapi.io/Products/${item.id}`)
                .then((res) => console.log(res.data))
                .catch((err) => console.log(err))
        })
    }
    console.log(products)

    // const fetchCartAndProducts = async () => {
    //     const user = JSON.parse(localStorage.getItem("user"));
    //     const id = user.id;

    //     try {
    //         const cartResponse = await axios.get(`https://64e37895bac46e480e78da47.mockapi.io/Users/${id}`);
    //         setCartData(cartResponse.data);

    //         const productRequests = cartResponse.data.cart.map((productId) =>
    //             axios.get(`https://64e37895bac46e480e78da47.mockapi.io/Products/${productId.id}`)
    //         );
    //         const productResponses = await Promise.all(productRequests);
    //         const fetchedProducts = productResponses.map((response) => response.data);
    //         setProducts(fetchedProducts);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };
    useEffect(() => {
        fetchCartData();
        cartProduct();
    }, []);
    return <>
        <Box>
            <Heading color={"#426800"}>Cart Page</Heading>
            <TableContainer>
                <Table>
                    <Thead>
                        <Tr>
                            <Th>ID</Th>
                            <Th>Image</Th>
                            <Th>Title</Th>
                            <Th isNumeric>Quantity</Th>
                            <Th>Category</Th>
                            <Th>Rating</Th>
                            <Th>Price</Th>
                            <Th>Delete</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {products.map((product) => (
                            <Tr >
                                <Td>{product.id}</Td>
                                <Td>
                                    <Image src={product.images[0]} alt={product.title} h={16} w={16} />
                                </Td>
                                <Td>{product.title}</Td>
                                {/* ... */}
                                <Td>
                                    <IconButton
                                        aria-label="Remove from Cart"
                                        icon={<DeleteIcon />}
                                        colorScheme="red"
                                        size="sm"
                                    // onClick={() => removeFromCart(product.id)}
                                    />
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    </>
}
export default Cartpage