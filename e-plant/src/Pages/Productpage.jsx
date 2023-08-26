import { Box, Image, Spinner, Stack, HStack, Heading, Text, Input, Button, IconButton, VStack, ListItem, UnorderedList, useToast, Spacer, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel } from "@chakra-ui/react"
import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { MinusIcon, AddIcon } from "@chakra-ui/icons"
import Footer from "../Components/Footer";

const Productpage = () => {
    const [productData, setProductData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currImage, setCurrImage] = useState(0);
    const { id } = useParams();
    const [qty, setQty] = useState(1);
    const [estiDeli, setEstiDeli] = useState("");
    const [pin, setPin] = useState("");
    const toast = useToast();

    const fetchTheProduct = (id) => {
        setLoading(true);
        axios.get(`https://64e37895bac46e480e78da47.mockapi.io/Products/${id}`)
            .then((res) => {
                setProductData(res.data)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
            })
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


    useEffect(() => {
        fetchTheProduct(id)
    }, [id])
    if (loading) {
        return <Spinner />
    }
    return <>
        <Box mt={10}>
            <Stack w={"80%"} m={"auto"} direction={["column", "column", "row"]} gap={10} mb={5}>
                <Box w={["100%", "100%", "50%"]}>
                    <Stack direction={"column"} alignItems={"center"} >
                        <Box position={"relative"}>
                            {productData?.images?.length > 0 && <Image src={productData.images[currImage]} w={"500px"} border={"1px solid #426800"} />}
                            <div style={{ position: 'absolute', top: '0', right: '0' }}>
                                {productData?.popular === "true" && <Text bg={"#FED02F"} letterSpacing={1} p={"1"}>POPULAR</Text>}
                            </div>
                        </Box>
                        <HStack >
                            {productData?.images?.length > 0 && productData.images.map((image, i) => {
                                return <Image key={i} mt={5} src={image} w={"50px"} boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"} onClick={() => setCurrImage(i)} _hover={{ border: "2px solid #426800" }} border={currImage === i ? "2px solid black" : ""} />
                            })}
                        </HStack>
                    </Stack>
                </Box>
                <Box w={["100%", "100%", "50%"]} textAlign={"left"} pt={10} pl={1}>
                    <Heading as={"h2"} mb={3} fontWeight={500}>{productData?.title}</Heading>
                    <Text fontSize={"xl"} mb={3}>{productData?.rating}⭐</Text>
                    <Text fontSize={"xl"} color="#159354" fontWeight={500} mb={3}>₹{productData?.price}</Text>
                    <Text fontSize={"xl"} mb={3}>{productData?.category}</Text>
                    <Text letterSpacing={1}>CHECK DELIVERY</Text>
                    <HStack gap={0} w={"80%"}>
                        <Input placeholder="Enter PIN Code" borderRadius={0} variant='flushed' type="number" value={pin} onChange={(e) => setPin(e.target.value)} />
                        <Button borderRadius={0} bg={"#426800"} color={"white"} letterSpacing={1} onClick={(e) => handleCheck(e)}>CHECK</Button>
                    </HStack>
                    <Text mb={4} color={estiDeli === "Please Enter Pin Code" ? "red" : "green"}>{estiDeli}</Text>
                    <HStack >
                        <IconButton isDisabled={qty === 1} icon={<MinusIcon />} borderRadius={50} bg={"#426800"} color={"white"} onClick={() => setQty(qty - 1)} />
                        <Text>{qty}</Text>
                        <IconButton icon={<AddIcon />} borderRadius={50} bg={"#426800"} color={"white"} onClick={() => setQty(qty + 1)} />
                        <Button bg={"#426800"} color={"white"} onClick={() => handleClick(id, qty)}>Add to Cart</Button>
                    </HStack>
                    <HStack w={"100%"} mt={4} textAlign={"center"} alignContent={"center"}>
                        <Box w={"20%"} alignItems={"center"} justifyContent={"center"}>
                            <Image m={"auto"} src="https://www.ugaoo.com/cdn/shop/files/shipping_25798584-6184-42f8-b1d1-d9728a83ef84.png?v=1676873379" w={20} h={20} />
                            <Text>Free Shipping above ₹499</Text>
                        </Box>
                        <Spacer />
                        <Box w={"20%"} alignItems={"center"} justifyContent={"center"}>
                            <Image m={"auto"} src="https://www.ugaoo.com/cdn/shop/files/GuaranteedReturn.png?v=1676873444" w={20} h={20} />
                            <Text>Guaranteed Replacements if Damaged</Text>
                        </Box>
                        <Spacer />
                        <Box w={"20%"} alignItems={"center"} justifyContent={"center"}>
                            <Image m={"auto"} src="https://www.ugaoo.com/cdn/shop/files/expertguidence.png?v=1676873472" w={20} h={20} />
                            <Text>Expert Guidance</Text>
                        </Box>
                    </HStack>
                </Box>
            </Stack>
            <hr />
            <VStack display={"flex"} p={55}>
                <Heading as={"h2"} fontWeight={400} >About the Product</Heading>
                <Text w={["100%", "100%", "50%"]} textAlign={"center"}>{productData?.description}</Text>
            </VStack>
            <hr />
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
                                        return <ListItem key={item} fontWeight={400}>{item}</ListItem>
                                    })
                                }
                            </UnorderedList>
                        </Box>
                    </Stack>
                </Box>
            )}
            <Box w={"60%"} m={"auto"} mt={5}>
                <Heading color={"#426800"} mb={3}>Tips For Care</Heading>
                <Accordion allowMultiple>
                    <AccordionItem>
                        <h2>
                            <AccordionButton _expanded={{ bg: 'green.50' }}>
                                <Box as="span" flex='1' textAlign='left'>
                                    <HStack>
                                        <Image src="https://www.ugaoo.com/cdn/shop/files/Water-2_2x_e01f383f-4647-47cf-a82f-31ff906cf3f3_small.png?v=1656923200" w={8} />
                                        <Text fontWeight={400}>Water Twice A Week</Text>
                                    </HStack>
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4} textAlign={"left"}>
                            Always check your plants before watering, the topsoil should be dry to touch. For succulents allow the potting mix to dry completely before watering again.
                        </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem>
                        <h2>
                            <AccordionButton _expanded={{ bg: 'green.50' }}>
                                <Box as="span" flex='1' textAlign='left'>
                                    <HStack>
                                        <Image src="https://www.ugaoo.com/cdn/shop/files/Sunlight-2_2x_c2ce9dfa-edf9-4a1d-94fa-4e01e6baea45_small.png?v=1656923265" w={8} />
                                        <Text fontWeight={400}>Needs Bright Indirect Sunlight</Text>
                                    </HStack>
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4} textAlign={"left"}>
                            Place your plants on window sills where it can get the brightest possible indirect light. Bright indirect light is when the plant is within a couple of feet of a natural source of light.
                        </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem>
                        <h2>
                            <AccordionButton _expanded={{ bg: 'green.50' }}>
                                <Box as="span" flex='1' textAlign='left'>
                                    <HStack>
                                        <Image src="https://www.ugaoo.com/cdn/shop/files/Animal_2_2x_7abd45ab-b3e1-4d66-939f-1c1a4db5672d_small.png?v=1656923522" w={8} />
                                        <Text fontWeight={400}>Not Pet Friendly</Text>
                                    </HStack>
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4} textAlign={"left"}>
                            This plant and your furry friends cannot become the best buds.
                        </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem>
                        <h2>
                            <AccordionButton _expanded={{ bg: 'green.50' }}>
                                <Box as="span" flex='1' textAlign='left'>
                                    <HStack>
                                        <Image src="https://www.ugaoo.com/cdn/shop/files/Maintainance-1_2x_809fc5b5-c212-4f22-803b-50241e478b2f_small.png?v=1656923507" w={8} />
                                        <Text fontWeight={400}>Needs Gardening Experience</Text>
                                    </HStack>
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4} textAlign={"left"}>
                            The plant needs a knowing eye of a gardener to understand what it needs. Fairly easy to grow if you take care of their set of requirements.
                        </AccordionPanel>
                    </AccordionItem>


                </Accordion>
            </Box>
            <Footer />
        </Box>
    </>
}
export default Productpage