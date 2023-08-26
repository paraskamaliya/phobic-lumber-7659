import { Box, Button, Heading, Input, VStack, useToast } from "@chakra-ui/react"
import axios from "axios"
import { useState } from "react"

const ProductForm = () => {
    const toast = useToast();
    const [newData, setNewData] = useState({
        title: "",
        price: "",
        stock: "",
        category: "",
        images: new Array(4).fill(""),
        description: "",
        boxImage: "",
        boxContent: new Array(4).fill(""),
        rating: "",
        popular: false
    })
    const handleChange = (e) => {
        setNewData({
            ...newData,
            [e.target.name]: e.target.type === "number" ? +(e.target.value) : e.target.value
        })
    }
    const handleClick = () => {
        axios.post(`https://64e37895bac46e480e78da47.mockapi.io/Products`, {
            ...newData
        })
            .then((res) => {
                if (res.status === 201) {
                    toast({
                        title: 'New Product added successfully',
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                    });
                    setNewData({
                        ...newData,
                        title: "",
                        price: "",
                        stock: "",
                        category: "",
                        images: new Array(4).fill(""),
                        description: "",
                        boxImage: "",
                        boxContent: new Array(4).fill(""),
                        rating: "",
                        popular: false
                    })
                }
                else {
                    toast({
                        title: 'New Product is not added',
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                    })
                }
            })
            .catch((err) => console.log(err))
    }
    return (
        <Box mt={5}>
            <Heading color="#426800">Add new Product</Heading>
            <VStack w={"60%"} m={"auto"} mt={5}>
                <Input placeholder="Enter Title of Product" value={newData.title} name="title" onChange={(e) => handleChange(e)} />

                <Input placeholder="Enter Price of Product" value={newData.price} type="number" name="price" onChange={(e) => handleChange(e)} />

                <Input placeholder="Enter Stock of Product" value={newData.stock} name="stock" onChange={(e) => handleChange(e)} />

                <Input placeholder="Enter Category of Product" value={newData.category} name="category" onChange={(e) => handleChange(e)} />

                <Input placeholder="Enter Description of Product" value={newData.description} name="description" onChange={(e) => handleChange(e)} />

                <Input placeholder="Enter Box image link of Product" value={newData.boxImage} name="boxImage" onChange={(e) => handleChange(e)} />

                <Input placeholder="Enter Rating of Product" value={newData.rating} name="rating" onChange={(e) => handleChange(e)} />

                <Input placeholder="Enter Popularity of Product" value={newData.popular} name="popular" onChange={(e) => handleChange(e)} />

                <Input
                    placeholder="Enter 1st Image link of Product"
                    value={newData.images[0]}
                    name="images[0]"
                    onChange={(e) => {
                        const updatedImages = [...newData.images];
                        updatedImages[0] = e.target.value;
                        setNewData({
                            ...newData,
                            images: updatedImages
                        });
                    }}
                />

                <Input
                    placeholder="Enter 2nd Image link of Product"
                    value={newData.images[1]}
                    onChange={(e) => {
                        const updatedImages = [...newData.images];
                        updatedImages[1] = e.target.value;
                        setNewData({
                            ...newData,
                            images: updatedImages
                        });
                    }}
                />

                <Input placeholder="Enter 3st Image link of Product" value={newData.images[2]} onChange={(e) => {
                    const updatedImages = [...newData.images];
                    updatedImages[2] = e.target.value;
                    setNewData({
                        ...newData,
                        images: updatedImages
                    });
                }} />

                <Input placeholder="Enter 4st Image link of Product" value={newData.images[3]} onChange={(e) => {
                    const updatedImages = [...newData.images];
                    updatedImages[3] = e.target.value;
                    setNewData({
                        ...newData,
                        images: updatedImages
                    });
                }} />

                <Input placeholder="Enter 1st line of Box content Product" value={newData.boxContent[0]} onChange={(e) => {
                    const updatedBoxContent = [...newData.boxContent];
                    updatedBoxContent[0] = e.target.value;
                    setNewData({
                        ...newData,
                        boxContent: updatedBoxContent
                    });
                }} />

                <Input placeholder="Enter 2st line of Box content Product" value={newData.boxContent[1]} onChange={(e) => {
                    const updatedBoxContent = [...newData.boxContent];
                    updatedBoxContent[1] = e.target.value;
                    setNewData({
                        ...newData,
                        boxContent: updatedBoxContent
                    });
                }} />

                <Input placeholder="Enter 3st line of Box content Product" value={newData.boxContent[2]} onChange={(e) => {
                    const updatedBoxContent = [...newData.boxContent];
                    updatedBoxContent[2] = e.target.value;
                    setNewData({
                        ...newData,
                        boxContent: updatedBoxContent
                    });
                }} />

                <Input placeholder="Enter 4st line of Box content Product" value={newData.boxContent[3]} onChange={(e) => {
                    const updatedBoxContent = [...newData.boxContent];
                    updatedBoxContent[3] = e.target.value;
                    setNewData({
                        ...newData,
                        boxContent: updatedBoxContent
                    });
                }} />

                <Button bg={"#426800"} color={"white"} onClick={handleClick}>Add Product</Button>
            </VStack>
        </Box>
    )
}
export default ProductForm