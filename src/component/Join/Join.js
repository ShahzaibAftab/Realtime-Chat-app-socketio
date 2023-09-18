import React, { useState } from 'react'
import { VStack, Container, Text, Input, Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'

let user;

const Join = () => {
    const toast = useToast()
    const sendUser = () => {
        user = document.getElementById('joinInput').value
        document.getElementById('joinInput').value = '';

    }
    const check = (e) => {
        e.preventDefault();
        setTimeout(() => {
            toast({
                title: "Fill the field",
                description: "Please Enter Your Name",
                status: "warning",
                duration: 9000,
                isClosable: true,
            });
        }, 2000);
    }
    const [name, setname] = useState('');
    return (
        <VStack alignItems="center" justifyContent="center" h="100vh">
            <Container
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "30px",
                    borderRadius: "25px",
                }}
                maxW="lg"
                bg="grey"
                color="white"
            >
                <Text fontSize="2xl" marginBottom="20px">
                    Login Here
                </Text>
                <Input onChange={(e) => setname(e.target.value)} id='joinInput' placeholder="Enter Your Name" size="md" type="text" />
                <Link onClick={(e) => !name ? check(e) : null} to='/chat'> <Button onClick={sendUser} colorScheme="teal" size="lg" marginTop="20px">
                    Start Chat
                </Button>
                </Link>
            </Container>
        </VStack>
    )
}

export default Join;
export { user }