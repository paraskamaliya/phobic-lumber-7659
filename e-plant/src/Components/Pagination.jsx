import { Button, Center, HStack } from "@chakra-ui/react"

const Pagination = ({ totalData, handlePageChange, page }) => {
    const totalPage = Math.ceil(totalData / 10);
    const renderButtons = () => {
        const buttons = [];
        for (let i = 1; i <= totalPage; i++) {
            buttons.push(
                <Button
                    key={i}
                    bg={i === page ? "#426800" : "green.50"}
                    color={i === page ? "white" : "black"}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </Button>
            );
        }
        return buttons;
    };
    return <Center>
        <HStack>
            {renderButtons()}
        </HStack>
    </Center>
}
export default Pagination