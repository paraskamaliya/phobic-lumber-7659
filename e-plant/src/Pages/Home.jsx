import { Box, VStack, Stack, Heading, Text, Image, Button, IconButton, HStack, CircularProgress, CircularProgressLabel, Grid, GridItem, Spacer, Card, CardBody, Link } from "@chakra-ui/react"
import { Link as ReactRouterLink } from "react-router-dom"
import { useEffect, useState } from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"
import Footer from "../Components/Footer"
const Home = () => {
    const photos = ["https://www.ugaoo.com/cdn/shop/files/Venice12Planter-LightGrey_8bf35189-116d-4866-a064-7d7621a43fe3.jpg?v=1683362524&width=375", "https://www.ugaoo.com/cdn/shop/files/SpiroCeramicPot-White_725fdcf3-b24a-4710-a61e-e2d67af6deaf.jpg?v=1683029966&width=375", "https://www.ugaoo.com/cdn/shop/files/Aimage_3.jpg?v=1682523121&width=375", "https://www.ugaoo.com/cdn/shop/products/LagosPlanter-Grey_f26c8dee-c8ce-4e1a-bec7-86006f560c98.jpg?v=1680418283&width=375"]
    const products = [{
        "title": "Peace Lily Plant",
        "price": "299",
        "category": "Flowering Plants",
        "images": [
            "https://www.ugaoo.com/cdn/shop/products/GroPot.jpg?v=1680418153",
            "https://www.ugaoo.com/cdn/shop/files/peace-lily-plant-32515294756996.jpg?v=1688721655",
            "https://www.ugaoo.com/cdn/shop/products/DSC_8818_afd3420f-0b8c-410a-95f8-38394ed69ec2.jpg?v=1680418153",
            "https://www.ugaoo.com/cdn/shop/products/DSC_9124_cfe94c59-66ce-45c0-93b1-e1049ad834a1.jpg?v=1680418153",
            "https://www.ugaoo.com/cdn/shop/products/SensationPeaceLily.jpg?v=1680432472"
        ],
        "description": "The bigger cousin of the beautiful peace lily, the Spathiphyllum Sensation is one of the most loved peace lily varieties in the world. In addition to its majestic white flowers, it has large, glossy, oblong leaves that are excellent air purifiers. The best part is its ease of growth and low-maintenance nature which makes it a perfect choice for first-time gardeners.",
        "boxImage": "https://www.ugaoo.com/cdn/shop/files/Packaging_5f100870-0f6b-41fd-aa4c-39e1d93ff310.jpg?v=1667906828",
        "boxContent": [
            "Peace Lily Plant with Pot: 15 - 20 cm",
            "Pot Size: 4 inch diameter",
            "Soil Media:Soil+Coco Peat+Coco Chips",
            "Recyclable box"
        ],
        "id": "1",
        "rating": "4.8",
        "popular": false
    },
    {
        "title": "Jade Plant Mini",
        "price": "249",
        "category": "Indoor Plants",
        "images": [
            "https://www.ugaoo.com/cdn/shop/products/GroPot_87e3e981-500e-4df2-bff3-d618431f96c9.jpg?v=1680418283",
            "https://www.ugaoo.com/cdn/shop/files/jade-plant-mini-32515564568708.jpg?v=1688724899",
            "https://www.ugaoo.com/cdn/shop/products/DSC_8810.jpg?v=1680418283",
            "https://www.ugaoo.com/cdn/shop/products/JadeMini4Inch.jpg?v=1680432809"
        ],
        "description": "Are you a sucker for succulents? The Crassula Green Mini will be your dream plant kid. One of the easiest houseplants to look after, the Crassula Green Mini boasts a lush foliage which beautifies any room. Also considered lucky as per Feng Shui for its coin like round plump leaves, so go on, bring some green home, the luck just tags along for free.",
        "boxImage": "https://www.ugaoo.com/cdn/shop/files/Packaging_Jade_Mini_Small_3b088347-8b6c-4786-9bb8-817ea6cbf93b.jpg?v=1667905483",
        "boxContent": [
            "Jade Mini Plant with Pot: 20 - 24 cm (Small), 26 - 28 cm (Medium)",
            "Pot Size: 4 inch diameter (Small), 5 inch diameter (Medium)",
            "Soil Media:Coco Peat+Coco Chips+Soil",
            "Recyclable box"
        ],
        "id": "2",
        "rating": "4.8",
        "popular": false
    },
    {
        "title": "Bamboo Palm Plant",
        "price": "399",
        "category": "Indoor Plants",
        "images": [
            "https://www.ugaoo.com/cdn/shop/products/GroPot_cff1f8cf-e233-4cbf-9cfa-8ef815e851dd.jpg?v=1680305362&width=375",
            "https://www.ugaoo.com/cdn/shop/products/DSC_9031-Copy-Copy_2.jpg?v=1680305362&width=750",
            "https://www.ugaoo.com/cdn/shop/products/DSC_9082-Copy-Copy_2.jpg?v=1680305362&width=750",
            "https://www.ugaoo.com/cdn/shop/products/BamabooPalm.jpg?v=1680433926&width=750"
        ],
        "description": "Its lush green foliage swaying daintily in the breeze is sure to remind you of tropical resorts. The stunning green leaves grow directly from the stem and over time the spread of the plant increases to fill up the pot. An excellent air purifier the bamboo palm is easy to grow and maintain, it makes a great centrepiece in a quirky pot.",
        "boxImage": "https://www.ugaoo.com/cdn/shop/files/Packagaing_Bamboo_Palm.jpg?v=1667579537",
        "boxContent": [
            "Bamboo Palm Plant with Pot: 20 - 30 cm",
            "Pot Size: 4 inch diameter",
            "Soil Media:Coco Peat+Coco Chips+Soil",
            "Recyclable box"
        ],
        "id": "3",
        "rating": "4.8",
        "popular": false
    },
    {
        "title": "Broken Heart Plant",
        "price": "249",
        "category": "Indoor Plants",
        "images": [
            "https://www.ugaoo.com/cdn/shop/files/small-gropot-ivory-broken-heart-plant-32953867468932.jpg?v=1689663720&width=375",
            "https://www.ugaoo.com/cdn/shop/products/BrokenHeart4Inch.jpg?v=1689663720&width=750",
            "https://www.ugaoo.com/cdn/shop/files/broken-heart-plant-32517995757700.jpg?v=1689663720&width=750",
            "https://www.ugaoo.com/cdn/shop/products/DSC_9153.jpg?v=1689663720&width=750",
            "https://www.ugaoo.com/cdn/shop/products/DSC_8923.jpg?v=1689663720&width=750"
        ],
        "description": "One of the most popular houseplants, and our all-time bestseller, this easy-growing plant with its heart-shaped leaves is loved for its beautiful fenestrations. Quick to grow with delicate trailing vines that can be styled for every space, the Philodendron broken heart is the monstera charm you want to add to your home if you don't have the space for the huge monstera. Scientifically known as the Monstera adansonii, this broken heart plant thrives indoors in bright indirect light and with very little care.",
        "boxImage": "https://www.ugaoo.com/cdn/shop/files/Packaging_Broken_Heart.jpg?v=1667580098",
        "boxContent": [
            "Broken Heart Plant with Pot: 23 - 28 cm",
            "Pot Size: 4 inch diameter",
            "Soil Media:Coco Peat+Coco Chips+Soil",
            "Recyclable box"
        ],
        "id": "4",
        "rating": "4.8",
        "popular": false
    },
    {
        "title": "Monstera Deliciosa Plant",
        "price": "1299",
        "category": "Indoor Plants",
        "images": [
            "https://www.ugaoo.com/cdn/shop/products/monstera-deliciosa-plant-31793362370692.jpg?v=1675604528&width=375",
            "https://www.ugaoo.com/cdn/shop/products/monstera-deliciosa-plant-31793362337924.jpg?v=1675604531&width=750",
            "https://www.ugaoo.com/cdn/shop/products/monstera-deliciosa-plant-31793362272388.jpg?v=1675604694&width=750",
            "https://www.ugaoo.com/cdn/shop/products/monstera-deliciosa-plant-31793362174084.jpg?v=1675604697&width=750"
        ],
        "description": "You might have seen it in a million home decor posts on social media, the absolute reigning king, the Monstera Deliciosa, or the Swiss Cheese Plant is a prepossessing tropical delight with shiny large leaves with natural holes that resemble those in Swiss Cheese. Its mere presence adds happiness to a home and elevates your decor.",
        "boxImage": "https://www.ugaoo.com/cdn/shop/files/Packaging_Deliciosa.jpg?v=1667827463",
        "boxContent": [
            "Monstera Deliciosa Plant with Pot: 45 - 50 cm",
            "Pot Size: 7.5 inch diameter",
            "Soil Media:Soil+Coco Peat+Coco Chips",
            "Recyclable box"
        ],
        "id": "5",
        "rating": "4.8",
        "popular": false
    }]
    const [currPhoto, setCurrPhoto] = useState(0);
    const [progress, setProgress] = useState(100);
    const [currentData, setCurrentData] = useState(1);
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
    const handleIncData = () => {
        if (currentData === products.length - 3) {
            setCurrentData(0);
        } else {
            setCurrentData(currentData + 1);
        }
    }
    const handleDecData = () => {
        if (currentData === 0) {
            setCurrentData(products.length - 3);
        } else {
            setCurrentData(currentData - 1);
        }
    }
    useEffect(() => {
        const interval = setInterval(() => {
            handleInc();
        }, 5000);
        return () => {
            clearInterval(interval);
        };
    }, [currPhoto])
    return (
        <Box pt={2} bg={"green.50"}>
            <Box w={"100%"}>
                <Stack direction={["column", "column", "row"]} align={"center"} justifyContent={"space-evenly"}>
                    <VStack w={["80%", "80%", "30%"]} textAlign={"left"} ml={["0px", "0px", "150px"]} size="3xl" align={"left"}>
                        <Heading color="#426800" size="2xl" >Create a green paradise right at home</Heading>
                        <Text color={"#3A3A3A"} mt={"2"} fontSize="l">20% of the profit goes to help the Armed Forces of INDIA</Text>
                        <Button w={"fit-content"} backgroundColor="#426800" color={"white"} mt={"2"} width={"120px"} >
                            <Link as={ReactRouterLink} to="/products" _hover={{ textDecoration: "none" }}>Products</Link>
                        </Button>
                    </VStack>
                    <VStack w={["80%", "80%", "35%"]} h={500} position={"relative"} >
                        <Image src={photos[currPhoto]} h={500} w={"100%"} />
                        <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
                            <CircularProgress value={progress} color="#426800" size="45px">
                                <CircularProgressLabel>
                                    {currPhoto + 1}/4
                                </CircularProgressLabel>
                            </CircularProgress>
                        </div>
                        <HStack position={"absolute"} bottom={"1"} left={"10px"}>
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
                    <Heading>Popular Products</Heading>
                    <Spacer />
                    <Stack direction={"row"} m={"auto"}>
                        <IconButton icon={<ChevronLeftIcon />} backgroundColor={"#426800"} color={"white"} onClick={handleDecData} />
                        <IconButton icon={<ChevronRightIcon />} backgroundColor={"#426800"} color={"white"} onClick={handleIncData} />
                    </Stack>
                </Stack>
                <Stack direction={["column", "column", "row"]} w={"100%"} mt={5} gap={"1%"}>
                    <Card w={["90%", "90%", "33%"]} m={"auto"} boxShadow={"md"} alignItems={"center"}>
                        <CardBody alignContent={"center"}>
                            <Image src={products[currentData].images[0]} />
                            <Text>Name :- {products[currentData].title}</Text>
                            <Text>Price :- {products[currentData].price}</Text>
                        </CardBody>
                    </Card>
                    <Card w={["90%", "90%", "33%"]} m={"auto"} boxShadow={"md"} alignItems={"center"}>
                        <CardBody>
                            <Image src={products[currentData + 1].images[0]} />
                            <Text>Name :- {products[currentData + 1].title}</Text>
                            <Text>Price :- {products[currentData + 1].price}</Text>
                        </CardBody>
                    </Card>
                    <Card w={["90%", "90%", "33%"]} m={"auto"} boxShadow={"md"} alignItems={"center"}>
                        <CardBody>
                            <Image src={products[currentData + 2].images[0]} />
                            <Text>Name :- {products[currentData + 2].title}</Text>
                            <Text>Price :- {products[currentData + 2].price}</Text>
                        </CardBody>
                    </Card>
                </Stack>
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
        </Box>
    )
}
export default Home