import { SearchIcon } from "@chakra-ui/icons"
import { Box, Button, Flex, IconButton, Input, InputGroup, InputRightElement, Select, SimpleGrid, Spinner, Stack } from "@chakra-ui/react"
import axios from "axios";
import { useEffect, useState } from "react";
import Productcard from "../Components/ProductCard";
import Footer from "../Components/Footer";
import ErrorIndicator from "../Components/ErrorIndicator";
import Pagination from "../Components/Pagination";
const Products = () => {
    const [sortcri, setSortCri] = useState("");
    const [sortOrd, setSortOrd] = useState("");
    const [order, setOrder] = useState("");
    const [query, setQuery] = useState("");
    const [productData, setProductData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(false);
    const [totalData, setTotalData] = useState();
    const [currPage, setCurrPage] = useState(1);
    const [render, setRender] = useState(false);
    const limit = 12;
    let url = new URL("https://64e37895bac46e480e78da47.mockapi.io/Products");
    const fetchTheData = () => {
        setLoading(true);
        url.searchParams.delete('title');
        url.searchParams.delete('sortby');
        url.searchParams.delete('order');
        if (query !== "") {
            url.searchParams.append('title', query)
            setCurrPage(1);
        }
        if (sortcri !== "" && sortOrd !== "") {
            url.searchParams.append('sortby', sortcri);
            url.searchParams.append('order', sortOrd);
        }
        if (order !== "") {
            url.searchParams.append('sortby', 'title')
            url.searchParams.append('order', order);
        }
        if (query == "") {
            url.searchParams.append("page", currPage);
            url.searchParams.append('limit', 12);
        }
        axios.get(url)
            .then((res) => {
                setProductData(res.data)
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
        setCurrPage(value);
    }
    const handleReset = () => {
        setQuery("");
        setSortCri("");
        setSortOrd("");
        setOrder("");
        setRender(prev => prev == true ? false : true)
    }
    let url1 = new URL("https://64e37895bac46e480e78da47.mockapi.io/Products");
    const allthedata = () => {
        if (query !== "") {
            url1.searchParams.append('title', query)
        }
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
    }, [currPage, render])
    if (loading) {
        return <Flex height="90vh" align="center" justify="center" bg={"#fff6f4"}>
            <Spinner size={"xl"} thickness="5px" color="#426800" speed='0.65s' />
        </Flex>
    }
    if (err) {
        return <ErrorIndicator />
    }
    return (
        <Box pt={5} bg={"#fff6f4"}>
            <Stack direction={"row"} w={"70%"} m={"auto"}>
                <InputGroup>
                    <Input placeholder="Search by Product Name" focusBorderColor="#426800" borderColor={"#426800"} backgroundColor={"white"} value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            fetchTheData();
                            allthedata();
                        }
                    }} />
                    <InputRightElement mr={1}>
                        <IconButton icon={<SearchIcon />} boxSize={8} bg="#426800" color={"white"} onClick={() => {
                            fetchTheData();
                            allthedata();
                        }} m={1} />
                    </InputRightElement>
                </InputGroup>
            </Stack>
            <Stack direction={["column", "column", "row"]} w={["70%", "70%", "60%"]} m={"auto"} mt={"1"}>
                <Select placeholder="Select Sort Criteria" w={["70%", "70%", "fit-content"]} m={"auto"} focusBorderColor="#426800" borderColor={"#426800"} onChange={(e) => setSortCri(e.target.value)} backgroundColor={"white"} value={sortcri}>
                    <option value={"price"}>Price</option>
                    <option value={"rating"}>Rating</option>
                </Select>
                <Select placeholder="Select Sorting Order" w={["70%", "70%", "fit-content"]} m={"auto"} borderColor={"#426800"} focusBorderColor="#426800" onChange={(e) => setSortOrd(e.target.value)} backgroundColor={"white"} value={sortOrd}>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </Select>
                <Select placeholder="Select for Alphabetic Order" w={["70%", "70%", "fit-content"]} focusBorderColor="#426800" m={"auto"} borderColor={"#426800"} value={order} onChange={(e) => setOrder(e.target.value)} backgroundColor={"white"}>
                    <option value="asc">A to Z</option>
                    <option value="desc">Z to A</option>
                </Select>
                <Stack direction={"row"} m={"auto"}>
                    <Button backgroundColor={"#426800"} color={"white"} onClick={fetchTheData} w={"fit-content"}>Apply</Button>
                    <Button backgroundColor={"red"} color={"white"} onClick={handleReset} w={"fit-content"}>Reset</Button>
                </Stack>
            </Stack>
            <SimpleGrid columns={["1", "1", "2", "3"]} spacing='20px' w={"80%"} m={"auto"} mt={"5"}>
                {productData?.map((item) => {
                    return <Productcard {...item} key={item.id} />
                })}
            </SimpleGrid>
            <Pagination totalData={totalData} handlePageChange={handlePageChange} page={currPage} limit={limit} />
            <Footer />
        </Box>
    )
}
export default Products