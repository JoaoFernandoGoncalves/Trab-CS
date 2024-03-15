import React, { useEffect } from 'react';
import { Button } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { FormLabel } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

export function BotaoBonito(props) {
  return (
    <Box
      height={props.height || '50px'}
      fontSize={props.fontSize || '12px'}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      padding="2px"
      textTransform="uppercase"
      fontWeight={500}
      color={'#000'}
      backgroundColor={props.backgroundColor || '#fff'}
      border="none"
      borderRadius="45px"
      boxShadow={'0px 8px 15px rgba(40, 0, 0, 0.1)'}
      transition="all 0.3s ease 0s"
      cursor="pointer"
      outline="none"
      _hover={{
        backgroundColor: 'red.400',
        boxShadow: '0px 15px 20px rgba(95, 0, 0, 0.2)',
        color: '#fff',
        fontWeight: 700,
        letterSpacing: '2.5px',
      }}
      _active={{
        transform: 'translateY(3px)',
      }}
      onClick={props.onClick}
    >
      {props.title || 'Botão'}
    </Box>
  );
}
