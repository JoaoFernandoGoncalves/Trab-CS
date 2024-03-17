import {
  Text,
  VStack,
  Grid,
  GridItem,
  Box,
  NumberInput,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  Stat,
  StatLabel,
  StatNumber,
  Radio,
  RadioGroup,
  HStack,
  Button,
} from '@chakra-ui/react';
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

export function Tickets() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [tickets, setTickets] = useState(0);
  const [preco, setPreco] = useState(5.0);
  const [precoTickets, setPrecoTickets] = useState(5.0);
  const [metodoPagamento, setMetodoPagamento] = useState('pix');
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
            setUserId(response.data.id);
            setUsername(response.data.nome);
            setEmail(response.data.email);
            setTickets(response.data.qtd_tickets);
          }
        })
        .catch((error) => {})
    );

    promises.push(
      api
        .get('/valor-ticket')
        .then((response) => {
          if (response.status == 200) {
            setPrecoTickets(response.data);
            setPreco(response.data);
          }
        })
        .catch((error) => {})
    );

    Promise.all(promises).then(() => {
      setIsFetched(true);
    });
  }, []);

  const realizarPagamento = () => {
    api
      .post('/compra-ticket', {
        user_id: userId,
        quantidade: preco / precoTickets,
        metodo_pagamento: metodoPagamento,
      })
      .then((response) => {
        if (response.status === 201) {
          window.location.reload();
        }
      })
      .catch((error) => {
        alert('Erro ao realizar pagamento');
      });
  };

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
        minhaConta={() => {
          navigate('/conta');
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
            <VStack
              align="stretch"
              alignItems="center"
              justifyContent="center"
              padding="10px"
            >
              <Text
                w="100%"
                align="center"
                fontSize="xl"
                fontWeight={500}
                color="white"
              >
                Você possui{' '}
                <Text fontWeight="bold" color="green.200">
                  {tickets}
                </Text>{' '}
                Tickets
              </Text>
            </VStack>
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
                Compra de Tickets
              </Text>

              <VStack
                h="100%"
                w="100%"
                display="flex"
                padding="10px"
                fontSize="xl"
                fontWeight={500}
                color="white"
                gap={10}
              >
                <VStack w="100%">
                  <Text w="100%" align="center">
                    Quantidade de Tickets:
                  </Text>

                  <NumberInput
                    w="8%"
                    defaultValue={1}
                    min={1}
                    max={30}
                    allowMouseWheel
                    focusBorderColor="red.200"
                    align="center"
                    onChange={(value) => {
                      setPreco(value * precoTickets);
                    }}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper color="white" border="none" />
                      <NumberDecrementStepper color="white" border="none" />
                    </NumberInputStepper>
                  </NumberInput>
                </VStack>

                <RadioGroup
                  h="40%"
                  alignItems="center"
                  defaultValue="pix"
                  colorScheme="red"
                  size="lg"
                  align="center"
                  onChange={(value) => {
                    setMetodoPagamento(value);
                    console.log(value);
                  }}
                >
                  <Text pb={4}>Forma de Pagamento:</Text>
                  <HStack spacing="24px">
                    <Radio value="pix">Pix</Radio>
                    <Radio value="cartao_credito">Crédito</Radio>
                    <Radio value="cartao_debito">Débito</Radio>
                    <Radio value="boleto">Boleto</Radio>
                  </HStack>
                </RadioGroup>

                <Stat h="5%" size="lg" align="center">
                  <StatLabel>Total à pagar:</StatLabel>
                  <StatNumber fontSize="2xl" color="green.200">
                    R${preco},00
                  </StatNumber>
                </Stat>

                <Button
                  size="lg"
                  colorScheme="green"
                  borderWidth="2px"
                  borderColor="green.700"
                  onClick={realizarPagamento}
                >
                  Realizar Pagamento
                </Button>
              </VStack>
            </VStack>
          </Box>
        </VStack>
      </GridItem>
    </Grid>
  );
}
