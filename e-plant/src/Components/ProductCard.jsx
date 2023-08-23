import { Card, CardBody, CardFooter, Link as ChakraLink, Image, Text, Button } from "@chakra-ui/react"
import { Link as ReactRouterDom } from "react-router-dom"

const Productcard = ({ images, title, rating, price, id }) => {
    return (
        <ChakraLink as={ReactRouterDom} to={`/products/${id}`} textDecoration={"none"} _hover={"none"}>
            <Card>
                <CardBody>
                    <Image src={images[0]} h={"400px"} />
                    <Text fontSize={"xl"} textAlign={"left"} fontWeight={500}>{title}</Text>
                    <Text textAlign={"left"}>{rating} ⭐</Text>
                    <Text textAlign={"left"} fontSize={"md"} fontWeight={500}>₹ {price}</Text>
                </CardBody>
                <CardFooter>
                    <Button bg={"#426800"} color={"white"}>Add to Cart</Button>
                </CardFooter>
            </Card>
        </ChakraLink>
    )
}
export default Productcard