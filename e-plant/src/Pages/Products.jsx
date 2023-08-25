import { SearchIcon } from "@chakra-ui/icons"
import { Box, Button, Heading, IconButton, Input, Select, SimpleGrid, Spinner, Stack } from "@chakra-ui/react"
import axios from "axios";
import { useEffect, useState } from "react";
import Productcard from "../Components/ProductCard";
import Footer from "../Components/Footer";

const Products = () => {
    const [sortcri, setSortCri] = useState("");
    const [sortOrd, setSortOrd] = useState("");
    const [order, setOrder] = useState("");
    const [productData, setProductData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(false);
    let url = new URL("https://64e37895bac46e480e78da47.mockapi.io/Products");
    const fetchTheData = () => {
        setLoading(true);
        if (sortcri !== "" && sortOrd !== "") {
            url.searchParams.append('sortBy', sortcri);
            url.searchParams.append("order", sortOrd);
            url.searchParams.append('sortBy', 'title')
            url.searchParams.append("order", order);
        }
        axios.get(url)
            .then((res) => {
                setProductData(res.data)
                console.log(res.data);
                setLoading(false);
                setErr("");
            })
            .catch((err) => {
                setErr(err)
                setProductData([]);
                setLoading(false);
            })
    }
    useEffect(() => {
        fetchTheData();
    }, [])
    if (loading) {
        return <Spinner size={"xl"} />
    }
    if (err) {
        return <Heading>Something went wrong, Please try again after some time.</Heading>
    }
    return (
        <Box pt={5} bg={"green.50"}>
            <Stack direction={"row"} w={"70%"} m={"auto"}>
                <Input placeholder="Search For Product" borderColor={"#426800"} backgroundColor={"white"} />
                <IconButton icon={<SearchIcon />} bg="#426800" color={"white"} />
            </Stack>
            <Stack direction={["column", "column", "row"]} w={["70%", "70%", "60%"]} m={"auto"} mt={"1"}>
                <Select placeholder="Select Sort Criteria" w={["70%", "70%", "fit-content"]} m={"auto"} borderColor={"#426800"} onChange={(e) => setSortCri(e.target.value)} backgroundColor={"white"} value={sortcri}>
                    <option value={"price"}>Price</option>
                    <option value={"rating"}>Rating</option>
                </Select>
                <Select placeholder="Select Sorting Order" w={["70%", "70%", "fit-content"]} m={"auto"} borderColor={"#426800"} onChange={(e) => setSortOrd(e.target.value)} backgroundColor={"white"} value={sortOrd}>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </Select>
                <Select placeholder="Select for Alphabetic Order" w={["70%", "70%", "fit-content"]} m={"auto"} borderColor={"#426800"} onChange={(e) => setOrder(e.target.value)} backgroundColor={"white"}>
                    <option value="atoz">A to Z</option>
                    <option value="ztoa">Z to A</option>
                </Select>
                <Button backgroundColor={"#426800"} color={"white"} onClick={fetchTheData}>Apply</Button>
            </Stack>
            <SimpleGrid columns={["1", "2", "3"]} spacing='20px' w={"80%"} m={"auto"} mt={"5"}>
                {productData?.map((item) => {
                    return <Productcard {...item} key={item.id} />
                })}
            </SimpleGrid>
            <Footer />
        </Box>
    )
}
export default Products