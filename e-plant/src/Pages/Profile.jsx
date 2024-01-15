import { Avatar, Box, Button, Card, CardFooter, CardHeader, Divider, Flex, FormControl, FormLabel, Heading, Input, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Text, Textarea } from "@chakra-ui/react"
import { useEffect, useState } from "react";

const Profile = () => {
    const data = JSON.parse(localStorage.getItem("user"))
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState({ ...data });
    const handleEditClick = () => {
        setIsEditing(true);
    };
    const handleModalClose = () => {
        setIsEditing(false);
        setEditedData({ ...data });
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setEditedData({ ...editedData, avatar: URL.createObjectURL(file) });
        }
    };
    const handleSaveChanges = async () => {
        try {
            const response = await fetch(`https://64e37895bac46e480e78da47.mockapi.io/Users/${data.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(editedData),
            });

            if (response.ok) {
                localStorage.setItem("user", JSON.stringify(editedData));
                setIsEditing(false);
            } else {
                console.error("Error updating profile");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    useEffect(() => {
        document.title = data.name
    }, [])
    return <Flex h={"90vh"} alignItems={"center"} bg={"#fff6f4"}>
        <Box justifyContent={"center"} w={["80%", "80%", "50%"]} m={"auto"} mt={5}>
            <Card mt={5} lineHeight={10} bg={"rgb(244, 251, 244)"} boxShadow={"lg"}>
                <CardHeader>
                    <Heading color={"#426800"}>My Profile</Heading>
                </CardHeader>
                <Divider w={"80%"} m={"auto"} mb={5} />
                <Box w={"80%"} m={"auto"}>
                    <Avatar name={data.name} src={data.avatar} m={"auto"} />
                    <Text textAlign={"left"}>Name :-</Text>
                    <Input value={data.name} isReadOnly focusBorderColor="#426800" />
                    <Text textAlign={"left"}>Email :-</Text>
                    <Input value={data.email} isReadOnly focusBorderColor="#426800" />
                    <Text textAlign={"left"}>Password :-</Text>
                    <Input value={data.password} isReadOnly focusBorderColor="#426800" />
                    <Text textAlign={"left"}>Address :-</Text>
                    <Textarea value={data.address} isReadOnly focusBorderColor="#426800" />
                </Box>
                <CardFooter>
                    <Button bg={"#426800"} m={"auto"} color={"white"} onClick={handleEditClick}>Edit Profile</Button>
                </CardFooter>
            </Card>
            <Modal isOpen={isEditing} onClose={handleModalClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Profile</ModalHeader>
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input
                                value={editedData.name}
                                focusBorderColor="#426800"
                                onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
                            />
                        </FormControl>
                        <FormControl mt={3}>
                            <FormLabel>Email</FormLabel>
                            <Input
                                value={editedData.email}
                                focusBorderColor="#426800"
                                onChange={(e) => setEditedData({ ...editedData, email: e.target.value })}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Profile Picture</FormLabel>
                            <input type="file" accept="image/*" color="#426800" onChange={handleFileChange} focusBorderColor="#426800" />
                            {editedData.avatar && <Avatar name={editedData.name} src={editedData.avatar} size="xl" mt={3} />}
                        </FormControl>
                        <FormControl mt={3}>
                            <FormLabel>Address</FormLabel>
                            <Textarea
                                value={editedData.address}
                                focusBorderColor="#426800"
                                onChange={(e) => setEditedData({ ...editedData, address: e.target.value })}
                            />
                        </FormControl>
                        <FormControl mt={3}>
                            <FormLabel>Password</FormLabel>
                            <Input
                                value={editedData.password}
                                focusBorderColor="#426800"
                                onChange={(e) => setEditedData({ ...editedData, password: e.target.value })}
                            />
                        </FormControl>
                        <Button mt={5} bg={"#426800"} color={"white"} onClick={handleSaveChanges}>
                            Save Changes
                        </Button>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    </Flex>
}
export default Profile