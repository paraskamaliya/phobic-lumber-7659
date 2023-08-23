import { Alert, AlertIcon } from "@chakra-ui/react"
const Notfound = () => {
    return (
        <Alert status='error' w={"50%"} m={"auto"} >
            <AlertIcon />
            Page is not found, Please check again URL.
        </Alert>
    )
}
export default Notfound