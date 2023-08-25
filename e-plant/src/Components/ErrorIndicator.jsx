import { Alert,AlertIcon } from "@chakra-ui/react"

const ErrorIndicator = () => {
    return <Alert status='error'>
        <AlertIcon />
        Something went wrong, Please try again.
    </Alert>
}
export default ErrorIndicator