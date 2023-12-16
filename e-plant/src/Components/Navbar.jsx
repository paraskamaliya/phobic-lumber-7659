import { NavLink, useNavigate } from 'react-router-dom'
import { Link as ReactRouterLink } from "react-router-dom"
import { ChevronDownIcon } from "@chakra-ui/icons"
import {
    Box, Link as ChakraLink, Image, Spacer, Stack, IconButton, Avatar, Button, AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    useDisclosure,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider
} from '@chakra-ui/react'
import { FaShoppingCart } from 'react-icons/fa';
import styles from "./Navbar.module.css";
import { MdAccountCircle } from "react-icons/md";
import { IoMdExit } from "react-icons/io";
import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../Context/AuthContextProvider';

function Navbar() {
    const { isAuth, logout } = useContext(AuthContext);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()
    const navigate = useNavigate();
    const [cartData, setCartData] = useState([]);
    const fetchCartData = () => {
        const data = JSON.parse(localStorage.getItem("user"))
        setCartData(data?.cart);
        calculateTotalQuantity();
    }
    const calculateTotalQuantity = () => {
        return cartData?.reduce((total, product) => total + product.quantity, 0);

    };
    const handleLogout = () => {
        logout()
        onClose()
        navigate("/")
        localStorage.setItem("user", JSON.stringify(""));
    }
    let avatar;
    let name;
    useEffect(() => {
        fetchCartData();
    }, [])
    if (isAuth) {
        const data = JSON.parse(localStorage.getItem("user"))
        avatar = data.avatar
        name = data.name
    }
    return <Box backgroundColor={"#edffed"}>
        <Stack direction={["column", "column", "row"]} m={"auto"} align={"center"} w={"90%"} >
            <Box>
                <ChakraLink as={ReactRouterLink} to='/'>
                    <Image src="https://i.postimg.cc/VNJc4J4q/E-Plant-removebg-preview1.png" w={"80px"} h={"80px"} />
                </ChakraLink>
            </Box>
            <Spacer />
            <Stack direction={["row", "row", "row"]} m={"auto"} w={["100%", "100%", "66.66%"]} justifyContent={["space-between", "space-between", "space-evenly"]} >
                <Box fontSize={"larger"} display={"flex"} justifyContent={'space-evenly'} w={"50%"} alignItems={"center"} >
                    <NavLink to={"/"} className={({ isActive }) => {
                        return isActive ? styles.active : styles.default
                    }} >Home</NavLink>
                    <NavLink to={"/products"} className={({ isActive }) => {
                        return isActive ? styles.active : styles.default
                    }}>Products</NavLink>
                </Box>
                <Spacer />
                <Box display={"flex"} gap={"20px"} alignItems={"center"} >
                    {isAuth ? (<>
                        <Menu >
                            <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} rightIcon={<ChevronDownIcon fontSize={"2xl"} />}>
                                <Avatar name={isAuth ? name : ""} src={isAuth ? avatar : "https://bit.ly/broken-link"} />
                            </MenuButton>
                            <MenuList bg={"#d7ffd7"}>
                                <MenuItem bg={"#d7ffd7"}>
                                    <ChakraLink as={ReactRouterLink} to={"/profile"} m={"auto"} _hover={{ textDecoration: "none" }} w={"100%"} textAlign={"center"}>
                                        <Button w={"100%"} bgColor={"#426800"} color={"white"} _hover={{ bgColor: "#426800", color: "white" }} leftIcon={<MdAccountCircle />}>Profile</Button>
                                    </ChakraLink>
                                </MenuItem>
                                <MenuItem bg={"#d7ffd7"}>
                                    <ChakraLink as={ReactRouterLink} to={"/cart"} m="auto" _hover={{ textDecoration: "none" }} w={"100%"} textAlign={"center"}>
                                        <Button w={"100%"} bgColor={"#426800"} color={"white"} _hover={{ bgColor: "#426800", color: "white" }} leftIcon={<FaShoppingCart />}>Cart</Button>
                                    </ChakraLink>
                                </MenuItem>
                                <MenuDivider />
                                <MenuItem bg={"#d7ffd7"}>
                                    <Button w={"100%"} bg={"red"} color={"white"} leftIcon={<IoMdExit />} onClick={onOpen} _hover={{ bgColor: "red" }}>
                                        Logout
                                        <AlertDialog
                                            motionPreset='slideInBottom'
                                            leastDestructiveRef={cancelRef}
                                            onClose={onClose}
                                            isOpen={isOpen}
                                            isCentered
                                        >
                                            <AlertDialogOverlay />
                                            <AlertDialogContent>
                                                <AlertDialogHeader>Log Out</AlertDialogHeader>
                                                <AlertDialogCloseButton />
                                                <AlertDialogBody>
                                                    Are you sure you want to logout?
                                                </AlertDialogBody>
                                                <AlertDialogFooter>
                                                    <Button ref={cancelRef} onClick={onClose}>
                                                        No
                                                    </Button>
                                                    <Button colorScheme='red' ml={3} onClick={handleLogout}>
                                                        Yes
                                                    </Button>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </Button>
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </>
                    ) : <Button bg={"#426800"} color={"white"} _hover={{ bgColor: "#426800" }}>
                        <NavLink to={"/login"} >
                            Login
                        </NavLink>
                    </Button>
                    }
                </Box>
            </Stack>
        </Stack >
    </Box >
}
export default Navbar