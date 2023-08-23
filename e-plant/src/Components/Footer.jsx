import { Box, Stack, Text, Image, HStack, Link, Spacer } from "@chakra-ui/react"
import { FiInstagram } from "react-icons/fi"
import { FaTelegram } from "react-icons/fa"
const Footer = () => {
    return <Box w={"100%"} m={"auto"} mt={20} borderTop={"1px"} borderTopColor={"#426800"} p={10} >
        <Stack direction={["column", "column", "row"]} m={"auto"}>
            <Box lineHeight={"10"} textAlign={"center"}>
                <Image src="https://i.postimg.cc/VNJc4J4q/E-Plant-removebg-preview1.png" w={"80px"} h={"80px"} m={"auto"} />
                <Text fontWeight={500}>Email :- eplant.2002@gmail.com</Text>
                <HStack alignItems={"center"} m={"auto"} w={"fit-content"}>
                    <Link href="https://www.instagram.com/" isExternal fontSize={"2xl"}>{<FiInstagram />}</Link>
                    <Link href="https://web.telegram.org/k/" fontSize={"2xl"} isExternal>{<FaTelegram />}</Link>
                </HStack>
            </Box>
            <Spacer />
            <Box textAlign={"center"}>
                <Text fontSize={"xl"} color="#426800" textDecor={"underline"} fontWeight={600}>Catalog</Text>
                <Spacer />
                <Link href="/products" display={"block"}>Sale</Link>
                <Link href="/products" display={"block"}>Houseplants</Link>
                <Link href="/products" display={"block"}>Monsoon Plant Set</Link>
                <Link href="/products" display={"block"}>Flowerplants</Link>
            </Box>
            <Spacer />
            <Box textAlign={"center"}>
                <Text fontSize={"xl"} color="#426800" textDecor={"underline"} fontWeight={600}>Information</Text>
                <Link href="/products" display={"block"}>Plant Care</Link>
                <Link href="/products" display={"block"}>Delivery & Payment</Link>
                <Link href="/products" display={"block"}>Privacy Policy</Link>
            </Box>
            <Spacer />
            <Box textAlign={"center"}>
                <Text fontSize={"xl"} color="#426800" textDecor={"underline"} fontWeight={600}>About Us</Text>
                <Spacer />
                <Link href="/products" display={"block"}>Our Story</Link>
                <Link href="/products" display={"block"}>Our Partners</Link>
                <Link href="/products" display={"block"}>Work Process</Link>
                <Link href="/products" display={"block"}>Contacts</Link>
            </Box>
        </Stack>
    </Box>
}
export default Footer