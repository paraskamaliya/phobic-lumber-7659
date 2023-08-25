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
    const toast = useToast();
    const navigate = useNavigate();
    const handleLogin = () => {
        if (email === "admin" && password === "admin") {
            navigate("/admin/home")
            login()
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
            address: "",
            recent: [],
            cart: []
        })
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
    }
    return (<Tabs variant='soft-rounded' colorScheme='green' m={"auto"} w={"50%"} isFitted mt={10}>
        <TabList>
            <Tab>Login</Tab>
            <Tab>SignUp</Tab>
        </TabList>

        <TabPanels>
            <TabPanel w={"70%"} m={"auto"} >
                <FormControl mt={1}>
                    <Input value={email} name="email" type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Enter Email Address" />
                </FormControl>
                <FormControl mt={2}>
                    <Input value={password} type="password" name="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Enter Password" />
                </FormControl>
                <Button onClick={handleLogin} mt={2} colorScheme="green">Login</Button>
            </TabPanel>
            <TabPanel w={"70%"} m={"auto"} >
                <FormControl mt={1}>
                    <Input value={name} name="name" type="text" onChange={(e) => { setName(e.target.value) }} placeholder="Enter Name" />
                </FormControl>
                <FormControl mt={2}>
                    <Input value={email} name="email" type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Enter Email Address" />
                </FormControl>
                <FormControl mt={2}>
                    <Input value={password} type="password" name="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Enter Password" />
                </FormControl>
                <Button mt={2} colorScheme="green" onClick={handleSignup}>SignUp</Button>
            </TabPanel>
        </TabPanels>
    </Tabs>)
}
export default Login