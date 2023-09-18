import { Container, VStack, Input, IconButton } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'

import React, { useEffect } from 'react'
import { user } from '../Join'
import { io } from 'socket.io-client';

let socket;

const ENDPOINT = 'http://localhost:4500'

const Chat = () => {

  const send = () => {
    document.getElementById(`chatInput`).value;
    socket.emit('message', {});
  }

  useEffect(() => {
    const socket = io(ENDPOINT, { transports: ['websocket'] });

    socket.on('connect', () => {
      // alert('connected')
    })
    socket.emit('joined', { user })

    socket.on('welcome', (data) => {
      console.log(data.user, data.message);
    })

    socket.on('userJoined', (data) => {
      console.log(data.user, data.message);
    })

    socket.on('leave', (data) => {
      console.log(data.user, data.message)
    })

    return () => {
      socket.emit('disconect');
      socket.off();
    }
  }, [])

  return (
    <VStack bg='black' h='500px' justifyContent='center'>
      <Container
        style={{ borderRadius: '25px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        maxW='550px'
        h='400px'
        bg='purple.600'
        color='white'
      >
        <div style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}></div>
        <div style={{ width: '100%', display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <Input
            id='chatInput'
            style={{ marginRight: '10px' }}
            placeholder='write message...'
            size='md'
          />
          <button>
            <IconButton
              aria-label='Send'
              icon={<ChevronRightIcon />}
              colorScheme='white'
              bg='purple.500'
              _hover={{ bg: 'purple.600' }} // Define hover effect here
            />
          </button>
        </div>
      </Container>
    </VStack>
  )
}

export default Chat
