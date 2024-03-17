import { Text, VStack, Grid, GridItem, Box, Image } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api';
import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import { Header } from './components/header';
import { Nav } from './components/nav';
import { comidas } from './assets/images';
import { userIcon } from './assets/images';

export function Conta() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [tickets, setTickets] = useState(0);
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem('access_token')) {
      navigate('/');
    }

    let promises = [];

    promises.push(
      api
        .get('/user/loggedin/' + sessionStorage.getItem('access_token'))
        .then((response) => {
          if (response.status == 200) {
            setUsername(response.data.nome);
            setEmail(response.data.email);
            setTickets(response.data.qtd_tickets);
          }
        })
        .catch((error) => {})
    );

    Promise.all(promises).then(() => {
      setIsFetched(true);
    });
  }, []);

  if (!isFetched) {
    return <div>Carregando...</div>;
  }
  return (
    <Grid
      templateAreas={`"nav header"
              "nav main"`}
      gridTemplateRows={'65px 1fr'}
      gridTemplateColumns={'15% 1fr'}
      h="100vh"
      gap={0.5}
      bg="gray.700"
      padding={0.5}
    >
      <Nav username={username} email={email} tickets={tickets} />

      <Header
        cardapio={() => {
          navigate('/cardapio');
        }}
        tickets={() => {
          navigate('/tickets');
        }}
      />

      <GridItem
        backgroundImage={comidas}
        backgroundSize="60%"
        pt="10px"
        pb="10px"
        pl="20%"
        pr="20%"
        area={'main'}
        h="100%"
        w="100%"
        overflowY={'auto'}
      >
        <VStack w="100%" display="flex" spacing={4}>
          <Box
            w="100%"
            align="center"
            bg={'gray.500'}
            color="white"
            borderRadius="25px"
            borderWidth="2px"
            borderColor="black"
            shadow={'0px 2px 5px rgba(40, 0, 0, 0.5)'}
          >
            <Box
              w="95%"
              h="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
              padding={10}
            >
              <VStack>
                <Image src={userIcon} boxSize="15%" objectFit="cover" />
                <Text fontSize="lg" w="100%" align="center">
                  {username}
                  <br />
                  {email}
                  <br />
                  {tickets} Tickets
                </Text>
              </VStack>
            </Box>
          </Box>

          <Box
            h="100%"
            w="100%"
            bg={'gray.500'}
            color="white"
            borderRadius="25px"
            borderWidth="2px"
            borderColor="black"
            shadow={'0px 2px 5px rgba(40, 0, 0, 0.5)'}
          >
            <VStack
              display="flex"
              align="center"
              alignItems="center"
              justifyItems="center"
              w="100%"
              padding={5}
            >
              <Text
                w="100%"
                bg={'red.400'}
                align="center"
                fontSize="2xl"
                fontWeight={500}
                color="white"
                borderRadius="5px"
                borderWidth="2px"
                borderColor={'#5F0000'}
                shadow={'0px 2px 5px rgba(40, 0, 0, 0.5)'}
              >
                Editar Informações
              </Text>
            </VStack>
          </Box>
        </VStack>
      </GridItem>
    </Grid>
  );
}
