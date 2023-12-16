import { Box, VStack, Stack, Heading, Text, Image, Button, IconButton, HStack, CircularProgress, CircularProgressLabel, Spacer, Link, SimpleGrid } from "@chakra-ui/react"
import { Link as ReactRouterLink } from "react-router-dom"
import { useEffect, useState } from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"
import Footer from "../Components/Footer"
import axios from "axios"
import plant1 from "../Photos/plant1.jpg"
import plant2 from "../Photos/plant2.jpg"
import plant3 from "../Photos/plant3.jpg"
import plant4 from "../Photos/plant4.jpg"
import { LazyLoadImage } from "react-lazy-load-image-component"
import 'react-lazy-load-image-component/src/effects/blur.css';

const Home = () => {
    const photos = [plant1, plant2, plant3, plant4]
    const [currPhoto, setCurrPhoto] = useState(0);
    const [progress, setProgress] = useState(100);
    const [currentData, setCurrentData] = useState(1);
    const [popularProduct, setPopularProduct] = useState([]);
    const [startIndex, setStartIndex] = useState(0);

    const handleNext = () => {
        const nextIndex = startIndex + 1;
        setStartIndex(Math.min(nextIndex, popularProduct.length - 1));
    };

    const handlePrev = () => {
        const prevIndex = startIndex - 1;
        setStartIndex(Math.max(prevIndex, 0));
    };
    let url = new URL("https://64e37895bac46e480e78da47.mockapi.io/Products")
    const fetchPopular = () => {
        url.searchParams.append("popular", true);
        axios.get(url)
            .then((res) => setPopularProduct(res.data))
            .catch((err) => console.log(err))
    }
    const handleInc = () => {
        if (currPhoto === photos.length - 1) {
            setCurrPhoto(0);
            setProgress(100);
        } else {
            setCurrPhoto(currPhoto + 1);
            setProgress(progress - 25 < 0 ? 0 : progress - 25);
        }
    }
    const handleDec = () => {
        if (currPhoto === 0) {
            setCurrPhoto(photos.length - 1);
            setProgress(25);
        } else {
            setCurrPhoto(currPhoto - 1);
            setProgress(progress + 25 > 100 ? 100 : progress + 25);
        }
    }
    useEffect(() => {
        fetchPopular();
        const interval = setInterval(() => {
            handleInc();
        }, 3000);
        return () => {
            clearInterval(interval);
        };
    }, [currPhoto])
    return (
        <Box pt={2} >
            <Box w={"100%"}>
                <Stack direction={["column", "column", "row"]} align={"center"} justifyContent={"space-evenly"}>
                    <VStack w={["80%", "80%", "30%"]} textAlign={"left"} ml={["0px", "0px", "150px"]} size="3xl" align={"left"}>
                        <Heading color="#426800" size="2xl" >Create a green paradise right at home</Heading>
                        <Text color={"#3A3A3A"} mt={"2"} fontSize="l">20% of the profit goes to help the Armed Forces of INDIA</Text>
                        <Button w={"fit-content"} backgroundColor="#426800" color={"white"} mt={"2"} width={"120px"} >
                            <Link as={ReactRouterLink} to="/products" _hover={{ textDecoration: "none" }}>Products</Link>
                        </Button>
                    </VStack>
                    <VStack w={["80%", "80%", "35%"]} h={"100%"} position={"relative"} border={"1px solid #426800"} borderRadius={"15px"}>
                        <LazyLoadImage effect="blur" src={photos[currPhoto]} style={{ height: "100%", width: "100%", borderRadius: "15px" }} />
                        <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
                            <CircularProgress value={progress} color="#426800" size="45px">
                                <CircularProgressLabel>
                                    {currPhoto + 1}/4
                                </CircularProgressLabel>
                            </CircularProgress>
                        </div>
                        <HStack position={"absolute"} bottom={"2"} left={"15px"}>
                            <IconButton icon={<ChevronLeftIcon />} backgroundColor={"#426800"} color={"white"} onClick={handleDec} />
                            <IconButton icon={<ChevronRightIcon />} backgroundColor={"#426800"} color={"white"} onClick={handleInc} />
                        </HStack>
                    </VStack>
                </Stack>
            </Box>
            <Box w={"80%"} h={"fit-content"} m={"auto"} mt={10}>
                <Stack direction={["column-reverse", "column", "row"]} align={"center"} gap={"10%"} h={"fit-content"} >
                    <Stack direction={"row"} w={["80%", "80%", "50%"]} m={"auto"}>
                        <Box h={"300px"} w={"200px"} >
                            <Image src="https://www.ugaoo.com/cdn/shop/products/Krish12Planter-Red_9aedd671-5735-461d-9067-58b2d9766713.jpg?v=1688617208&width=375" h={"150px"} w={"200px"} borderRadius={"15px"} />
                            <Image src="https://www.ugaoo.com/cdn/shop/products/AtlantisPlanter-PastelPink_b9cb7567-785a-464c-88f9-d5282d4668d1.jpg?v=1680427445&width=375" h={"150px"} w={"200px"} borderRadius={"15px"} />
                        </Box>
                        <Box h={"200px"}>
                            <Image src="https://www.ugaoo.com/cdn/shop/products/ficus-moclame-plant-xl-32169671590020.jpg?v=1675560612&width=375" h={"300px"} w={"300px"} borderRadius={"15px"} />
                        </Box>
                    </Stack>
                    <Box align={"left"} w={["80%", "80%", "50%"]}>
                        <Heading color="#426800" size="2xl" textDecoration={"underline"}>About Us</Heading>
                        <Text mt={"2"} fontSize={"l"}>
                            We are a store of indoor plants of various types in Hylv Hundreds of different types of plants from ficuses to forms. We love and cherish our plants from their very "birth", so they will definitely bring happiness, joy, love and comfort to your home.
                        </Text>
                    </Box>
                </Stack>
            </Box>
            <Box w={"80%"} m={"auto"} mt={"10"} >
                <Stack direction={["column", "column", "row"]} m={"auto"}>
                    <Heading color={"#426800"}>Popular Products</Heading>
                    <Spacer />
                    <Stack direction={"row"} m={"auto"}>
                        <IconButton icon={<ChevronLeftIcon />} backgroundColor={"#426800"} color={"white"} onClick={handlePrev} isDisabled={startIndex === 0} />
                        <IconButton icon={<ChevronRightIcon />} backgroundColor={"#426800"} color={"white"} onClick={handleNext} isDisabled={startIndex + 5 >= popularProduct.length} />
                    </Stack>
                </Stack>
                {popularProduct?.length !== 0 &&
                    <Box overflowX="hidden" overflowY="auto" mt={5}>
                        <SimpleGrid columns={["1", "2", "2", "5"]}
                            gap={0.5}
                            justifyContent="center" w={"100%"} mt={5}>
                            {popularProduct && popularProduct.slice(startIndex, startIndex + 5).map((item) => {
                                return <Link as={ReactRouterLink} textDecoration="none" _hover={{ textDecoration: "none" }} to={`products/${item.id}`} key={item.id} w={"90%"} m={"auto"} border={"1px"} borderRadius={"15px"} borderColor={"#426800"} >
                                    <Box >
                                        <Image src={item.images[0]} w={"100%"} h={300} borderRadius={"15px 15px 0px 0px"} />
                                        <Text fontSize={"xl"} noOfLines={1}>{item.title}</Text>
                                        <Text fontSize={"md"}>₹{item.price}</Text>
                                        <Text>{item.rating}⭐</Text>
                                    </Box>
                                </Link>
                            })}
                        </SimpleGrid>
                    </Box>
                }
                <Button mt={10} backgroundColor={"#426800"} color={"white"} alignContent={"end"}>
                    <Link as={ReactRouterLink} to={"/products"} _hover={{ textDecoration: "none" }}>See All</Link>
                </Button>
            </Box>
            <Box w={"80%"} h={"fit-content"} m={"auto"} mt={10}>
                <Stack direction={["column-reverse", "column", "row"]} align={"center"} gap={"10%"} h={"fit-content"} >
                    <Box align={"left"} w={["80%", "80%", "50%"]}>
                        <Heading color="#426800" size="2xl" textDecoration={"underline"}>Delivery & Payment</Heading>
                        <Text mt={"2"} fontSize={"l"}>
                            We package our plants securely yet sustainably by reusing boxes, paper (newspapers), etc. Delivery is carried out to all cities of Ukraine, except for the occupied ones. Pickup is possible in Kyiv.
                            We have full & partial prepayment by card and cash on delivery to make you feel completely secure. We have many testimonials from new and regular customers.
                        </Text>
                    </Box>
                    <Stack direction={"row"} w={["80%", "80%", "50%"]}>
                        <Box h={"300px"} w={"200px"} >
                            <Image src="https://www.ugaoo.com/cdn/shop/products/Krish12Planter-Ivory_3f18466a-68f8-4763-8a18-fe58269b0f6a.jpg?v=1681551837&width=375" h={"150px"} w={"400px"} borderRadius={"15px"} />
                            <Image src="https://www.ugaoo.com/cdn/shop/products/Krish12Planter-Yellow_6d1a7d77-d759-438d-8f94-ac425f01ea84.jpg?v=1681553821&width=375" h={"150px"} w={"400px"} borderRadius={"15px"} />
                        </Box>
                        <Box h={"200px"}>
                            <Image src="https://www.ugaoo.com/cdn/shop/products/wandering-jew-with-hanging-pot-31818367926404.jpg?v=1675629359&width=375" h={"300px"} w={"300px"} borderRadius={"15px"} />
                        </Box>
                    </Stack>
                </Stack>
            </Box>
            <Footer />
        </Box >
    )
}
export default Home