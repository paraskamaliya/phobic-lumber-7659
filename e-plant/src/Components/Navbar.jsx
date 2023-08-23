import { NavLink } from 'react-router-dom'
import { Link as ReactRouterLink } from "react-router-dom"
import {
    Box, Link as ChakraLink, Image, Spacer, Stack, IconButton, Avatar, Button, AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    useDisclosure
} from '@chakra-ui/react'
import { FaShoppingCart } from 'react-icons/fa';
import styles from "./Navbar.module.css"
import { useContext, useRef } from 'react';
import { AuthContext } from '../Context/AuthContextProvider';
function Navbar() {
    const { isAuth, logout } = useContext(AuthContext);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()
    return <Box bg={"green.50"}>
        <Stack direction={"row"} m={"auto"} align={"center"} w={"90%"} >
            <Box>
                <ChakraLink as={ReactRouterLink} to='/'>
                    <Image src="https://i.postimg.cc/VNJc4J4q/E-Plant-removebg-preview1.png" w={"80px"} h={"80px"} />
                </ChakraLink>
            </Box>
            <Spacer />
            <Box display={"flex"} justifyContent={'space-evenly'} w={"50%"} alignItems={"center"}>
                <NavLink to={"/"} className={({ isActive }) => {
                    return isActive ? styles.active : styles.default
                }}>Home</NavLink>
                <NavLink to={"/products"} className={({ isActive }) => {
                    return isActive ? styles.active : styles.default
                }}>Products</NavLink>
                <NavLink to={"/blog"} className={({ isActive }) => {
                    return isActive ? styles.active : styles.default
                }}>Blog</NavLink>
            </Box>
            <Spacer />
            <Box display={"flex"} gap={"20px"} alignItems={"center"}>
                {isAuth ? (<>
                    <ChakraLink as={ReactRouterLink} to={"/profile"}>
                        <Avatar name='Dan Abrahmov' src='https://bit.ly/broken-link' />
                    </ChakraLink>
                    <IconButton icon={<FaShoppingCart />} color="#486E00" fontSize='20px' size={"md"} />
                </>
                ) : null}
                <Button bg={isAuth ? "red" : "#426800"} color={"white"} onClick={isAuth ? onOpen : undefined}>
                    <NavLink to={!isAuth ? "/login" : undefined}>
                        {isAuth ? "Logout" : "Login"}
                    </NavLink>
                    {isAuth && (<AlertDialog
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
                                <Button colorScheme='red' ml={3} onClick={logout}>
                                    Yes
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>)}
                </Button>
            </Box>
        </Stack >
    </Box>
}
export default Navbar