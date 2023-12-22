import { Box, Heading, IconButton, Image, Spinner, Stack, Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, FormLabel, Input, ModalFooter, Button, HStack, Link } from "@chakra-ui/react"
import axios from "axios";
import { useEffect, useState } from "react";
import { Link as ReactRouterDom } from "react-router-dom";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons"
import Pagination from "../Components/Pagination";
import ErrorIndicator from "../Components/ErrorIndicator";

const Adminhome = () => {
    const [productData, setProductData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [editedImageLinks, setEditedImageLinks] = useState([]);
    const limit = 10;
    const [totalData, setTotalData] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [editedProduct, setEditedProduct] = useState(null);
    const [err, setErr] = useState(false);

    let url = new URL("https://64e37895bac46e480e78da47.mockapi.io/Products");
    const fetchTheData = () => {
        setLoading(true);
        url.searchParams.append("page", page);
        url.searchParams.append('limit', 10);
        axios.get(url)
            .then((res) => {
                setProductData(res.data);
                setLoading(false);
                setErr(false);
            })
            .catch((err) => {
                setErr(true)
                setProductData([]);
                setLoading(false);
            })
    }
    const handlePageChange = (value) => {
        setPage(value);
    }
    const handleEditClick = (product) => {
        setSelectedProduct(product);
        setEditedProduct({
            ...product,
            images: [...product.images]
        });
        setEditedImageLinks([...product.images]);
        setIsModalOpen(true);
    };
    let url1 = new URL("https://64e37895bac46e480e78da47.mockapi.io/Products");
    const allthedata = () => {
        axios.get(url1)
            .then((res) => {
                setTotalData(res.data.length);
            })
            .catch((err) => {
                setErr(err)
            })
    }
    useEffect(() => {
        fetchTheData();
        allthedata();
    }, [page])
    const handleInputChange = (e) => {
        setEditedProduct({
            ...editedProduct,
            [e.target.name]: e.target.value
        });
    };
    const handleImageLinkChange = (event, i) => {
        const { value } = event.target;
        setEditedImageLinks(prevLinks => {
            const updatedLinks = [...prevLinks];
            updatedLinks[i] = value;
            return updatedLinks;
        });
    };
    const handleUpdateClick = () => {
        if (editedProduct) {
            const productToUpdate = {
                ...editedProduct,
                images: editedImageLinks
            };
            axios.put(`https://64e37895bac46e480e78da47.mockapi.io/Products/${editedProduct.id}`, productToUpdate)
                .then(response => {
                    setIsModalOpen(false);
                    fetchTheData();
                })
                .catch(error => {
                    console.error("Error updating product:", error);
                });
        }
    };
    const handleDelete = (id) => {
        axios.delete(`https://64e37895bac46e480e78da47.mockapi.io/Products/${id}`)
            .then(() => fetchTheData())
            .catch((err) => setErr(err))
    }
    if (loading) {
        return <Spinner size={"xl"} mt={250} />
    }
    if (err) {
        return <ErrorIndicator />
    }
    return <>
        <Box>
            <Link as={ReactRouterDom} to={"/admin/users"} textDecoration="none" _hover={{ textDecoration: "none" }}>
                <Button mt={5} bg={"#426800"} color={"whiteAlpha.900"}>Show Users</Button>
            </Link>
            <Stack mt={5}>
                <Stack justifyContent={"center"} direction={["column", "column", 'row']}>
                    <Heading color="#426800">Product Details</Heading>
                    <Link as={ReactRouterDom} to={"/admin/productform"} position={["relative", "relative", "absolute"]} right={2} textDecoration="none" _hover={{ textDecoration: "none" }}>
                        <Button backgroundColor={"#426800"} color={"white"}>Add Product</Button>
                    </Link>
                </Stack>
                <TableContainer w={"100%"} m={"auto"}>
                    <Table variant='simple'>
                        <Thead bg={"green.50"} m={"auto"}>
                            <Tr>
                                <Th textAlign={"center"}>ID</Th>
                                <Th textAlign={"center"}>Image</Th>
                                <Th textAlign={"center"}>Title</Th>
                                <Th textAlign={"center"} isNumeric>Stock</Th>
                                <Th textAlign={"center"}>Category</Th>
                                <Th textAlign={"center"}>Rating</Th>
                                <Th textAlign={"center"}>Price</Th>
                                <Th textAlign={"center"}>EDIT</Th>
                                <Th textAlign={"center"} bg={"red.500"} color={"white"}>Delete</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {productData.length > 0 && productData.map((item) => {
                                return <Tr key={item.id}>
                                    <Td textAlign={"center"}>{item.id}.</Td>
                                    <Td textAlign={"center"} m={"auto"}>
                                        <Image src={item.images[0]} w={"150px"} m={"auto"} />
                                    </Td>
                                    <Td fontSize={"xl"} textAlign={"center"}>{item.title}</Td>
                                    <Td textAlign={"center"}>{item.stock}</Td>
                                    <Td textAlign={"center"}>{item.category}</Td>
                                    <Td textAlign={"center"}>{item.rating}⭐</Td>
                                    <Td textAlign={"center"}>₹{item.price}</Td>
                                    <Td textAlign={"center"}>
                                        <IconButton m={"auto"} icon={<EditIcon />} onClick={() => handleEditClick(item)} />
                                    </Td>
                                    <Td textAlign={"center"}>
                                        <IconButton icon={<DeleteIcon />} onClick={() => { handleDelete(item.id) }} bg={"red.500"} color={"white"} />
                                    </Td>
                                </Tr>
                            })}

                        </Tbody>
                        <Tfoot>

                        </Tfoot>
                    </Table>
                </TableContainer>
                <Pagination totalData={totalData} handlePageChange={handlePageChange} page={page} limit={limit} />
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} scrollBehavior={"inside"}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Edit Product</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            {selectedProduct && (
                                <>
                                    <form>
                                        <FormLabel>ID :- {editedProduct.id}</FormLabel>
                                        <FormLabel>Name :-
                                            <Input value={editedProduct.title} name="title" onChange={(e) => handleInputChange(e)} />
                                        </FormLabel>
                                        <FormLabel>Stock :-
                                            <Input value={editedProduct.stock} name="stock" onChange={(e) => handleInputChange(e)} />
                                        </FormLabel>
                                        <FormLabel>Category :-
                                            <Input value={editedProduct.category} name="category" onChange={(e) => handleInputChange(e)} />
                                        </FormLabel>
                                        <FormLabel>rating :-
                                            <Input value={editedProduct.rating} name="rating" onChange={(e) => handleInputChange(e)} />
                                        </FormLabel>
                                        <FormLabel>Popular :-
                                            <Input value={editedProduct.popular} name="popular" onChange={(e) => handleInputChange(e)} />
                                        </FormLabel>
                                        <FormLabel>Price :-
                                            <Input value={editedProduct.price} name="price" onChange={(e) => handleInputChange(e)} />
                                        </FormLabel>
                                        {editedImageLinks.map((link, index) => (
                                            <FormLabel key={index}>Image {index + 1} :-
                                                <Input value={link} onChange={(e) => handleImageLinkChange(e, index)} />
                                            </FormLabel>
                                        ))}
                                    </form>
                                </>
                            )}
                        </ModalBody>
                        <ModalFooter>
                            <Button bg={"#426800"} color={"white"} onClick={handleUpdateClick}>Save Changes</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Stack>
        </Box>
    </>
}
export default Adminhome