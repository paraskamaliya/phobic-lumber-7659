import { Box, Image, Spinner, Stack, HStack, Heading, Text, Input, Button, IconButton, VStack, ListItem, UnorderedList, useToast, Spacer, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, SimpleGrid, Flex, Textarea, Avatar } from "@chakra-ui/react"
import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { MinusIcon, AddIcon, ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"
import Footer from "../Components/Footer";
import { IoCartOutline } from "react-icons/io5";
import { AuthContext } from "../Context/AuthContextProvider";

const Productpage = () => {
    const [productData, setProductData] = useState([]);
    const { isAuth } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [currImage, setCurrImage] = useState(0);
    const { id } = useParams();
    const [qty, setQty] = useState(1);
    const [estiDeli, setEstiDeli] = useState("");
    const [pin, setPin] = useState("");
    const [userData, setUserData] = useState([]);
    const toast = useToast();
    const [startIndex, setStartIndex] = useState(0);

    const [comment, setComment] = useState("");

    const handleNext = () => {
        const nextIndex = startIndex + 1;
        setStartIndex(Math.min(nextIndex, userData.recent.length - 1));
    };

    const handlePrev = () => {
        const prevIndex = startIndex - 1;
        setStartIndex(Math.max(prevIndex, 0));
    };
    const fetchTheProduct = async (id) => {
        setLoading(true);
        try {
            let res = await axios.get(`https://64e37895bac46e480e78da47.mockapi.io/Products/${id}`)
            setProductData(res.data);
            setLoading(false);
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    const handleCheck = () => {
        if (pin !== "") {
            setEstiDeli("Estimated delivery : In 2 Days")
        }
        else {
            setEstiDeli("Please Enter Pin Code")
        }
    }
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
        const user = JSON.parse(localStorage.getItem("user"));
        const existingProduct = user.cart.find(product => product.id === productId);

        if (existingProduct) {
            const updatedCart = user.cart.map(product =>
                product.id === productId ? { ...product, quantity: product.quantity + quantity } : product
            );
            updateTheCart(updatedCart);
        } else {
            const product = {
                id: productId,
                image: productData.images[0],
                title: productData.title,
                category: productData.category,
                rating: productData.rating,
                price: productData.price,
                quantity: quantity
            };
            const updatedCart = [...user.cart, product];
            updateTheCart(updatedCart);
        }
    };

    const getTheUserData = () => {
        const data = JSON.parse(localStorage.getItem("user"));
        setUserData(data);
    }

    const handleCommentPost = async () => {
        if (comment === "") {
            return;
        }
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const currentDate = new Date();
            const dateOptions = { day: 'numeric', month: 'long', year: 'numeric' };
            const formattedDate = new Intl.DateTimeFormat('en-IN', dateOptions).format(currentDate);
            const timeOptions = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
            const formattedTime = new Intl.DateTimeFormat('en-IN', timeOptions).format(currentDate);
            const payload = {
                comment,
                username: user.name,
                date: formattedDate,
                time: formattedTime
            };
            let res = await axios.put(`https://64e37895bac46e480e78da47.mockapi.io/Products/${id}`, { ...productData, comments: [...productData.comments, payload] });
            if (res.status == 200) {
                setProductData((prev) => {
                    const newData = { ...prev };
                    newData.comments = [...prev.comments, payload];
                    return newData;
                });
                toast({
                    title: "Comment Posted",
                    description: "Successfully Comment Posted",
                    duration: 3000,
                    isClosable: true,
                    status: "success"
                })
            }
            else {
                toast({
                    title: "Something went wrong",
                    description: "Something went wrong, Please try again",
                    duration: 3000,
                    isClosable: true,
                    status: "error"
                })
            }
            setComment("");
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        document.title = "Product Page | E-Plant"
        fetchTheProduct(id);
        getTheUserData();
    }, [id])
    if (loading) {
        return <Flex height="80vh" align="center" justify="center">
            <Spinner size={"xl"} thickness="5px" color="#426800" speed='0.65s' />
        </Flex>
    }
    return <>
        <Box pt={10} >
            <Stack w={"80%"} m={"auto"} direction={["column", "column", "row"]} gap={10} mb={5}>
                <Box w={["100%", "100%", "50%"]}>
                    <Stack direction={"column"} alignItems={"center"} >
                        <Box position={"relative"}>
                            {productData?.images?.length > 0 && <Image src={productData.images[currImage]} boxShadow={"lg"} w={"500px"} border={"1px solid #426800"} />}
                            <div style={{ position: 'absolute', top: '0', right: '0' }}>
                                {productData?.popular === "true" && <Text bg={"#FED02F"} letterSpacing={1} p={"1"}>POPULAR</Text>}
                            </div>
                        </Box>
                        <HStack>
                            {productData?.images?.length > 0 && productData.images.map((image, i) => {
                                return <Image key={i} mt={5} src={image} w={"50px"} boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"} onClick={() => setCurrImage(i)} _hover={{ border: "2px solid #426800" }} border={currImage === i ? "2px solid black" : ""} />
                            })}
                        </HStack>
                    </Stack>
                </Box>
                <Box w={["100%", "100%", "50%"]} textAlign={"left"} pt={10} pl={1}>
                    <Heading as={"h2"} mb={3} fontWeight={500}>{productData?.title}</Heading>
                    <Text fontSize={"xl"} mb={3} fontWeight={500}>{productData?.rating}⭐</Text>
                    <Text fontSize={"2xl"} color="#159354" fontWeight={500} mb={3}><span style={{ fontSize: "15px", textDecoration: "line-through", color: "gray" }}>₹{productData.oriPrice}</span> ₹{productData?.price}</Text>
                    <Text fontSize={"xl"} mb={3}>Category :- {productData?.category}</Text>
                    <Text letterSpacing={1} fontWeight={500}>CHECK DELIVERY</Text>
                    <HStack gap={0} w={"80%"}>
                        <Input placeholder="Enter PIN Code" borderRadius={0} variant='flushed' type="number" value={pin} onChange={(e) => setPin(e.target.value)} focusBorderColor="#426800" />
                        <Button borderRadius={0} bg={"#426800"} color={"white"} letterSpacing={1} onClick={(e) => handleCheck(e)} _hover={{ backgroundColor: "#629608", transition: "all 0.5s ease-in-out" }}>CHECK</Button>
                    </HStack>
                    <Text mb={4} color={estiDeli === "Please Enter Pin Code" ? "red" : "green"}>{estiDeli}</Text>
                    <HStack >
                        <IconButton isDisabled={qty === 1} icon={<MinusIcon />} borderRadius={50} bg={"#426800"} color={"white"} onClick={() => setQty(qty - 1)} _hover={{ backgroundColor: "#629608", transition: "all 0.5s ease-in-out" }} />
                        <Text>{qty}</Text>
                        <IconButton icon={<AddIcon />} borderRadius={50} bg={"#426800"} color={"white"} onClick={() => setQty(qty + 1)} _hover={{ backgroundColor: "#629608", transition: "all 0.5s ease-in-out" }} />
                        <Button bg={"#426800"} color={"white"} leftIcon={<IoCartOutline />} _hover={{ backgroundColor: "#629608", transition: "all 0.5s ease-in-out" }} onClick={() => handleClick(id, qty)}>Add to Cart</Button>
                    </HStack>
                    <HStack w={"80%"} mt={4} textAlign={"center"} alignContent={"center"}>
                        <Box w={"20%"} alignItems={"center"} justifyContent={"center"}>
                            <Image m={"auto"} src="https://www.ugaoo.com/cdn/shop/files/shipping_25798584-6184-42f8-b1d1-d9728a83ef84.png?v=1676873379" w={20} h={20} />
                            <Text>Free Shipping above ₹499</Text>
                        </Box>
                        <Spacer />
                        <Box w={"20%"} alignItems={"center"} justifyContent={"center"}>
                            <Image m={"auto"} src="https://www.ugaoo.com/cdn/shop/files/GuaranteedReturn.png?v=1676873444" w={20} h={20} />
                            <Text noOfLines={2}>Guaranteed Replacements if Damaged</Text>
                        </Box>
                        <Spacer />
                        <Box w={"20%"} alignItems={"center"} justifyContent={"center"}>
                            <Image m={"auto"} src="https://www.ugaoo.com/cdn/shop/files/expertguidence.png?v=1676873472" w={20} h={20} />
                            <Text>Expert Guidance</Text>
                        </Box>
                    </HStack>
                </Box>
            </Stack>
            <hr style={{ border: "1px solid #426800", width: "90%", margin: "auto" }} />
            <VStack display={"flex"} p={55}>
                <Heading as={"h2"} fontWeight={400} >About the Product</Heading>
                <Text w={["100%", "100%", "50%"]} textAlign={"center"} fontSize={"xl"}>{productData?.description}</Text>
            </VStack>
            <hr style={{ border: "1px solid #426800", width: "90%", margin: "auto" }} />
            {productData?.boxImage && (
                <Box p={10} >
                    <Stack w={"80%"} m={"auto"} gap={"10%"} direction={["column", "column", "row"]}>
                        <Box w={["100%", "100%", "50%"]} >
                            <Image src={productData.boxImage} />
                        </Box>
                        <Box w={["100%", "100%", "50%"]} alignSelf={"center"} textAlign={"left"}>
                            <Heading as={"h2"} fontWeight={400}>What's in the Box</Heading>
                            <UnorderedList>
                                {
                                    productData?.boxContent.length > 0 && productData.boxContent.map((item) => {
                                        return <ListItem key={item} fontWeight={400} fontSize={"xl"}>{item}</ListItem>
                                    })
                                }
                            </UnorderedList>
                        </Box>
                    </Stack>
                </Box>
            )}
            <hr style={{ border: "1px solid #426800", width: "90%", margin: "auto" }} />
            <Box p={2}>
                <Heading as={"h2"} fontWeight={400} m={2}>Comments</Heading>
                <Flex align={"center"} justifyContent={"center"} textAlign={"center"} flexDirection={"column"} w={["90%", "90%", "45%"]} m={"auto"} >
                    <Box w={"100%"} maxHeight={"500px"} overflowY={"auto"} >
                        {
                            productData?.comments?.length === 0 ? <Heading p={5} color={"#426800"}>No Comments, Be the first to comment</Heading>
                                :
                                productData?.comments?.map((el) => {
                                    return <HStack key={el.time} w={"90%"} p={3} borderRadius={"15px"} boxShadow={"lg"} m={"auto"} mb={1}>
                                        <Avatar src={`https://bit.ly/${el.username}`} name={`${el.username}`} m={2} />
                                        <Box w={"100%"} textAlign={"left"}>
                                            <Text fontSize={"larger"} fontWeight={700}>{el.username}</Text>
                                            <Text fontSize={"large"} fontWeight={500}>{el.comment}</Text>
                                            <Text textAlign={"right"} fontWeight={300}>Posted on :- {el.date} at {el.time}</Text>
                                        </Box>
                                    </HStack>
                                })
                        }
                    </Box>
                    {
                        isAuth && <Box w={"70%"} m={3}>
                            <Textarea p={1} focusBorderColor="#426800" placeholder="Write your comment here.." value={comment} onChange={(e) => setComment(e.target.value)} borderColor={"black"} />
                            <Button textAlign={"right"} bg={"#426800"} color={"white"} onClick={handleCommentPost} m={1} _hover={{ backgroundColor: "#629608", transition: "all 0.5s ease-in-out" }}>Comment</Button>
                        </Box>
                    }
                </Flex>
            </Box>
            <hr style={{ border: "1px solid #426800", width: "90%", margin: "auto" }} />
            <Box w={["80%", "80%", "60%"]} m={"auto"} p={7}>
                <Heading as={"h2"} fontWeight={400} mb={3}>Tips For Care</Heading>
                <Accordion allowMultiple border={"0.5px solid black"}>
                    <AccordionItem>
                        <h2>
                            <AccordionButton _expanded={{ bg: '#d7ffd7' }}>
                                <Box as="span" flex='1' textAlign='left'>
                                    <HStack>
                                        <Image src="https://www.ugaoo.com/cdn/shop/files/Water-2_2x_e01f383f-4647-47cf-a82f-31ff906cf3f3_small.png?v=1656923200" w={8} />
                                        <Text fontWeight={400}>Water Twice A Week</Text>
                                    </HStack>
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4} textAlign={"left"} fontSize={"lg"}>
                            Always check your plants before watering, the topsoil should be dry to touch. For succulents allow the potting mix to dry completely before watering again.
                        </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem>
                        <h2>
                            <AccordionButton _expanded={{ bg: '#d7ffd7' }}>
                                <Box as="span" flex='1' textAlign='left'>
                                    <HStack>
                                        <Image src="https://www.ugaoo.com/cdn/shop/files/Sunlight-2_2x_c2ce9dfa-edf9-4a1d-94fa-4e01e6baea45_small.png?v=1656923265" w={8} />
                                        <Text fontWeight={400}>Needs Bright Indirect Sunlight</Text>
                                    </HStack>
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4} textAlign={"left"} fontSize={"lg"}>
                            Place your plants on window sills where it can get the brightest possible indirect light. Bright indirect light is when the plant is within a couple of feet of a natural source of light.
                        </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem>
                        <h2>
                            <AccordionButton _expanded={{ bg: '#d7ffd7' }}>
                                <Box as="span" flex='1' textAlign='left'>
                                    <HStack>
                                        <Image src="https://www.ugaoo.com/cdn/shop/files/Animal_2_2x_7abd45ab-b3e1-4d66-939f-1c1a4db5672d_small.png?v=1656923522" w={8} />
                                        <Text fontWeight={400}>Not Pet Friendly</Text>
                                    </HStack>
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4} textAlign={"left"} fontSize={"lg"}>
                            This plant and your furry friends cannot become the best buds.
                        </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem>
                        <h2>
                            <AccordionButton _expanded={{ bg: '#d7ffd7' }}>
                                <Box as="span" flex='1' textAlign='left'>
                                    <HStack>
                                        <Image src="https://www.ugaoo.com/cdn/shop/files/Maintainance-1_2x_809fc5b5-c212-4f22-803b-50241e478b2f_small.png?v=1656923507" w={8} />
                                        <Text fontWeight={400}>Needs Gardening Experience</Text>
                                    </HStack>
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4} textAlign={"left"} fontSize={"lg"}>
                            The plant needs a knowing eye of a gardener to understand what it needs. Fairly easy to grow if you take care of their set of requirements.
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
            </Box>
            <hr style={{ border: "1px solid #426800", width: "90%", margin: "auto" }} />
            {userData?.recent?.length === 0 ? "There is no visited Product" :
                <Box w={"90%"} m={"auto"} mt={10}>
                    <Stack direction={"row"}>
                        <Heading textAlign={"left"} color={"#426800"}>Recent Visited Products</Heading>
                        <Spacer />
                        <HStack>
                            <IconButton icon={<ChevronLeftIcon />} _hover={{ backgroundColor: "#629608", transition: "all 0.5s ease-in-out" }} backgroundColor={"#426800"} color={"white"} onClick={handlePrev} isDisabled={startIndex === 0} />
                            <IconButton icon={<ChevronRightIcon />} _hover={{ backgroundColor: "#629608", transition: "all 0.5s ease-in-out" }} backgroundColor={"#426800"} color={"white"} onClick={handleNext} isDisabled={startIndex + 5 >= userData.recent?.length} />
                        </HStack>
                    </Stack>
                    <Box overflowX="hidden" overflowY="auto" mt={5}>
                        <SimpleGrid columns={["1", "1", "2", "3", "5"]}
                            gap={0.5}
                            justifyContent="center" w={"100%"} mt={5}>
                            {userData?.recent?.length > 0 && userData?.recent.slice(startIndex, startIndex + 5).map((item) => {
                                return <Box key={item.id} w={"90%"} m={"auto"} border={"1px"} borderRadius={"15px"} borderColor={"#426800"}>
                                    <Image src={item.image} w={"100%"} h={300} borderRadius={"15px 15px 0px 0px"} />
                                    <Text fontSize={"xl"} noOfLines={1}>{item.title}</Text>
                                    <Text fontSize={"md"}>₹{item.price}</Text>
                                    <Text>{item.rating}⭐</Text>
                                </Box>
                            })}
                        </SimpleGrid>
                    </Box>
                </Box>
            }
            <Footer />
        </Box >
    </>
}
export default Productpage