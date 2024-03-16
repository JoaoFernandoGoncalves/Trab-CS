import React, { useEffect } from 'react';
import { Button } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { FormLabel } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

export function BotaoBonito(props) {
  let disabled;
  if (props.backgroundColor === 'red.200') {
    disabled = true;
  }

  return (
    <Box
      w={props.w || '100px'}
      height={props.height || '50px'}
      fontSize={props.fontSize || '12px'}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      padding="2px"
      textTransform="uppercase"
      fontWeight={500}
      color={'#000'}
      backgroundColor={props.backgroundColor}
      border="none"
      borderRadius="45px"
      transition="all 0.3s ease 0s"
      cursor="pointer"
      outline="none"
      _hover={
        disabled || {
          backgroundColor: 'red.400',
          color: '#fff',
          fontWeight: 700,
          letterSpacing: '2.5px',
        }
      }
      _active={
        disabled || {
          transform: 'translateY(3px)',
        }
      }
      onClick={props.onClick}
    >
      {props.title || 'Botão'}
    </Box>
  );
}
