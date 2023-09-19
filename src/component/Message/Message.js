import React from 'react'
import { Box } from "@chakra-ui/react";

const Message = ({ user, message, classs }) => {
    const messageStyle = {
        marginRight: classs === 'marginRight' ? '0' : '350px',
        marginLeft: classs === 'marginLeft' ? '350px' : '0',
    };

    if (user) {
        return (
            <Box
                style={{ marginLeft: '420px' }}
                p="2"
                mb="2"
                maxW="100%"
                bgColor="blue.300"
                color="white"
                borderRadius="lg"
                alignSelf="flex-start"
            >
                {`${user}:${message}`}
            </Box>
        );
    } else {
        return (
            <Box

                p="2"
                mb="2"
                maxW="60%"
                bgColor="blue.300"
                color="white"
                borderRadius="lg"
                alignSelf="flex-start"
                boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)"
            >
                {`You: ${message}`}
            </Box>
        );
    }
};


export default Message
