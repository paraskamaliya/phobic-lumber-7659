import { Box, Heading, IconButton, Image, Spinner, Stack, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, FormControl, FormLabel, Input, ModalFooter, Button } from "@chakra-ui/react"
import axios from "axios";
import { useEffect, useState } from "react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons"
import Pagination from "../Components/Pagination";
import ErrorIndicator from "../Components/ErrorIndicator";

const Adminhome = () => {
    const [productData, setProductData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [editedImageLinks, setEditedImageLinks] = useState([]);
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
                setErr("");
            })
            .catch((err) => {
                setErr(err)
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
            <Stack mt={10}>
                <Heading color="#426800">Product Details</Heading>
                <TableContainer w={"80%"} m={"auto"}>
                    <Table variant='simple'>
                        <Thead bg={"green.50"} m={"auto"}>
                            <Tr>
                                <Th>ID</Th>
                                <Th>Image</Th>
                                <Th>Name</Th>
                                <Th isNumeric>Stock</Th>
                                <Th>Category</Th>
                                <Th>Rating</Th>
                                <Th>Price</Th>
                                <Th>EDIT</Th>
                                <Th bg={"red.500"} color={"white"}>Delete</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {productData.length > 0 && productData.map((item) => {
                                return <Tr key={item.id}>
                                    <Td>{item.id}.</Td>
                                    <Td>
                                        <Image src={item.images[0]} w={"150px"} />
                                    </Td>
                                    <Td fontSize={"xl"}>{item.title}</Td>
                                    <Td>{item.stock}</Td>
                                    <Td>{item.category}</Td>
                                    <Td>{item.rating}⭐</Td>
                                    <Td>₹{item.price}</Td>
                                    <Td>
                                        <IconButton icon={<EditIcon />} onClick={() => handleEditClick(item)} />
                                    </Td>
                                    <Td>
                                        <IconButton icon={<DeleteIcon />} onClick={() => { handleDelete(item.id) }} bg={"red.500"} color={"white"} />
                                    </Td>
                                </Tr>
                            })}

                        </Tbody>
                        <Tfoot>

                        </Tfoot>
                    </Table>
                </TableContainer>
                <Pagination totalData={totalData} handlePageChange={handlePageChange} page={page} />
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