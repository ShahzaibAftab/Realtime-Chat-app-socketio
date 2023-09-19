import { Container, VStack, Input, IconButton, useToast } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import React, { useEffect, useState } from 'react';
import { user } from '../Join';
import { io } from 'socket.io-client';
import Message from '../../Message/Message';
import ReactScrollToBottom from 'react-scroll-to-bottom'

const ENDPOINT = 'http://localhost:4500';

const Chat = () => {
  const toast = useToast()
  const [chatside, setchatside] = useState()
  const [id, setid] = useState('');
  const [messages, setmessages] = useState([])
  const [socket, setSocket] = useState(null);

  const send = () => {
    const message = document.getElementById(`chatInput`).value;
    socket.emit('message', { message, id });
    document.getElementById(`chatInput`).value = '';
  };

  useEffect(() => {
    const newSocket = io(ENDPOINT, { transports: ['websocket'] });
    setSocket(newSocket);

    newSocket.on('connect', () => {
      setTimeout(() => {
        toast({
          position: 'top',
          title: "Chatroom Created Successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
          
        });
      }, 2000);
      setid(newSocket.id);
    });
    newSocket.emit('joined', { user });

    newSocket.on('welcome', (data) => {
      setmessages([...messages, data]);
      console.log(data.user, data.message);
    });

    newSocket.on('userJoined', (data) => {
      setmessages([...messages, data]);
      console.log(data.user, data.message);
    });

    newSocket.on('leave', (data) => {
      setmessages([...messages, data]);
      console.log(data.user, data.message);
    });

    return () => {
      newSocket.disconnect();
      newSocket.off();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('sendMessage', (data) => {
        console.log(data.user, data.message, data.id);
        setmessages([...messages, data]);
      });
    }
    return () => {
      // socket.off()
    };
  }, [messages]);

  return (
    <VStack bg='#28282B' h='650px' justifyContent='center'>
      <Container
        style={{
          borderRadius: '25px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.5)"
        }}
        maxW='550px'
        h='400px'
        bg='white'
        color='white'
        overflowY='auto'
      >
        <div style={{ flex: '1', display: 'flex', justifyContent: 'flex-start' }}>
          <div
            style={{
              marginTop: '20px',
              overflowY: 'auto',
            }}
          >
            {messages.map((item, i) =>
              <Message
                key={i}
                message={item.message}
                user={item.id === id ? '' : item.user}
                classs={item.id === id ? 'marginRight' : 'marginLeft'}
              />)}
          </div>
        </div>

      </Container>
      <div style={{borderRadius:'10px', background:'white', width: '40%', display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <Input
          id='chatInput'
          style={{ marginRight: '10px', color: 'grey' }}
          placeholder='write message...'
          size='md'
        />
        <button onClick={send}>
          <IconButton
            aria-label='Send'
            icon={<ChevronRightIcon />}
            colorScheme='white'
            bg='purple.500'
            _hover={{ bg: 'purple.600' }} // Define hover effect here
          />
        </button>
      </div>
    </VStack>

  );
};

export default Chat;
