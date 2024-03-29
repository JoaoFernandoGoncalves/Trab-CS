import React, { useEffect } from 'react';
import { Button } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { FormLabel } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

export function InputLogin(props) {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  let title = props.title || 'Email/Usuário';
  let bdColor = props.bdColor || 'black';
  let bgColor = props.bgColor || 'white';
  let fontColor = props.fontColor || 'black';
  let size = props.size || 'lg';
  let password = props.password || false;
  let notShow = props.notShow || false;

  useEffect(() => {
    if (!password) {
      setShow(true);
    }
    if (notShow) {
      setShow(false);
    }
  });

  return (
    <Box position="relative" w="100%">
      <InputGroup size="md">
        <Input
          borderColor={bdColor}
          size={size}
          type={show ? 'text' : 'password'}
          value={props.value}
          onInput={props.onInput}
          isInvalid={props.isInvalid}
          errorBorderColor="red.400"
        />
        {password ? (
          <InputRightElement mt={1} mr="1">
            <Button size="sm" onClick={handleClick}>
              {show ? <ViewIcon /> : <ViewOffIcon />}
            </Button>
          </InputRightElement>
        ) : null}
      </InputGroup>
      <FormLabel
        position="absolute"
        top="-4"
        left="0"
        ml={2}
        mt={1}
        bg={bgColor}
        px={1}
        zIndex={1}
        fontSize="sm"
        color={fontColor}
      >
        {title}
      </FormLabel>
    </Box>
  );
}
