import { Box, Text, VStack, Grid, GridItem, Image } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from './api';
import { userIcon, mapa } from './assets/images';
import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import { Header } from './components/header';
import { CardapioDia } from './components/cardapioDia';

export function Cardapio() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('Usuário não logado');
  const [email, setEmail] = useState('');

  useEffect(() => {
    // if (!sessionStorage.getItem('access_token')) {
    //   navigate('/');
    // }
    api
      .get('/user/loggedin/' + sessionStorage.getItem('access_token'))
      .then((response) => {
        if (response.status == 200) {
          setUsername(response.data.nome);
          setEmail(response.data.email);
        }
      });
  }, []);

  return (
    <Grid
      templateAreas={`"nav header"
              "nav main"`}
      gridTemplateRows={'65px 1fr'}
      gridTemplateColumns={'15% 1fr'}
      h="100%"
      gap={1}
      bg="red.400"
      padding={1}
    >
      <GridItem bg="white" w="100%" area={'nav'} borderRadius="5px">
        <VStack gap={5}>
          <Text
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="60px"
            as="i"
            fontSize="4xl"
            fontFamily="Baskervville"
            fontWeight={500}
            color="#5F0000"
            pt={3}
          >
            TicketRU
          </Text>

          <Box
            w="95%"
            h="15vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <VStack spacing={-1}>
              <Image src={userIcon} h="30%" w="30%" objectFit="cover" />
              <Text fontSize="md" color="grey" w="100%" align="center">
                {username}
              </Text>
              <Text fontSize="md" color="grey" w="100%" align="center">
                {email}
              </Text>
            </VStack>
          </Box>

          <VStack w="95%">
            <Box
              w="100%"
              h="20vh"
              borderWidth="5px"
              borderColor="grey"
              borderRadius="5px"
            >
              <Image
                src={mapa}
                h="100%"
                w="100%"
                objectFit="cover"
                borderRadius="5px"
                _hover={{ cursor: 'pointer' }}
                onClick={() => {
                  window.location.href =
                    'https://www.google.com.br/maps/place/Restaurante+Universit%C3%A1rio+-+UEM/@-23.406851,-51.9470125,15z/data=!4m5!3m4!1s0x94ecd6d298bf5319:0xec0c89cb12c03d91!8m2!3d-23.406851!4d-51.9382578';
                }}
              />
            </Box>
            <Text fontSize="lg" color="grey" w="100%" align="center">
              Localização
            </Text>
          </VStack>

          <Box w="95%" h="20vh" bg="blue" />
        </VStack>
      </GridItem>

      <Header cardapio="red.200" />

      <GridItem bg="white" area={'main'} borderRadius="5px">
        <VStack
          align="stretch"
          alignItems="center"
          justifyContent="center"
          h="100%"
          padding="10px"
        >
          <Text
            w="100%"
            align="center"
            bg={'#edb4b2'}
            fontSize="2xl"
            fontWeight={500}
            color="#5F0000"
            borderRadius="5px"
            borderWidth="2px"
            borderColor={'#5F0000'}
          >
            Cardápio da Semana
          </Text>
          <CardapioDia />
          <CardapioDia />
          <CardapioDia />
          <CardapioDia />
          <CardapioDia />
        </VStack>
      </GridItem>
    </Grid>
  );
}
