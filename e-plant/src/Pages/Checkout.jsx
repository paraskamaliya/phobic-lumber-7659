import { Box, Button, Card, FormControl, FormHelperText, Heading, Input, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, PinInput, PinInputField, Stack, Text, HStack, useToast, Select, ModalCloseButton, Tooltip, Image } from "@chakra-ui/react"
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Checkout = () => {
    const [amount, setAmount] = useState(0);
    const [couponCode, setCouponCode] = useState("");
    const toast = useToast();
    const [userData, setUserData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cardnum, setCardNum] = useState("");
    const [cardSel, setCardSel] = useState("");
    const navigate = useNavigate();
    const [flag, setFlag] = useState(false);

    const handleCouponCode = () => {
        if (couponCode === "Masai30") {
            let newAmount = Math.floor(amount * 0.70);
            setAmount(newAmount);
            localStorage.setItem("amount", JSON.stringify(newAmount));
            setCouponCode("");
            toast({
                title: "Coupon Applied Successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
            })
            setFlag(true);
        }
        else if (couponCode === "Masai15") {
            let newAmount = Math.floor(amount * 0.85);
            setAmount(newAmount);
            localStorage.setItem("amount", JSON.stringify(newAmount));
            setCouponCode("");
            toast({
                title: "Coupon Applied Successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
            })
            setFlag(true);
        }
        else {
            toast({
                title: "Invalid Coupon Code",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    }
    const handleConfirm = () => {
        if ((cardnum.length === 16) && (cardSel !== "")) {
            setIsModalOpen(false);
            toast({
                title: "Your Order Successfully Placed",
                status: "success",
                duration: 3000,
                isClosable: true
            });
            navigate("/")
            const data = JSON.parse(localStorage.getItem("user"))
            data.cart = [];
            localStorage.setItem("user", JSON.stringify(data));
            axios.put(`https://64e37895bac46e480e78da47.mockapi.io/Users/${data.id}`, {
                cart: data.cart
            });
        }
        else {
            toast({
                title: "Please enter correct Card number",
                status: "error",
                duration: 3000,
                isClosable: true
            })
        }
    }

    useEffect(() => {
        let storedAmount = JSON.parse(localStorage.getItem("amount"));
        setAmount(storedAmount || 0);
        let data = JSON.parse(localStorage.getItem("user"))
        setUserData(data);
    }, []);
    return <Box minHeight={"90vh"} bg={"#fff6f4"}>
        <Stack direction={["column", "column", "row"]} w={"100%"} pt={5}>
            <Box w={"100%"}>
                <Heading color={"#426800"}>Order Details</Heading>
                <Box m={"auto"} justifyContent={"center"}>
                    {
                        userData.cart?.length > 0 && userData.cart?.map((el) => {
                            return <Stack direction={"row"} w={"80%"} m={"auto"} mt={2} border={"1px solid #426800"} borderRadius={"15px"} bg={"white"} key={el.id}>
                                <Image src={el.image} w={"50%"} objectFit={"cover"} height={"250px"} width={"250px"} borderRadius={"15px 0px 0px 15px"} />
                                <Box w={"50%"} textAlign={"left"}>
                                    <Text fontSize={"large"}>Title :- {el.title}</Text>
                                    <Text fontSize={"large"}>Price :- {el.price}</Text>
                                    <Text fontSize={"large"}>Category :- {el.category}</Text>
                                    <Text fontSize={"large"}>Quantity :- {el.quantity}</Text>
                                    <Text fontSize={"large"}>Rating :- {el.rating}⭐</Text>
                                </Box>
                            </Stack>
                        })
                    }
                </Box>
            </Box>
            <Box w={"100%"}>
                <Heading color={"#426800"}>
                    Your Total : {amount}
                </Heading>
                <Stack w={"80%"} m={"auto"} direction={"row"} mb={5}>
                    <FormControl w={"80%"} m={"auto"} >
                        <Tooltip hasArrowvere label={flag == true && "You have already applied Coupon"} placement="bottom-start">
                            <Input placeholder="Enter Coupon Code" isDisabled={flag == true} focusBorderColor="#426800" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} borderColor={"#426800"} />
                        </Tooltip>
                        <FormHelperText>Please be carefull while entering coupon code, it will be not changed.</FormHelperText>
                        <Button bg={"#426800"} color={"white"} onClick={handleCouponCode}>Apply Coupon</Button>
                    </FormControl>
                </Stack>
                <Box w={"50%"} m={"auto"} mt={10} bg={"white"}>
                    <Heading>Please check your details</Heading>
                    <Card p={5}>
                        <Text>{userData.name}</Text>
                        <Text>{userData.address}</Text>
                        <Text>{userData.email}</Text>
                    </Card>
                </Box>
                <Button onClick={() => setIsModalOpen(true)} mt={5} bg={"#426800"} color={"white"}>Confirm Order</Button>
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Confirm Order</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <form>
                                <Select placeholder="Select Card Type" focusBorderColor="#426800" m={1} value={cardSel} onChange={(e) => setCardSel(e.target.value)}>
                                    <option value="credit">Credit Card</option>
                                    <option value="debit">Debit Card</option>
                                </Select >
                                <Input
                                    m={1}
                                    required
                                    placeholder="Enter Card Number"
                                    maxLength={16}
                                    type="number"
                                    minLength={16}
                                    pattern="[0-9]{16}"
                                    title="Please enter a 16-digit card number."
                                    value={cardnum}
                                    focusBorderColor="#426800"
                                    onChange={(e) => setCardNum(e.target.value)} />
                                <Button m={1} bg={"#426800"} color={"white"} onClick={handleConfirm}>Confirm Order</Button>
                            </form>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </Box>
        </Stack >
    </Box>
}
export default Checkout