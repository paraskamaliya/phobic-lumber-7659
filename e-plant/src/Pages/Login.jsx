import { Tab, Tabs, TabList, TabPanel, TabPanels, FormControl, Input, Button, useToast } from "@chakra-ui/react"
import { useContext, useState } from "react"
import { AuthContext } from "../Context/AuthContextProvider"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const toast = useToast();
    const navigate = useNavigate();
    const handleLogin = () => {
        if (email === "admin" && password === "admin") {
            navigate("/admin/home")
            login()
            localStorage.setItem("login", JSON.stringify(false));
        } else {
            axios.get(`https://64e37895bac46e480e78da47.mockapi.io/Users?email=${email}`)
                .then((res) => {
                    if (res.data[0].password === password) {
                        toast({
                            title: 'Login Successful',
                            description: "We've successfully logged into your account.",
                            status: 'success',
                            duration: 3000,
                            isClosable: true,
                        });
                        login();
                        navigate("/")
                        localStorage.setItem("user", JSON.stringify(res.data[0]))
                    } else {
                        toast({
                            title: 'Login Failed',
                            description: "Please Check Your Credentials.",
                            status: 'error',
                            duration: 3000,
                            isClosable: true,
                        })
                    }
                })
                .catch((err) => console.log(err))
            setEmail("");
            setPassword("");
        }
    }
    const handleSignup = () => {
        axios.post(`https://64e37895bac46e480e78da47.mockapi.io/Users`, {
            name: name,
            email: email,
            password: password,
            address: address,
            recent: [],
            cart: []
        })
            .then((res) => {
                if (res.status) {
                    toast({
                        title: 'Account is Created',
                        description: "We've created your account, you can login.",
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                    });
                }
                else {
                    toast({
                        title: 'Account is not created',
                        description: "We are facing some technical issue, Please try again after some time.",
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                    });
                }
            })
            .catch((err) => console.log(err))
    }
    return (<Tabs variant='soft-rounded' m={"auto"} w={["80%","70%","50%"]} isFitted mt={10}>
        <TabList>
            <Tab _selected={{ color: "white", bg: "#426800" }}>Login</Tab>
            <Tab _selected={{ color: "white", bg: "#426800" }}>SignUp</Tab>
        </TabList>

        <TabPanels>
            <TabPanel w={["80%","80%","70%"]} m={"auto"} >
                <FormControl mt={1}>
                    <Input value={email} name="email" type="email" focusBorderColor="#426800" onChange={(e) => { setEmail(e.target.value) }} placeholder="Enter Email Address" />
                </FormControl>
                <FormControl mt={2}>
                    <Input value={password} type="password" name="password" focusBorderColor="#426800" onChange={(e) => { setPassword(e.target.value) }} placeholder="Enter Password" />
                </FormControl>
                <Button onClick={handleLogin} mt={2} bg={"#426800"} color={"white"}>Login</Button>
            </TabPanel>
            <TabPanel w={["80%","80%","70%"]} m={"auto"} >
                <FormControl mt={1}>
                    <Input value={name} focusBorderColor="#426800" name="name" type="text" onChange={(e) => { setName(e.target.value) }} placeholder="Enter Name" />
                </FormControl>
                <FormControl mt={2}>
                    <Input value={email} name="email" focusBorderColor="#426800" type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Enter Email Address" />
                </FormControl>
                <FormControl mt={2}>
                    <Input value={password} type="password" focusBorderColor="#426800" name="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Enter Password" />
                </FormControl>
                <FormControl mt={2}>
                    <Input value={address} type="text" focusBorderColor="#426800" name="address" onChange={(e) => { setAddress(e.target.value) }} placeholder="Enter Address" />
                </FormControl>
                <Button mt={2} bg={"#426800"} color={"white"} onClick={handleSignup}>SignUp</Button>
            </TabPanel>
        </TabPanels>
    </Tabs>)
}
export default Login