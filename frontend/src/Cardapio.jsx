import {
  Button,
  Stack,
  Box,
  SimpleGrid,
  Image,
  Text,
  Center,
  VStack,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { BotaoBonito } from './components/BotaoBonito';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api';
import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';

export function Cardapio() {
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!sessionStorage.getItem('access_token')) {
  //     navigate('/');
  //   }
  //   api
  //     .get('/user/loggedin/' + sessionStorage.getItem('access_token'))
  //     .catch(() => {
  //       navigate('/');
  //     });
  // }, []);

  return (
    <Grid
      templateAreas={`"header header"
                  "nav main"`}
      gridTemplateRows={'65px 1fr'}
      gridTemplateColumns={'150px 1fr'}
      h="100vh"
      gap="3"
      color="blackAlpha.700"
      fontWeight="bold"
    >
      <GridItem area={'header'}>
        <Text
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '65px',
          }}
          padding="2%"
          as="i"
          fontSize="4xl"
          fontFamily="Baskervville"
          fontWeight={500}
          color="#5F0000"
          position="absolute"
        >
          TicketRU
        </Text>
        <SimpleGrid pl="20%" pr="20%" pt="6px" columns={3} spacing={10}>
          <BotaoBonito
            title="Cardápio"
            height="65px"
            fontSize="20px"
            color="red.400"
            backgroundColor="red.300"
          />
          <BotaoBonito title="Tickets" height="65px" fontSize="20px" />
          <BotaoBonito title="Minha Conta" height="65px" fontSize="20px" />
        </SimpleGrid>
      </GridItem>
      <GridItem pl="2" bg="pink.300" area={'nav'}>
        Nav
      </GridItem>
      <GridItem pl="2" area={'main'}>
        Main
      </GridItem>
    </Grid>
  );
}
