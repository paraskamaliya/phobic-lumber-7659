import { Tab, Tabs, TabList, TabPanel, TabPanels, FormControl, Input, Button, useToast, Checkbox, HStack } from "@chakra-ui/react"
import { useContext, useState } from "react"
import { AuthContext } from "../Context/AuthContextProvider"
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
    const { login } = useContext(AuthContext);
    const [emailLogin, setEmailLogin] = useState(localStorage.getItem("e-PlantEmail") || "");
    const [passwordLogin, setPasswordLogin] = useState(localStorage.getItem("e-PlantPass") || "");
    const [name, setName] = useState("");
    const [checkBox, setCheckBox] = useState(false);
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [load, setLoad] = useState(false);
    const toast = useToast();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogin = () => {
        setLoad(true);
        if (emailLogin === "admin" && passwordLogin === "admin") {
            navigate("/admin/home")
            login();
            localStorage.setItem("login", JSON.stringify(false));
            setLoad(false);
        } else {
            if (checkBox) {
                localStorage.setItem("e-PlantEmail", emailLogin);
                localStorage.setItem("e-PlantPass", passwordLogin);
            }
            axios.get(`https://64e37895bac46e480e78da47.mockapi.io/Users?email=${emailLogin}`)
                .then((res) => {
                    if (res.data[0]?.password === passwordLogin) {
                        toast({
                            title: 'Login Successful',
                            description: "We've successfully logged into your account.",
                            status: 'success',
                            duration: 3000,
                            isClosable: true,
                        });
                        login();
                        navigate(location.state || "/", { replace: true })
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
            setLoad(false);
        }
    }
    const handleSignup = () => {
        if (password !== confirmPassword) {
            return toast({
                title: 'Password Mismatch',
                description: "Please enter the same password for confirmation.",
                status: 'error',
                duration: 2000,
                isClosable: true,
            })
        }
        setLoad(true);
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
        setLoad(false);
    }
    return (<Tabs variant='soft-rounded' m={"auto"} w={["80%", "70%", "50%"]} isFitted mt={10}>
        <TabList>
            <Tab _selected={{ color: "white", bg: "#426800" }}>Login</Tab>
            <Tab _selected={{ color: "white", bg: "#426800" }}>SignUp</Tab>
        </TabList>

        <TabPanels>
            <TabPanel w={["80%", "80%", "70%"]} m={"auto"} >
                <FormControl mt={2}>
                    <Input value={emailLogin} name="email" type="email" focusBorderColor="#426800" onChange={(e) => { setEmailLogin(e.target.value) }} placeholder="Enter Email Address" />
                </FormControl>
                <FormControl mt={2}>
                    <Input value={passwordLogin} type="password" name="password" focusBorderColor="#426800" onChange={(e) => { setPasswordLogin(e.target.value) }} placeholder="Enter Password" />
                </FormControl>
                <HStack m={"auto"} mt={2} w={"fit-content"}>
                    <Checkbox value={checkBox} colorScheme="white" iconColor="#426800" onChange={(e) => setCheckBox(e.target.checked)} /><label>Remember Me</label>
                </HStack>
                <Button onClick={handleLogin} mt={2} bg={"#426800"} color={"white"} isLoading={load} spinnerPlacement='start'>Login</Button>
            </TabPanel>
            <TabPanel w={["80%", "80%", "70%"]} m={"auto"} >
                <FormControl mt={1}>
                    <Input value={name} focusBorderColor="#426800" name="name" type="text" onChange={(e) => { setName(e.target.value) }} placeholder="Enter Name" />
                </FormControl>
                <FormControl mt={2}>
                    <Input value={email} name="email" focusBorderColor="#426800" type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Enter Email Address" />
                </FormControl>
                <FormControl mt={2}>
                    <Input value={address} type="text" focusBorderColor="#426800" name="address" onChange={(e) => { setAddress(e.target.value) }} placeholder="Enter Address" />
                </FormControl>
                <FormControl mt={2}>
                    <Input value={password} type="password" focusBorderColor="#426800" name="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Enter Password" />
                </FormControl>
                <FormControl mt={2}>
                    <Input value={confirmPassword} type="password" focusBorderColor="#426800" name="password" onChange={(e) => { setConfirmPassword(e.target.value) }} placeholder="Enter Confirm Password" />
                </FormControl>
                <Button mt={2} bg={"#426800"} color={"white"} onClick={handleSignup} isLoading={load} spinnerPlacement='start'>SignUp</Button>
            </TabPanel>
        </TabPanels>
    </Tabs>)
}
export default Login