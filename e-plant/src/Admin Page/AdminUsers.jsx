import { DeleteIcon } from "@chakra-ui/icons";
import { Box, Button, Heading, IconButton, Link, Spinner, Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react"
import { Link as ReactRouterDom } from "react-router-dom";
import ErrorIndicator from "../Components/ErrorIndicator";
import Pagination from "../Components/Pagination";
const AdminUsers = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [err, setErr] = useState(false);
    const [totalData, setTotalData] = useState();
    const limit = 10;
    let url = new URL("https://64e37895bac46e480e78da47.mockapi.io/Users")
    const fetchTheUsers = () => {
        setLoading(true);
        url.searchParams.append("page", page);
        url.searchParams.append("limit", limit);
        axios.get(url)
            .then((res) => {
                setData(res.data);
                setLoading(false);
                setErr(false);
            })
            .catch((err) => {
                setErr(true)
                setData([]);
                setLoading(false);
            })
    }
    const handlePageChange = (value) => {
        setPage(value);
    }
    const handleDelete = (id) => {
        axios.delete(`https://64e37895bac46e480e78da47.mockapi.io/Users/${id}`)
            .then(() => fetchTheUsers())
            .catch((err) => setErr(err))
    }
    let url1 = new URL("https://64e37895bac46e480e78da47.mockapi.io/Users")
    const gettotalData = () => {
        axios.get(url1)
            .then((res) => setTotalData(res.data.length))
            .catch((err) => console.log(err))
    }
    useEffect(() => {
        gettotalData();
        fetchTheUsers();
    }, [page])
    if (loading) {
        return <Spinner size={"xl"} mt={250} />
    }
    if (err) {
        return <ErrorIndicator />
    }
    return (
        <Box>
            <Link as={ReactRouterDom} to={"/admin/home"} textDecoration="none" _hover={{ textDecoration: "none" }}>
                <Button mt={5} bg={"#426800"} color={"whiteAlpha.900"}>Show Products</Button>
            </Link>
            <Stack mt={5}>
                <Heading color="#426800">Users Details</Heading>
                <TableContainer w={"100%"} m={"auto"} >
                    <Table variant='simple'>
                        <Thead bg={"green.50"} m={"auto"}>
                            <Tr>
                                <Th textAlign={"center"}>ID</Th>
                                <Th textAlign={"center"}>Name</Th>
                                <Th textAlign={"center"}>Email</Th>
                                <Th textAlign={"center"}>Address</Th>
                                <Th textAlign={"center"} bg={"red.500"} color={"white"}>Delete</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data.length > 0 && data.map((item) => {
                                return <Tr key={item.id}>
                                    <Td textAlign={"center"}>{item.id}.</Td>
                                    <Td textAlign={"center"}>{item.name}</Td>
                                    <Td textAlign={"center"}>{item.email}</Td>
                                    <Td textAlign={"center"}>{item.address}</Td>
                                    <Td textAlign={"center"}>
                                        <IconButton icon={<DeleteIcon />} onClick={() => { handleDelete(item.id) }} bg={"red.500"} color={"white"} />
                                    </Td>
                                </Tr>
                            })}
                        </Tbody>
                    </Table>
                </TableContainer>
                <Pagination totalData={totalData} handlePageChange={handlePageChange} page={page} limit={limit} />
            </Stack>
        </Box>
    )
}
export default AdminUsers