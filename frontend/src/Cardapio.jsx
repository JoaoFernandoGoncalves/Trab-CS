import { Text, VStack, Grid, GridItem, Image } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api';
import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import { Header } from './components/header';
import { CardapioDia } from './components/cardapioDia';
import { Nav } from './components/nav';
import { comidas } from './assets/images';

export function Cardapio() {
  const dias = ['SEGUNDA', 'TERCA', 'QUARTA', 'QUINTA', 'SEXTA'];
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [cardapio, setCardapio] = useState([]);
  // const [drawDias, setDrawDias] = useState([]);
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    // if (!sessionStorage.getItem('access_token')) {
    //   navigate('/');
    // }
    let promises = [];

    promises.push(
      api
        .get('/user/loggedin/' + sessionStorage.getItem('access_token'))
        .then((response) => {
          if (response.status == 200) {
            setUsername(response.data.nome);
            setEmail(response.data.email);
          }
        })
        .catch((error) => {})
    );

    for (let i = 0; i < 5; i++) {
      promises.push(
        api
          .get('/cardapio/' + dias[i])
          .then((response) => {
            if (response.status == 200) {
              let dia = dias[i];

              if (dia === 'TERCA') dia = 'TERÇA';

              cardapio.push([
                dias[i],
                <CardapioDia
                  dia={dia}
                  diaMes={pegaData(response.data.data)}
                  refeicao={response.data.refeicao}
                  opcao1={response.data.opcao1}
                  opcao2={response.data.opcao2}
                  opcao3={response.data.opcao3}
                  opcao4={response.data.opcao4}
                  opcao5={response.data.opcao5}
                />,
              ]);
            }
          })
          .catch((error) => {})
      );
    }

    Promise.all(promises).then(() => {
      setIsFetched(true);
    });
  }, []);

  const pegaData = (data) => {
    let dia = data.split('-')[2];
    let mes = data.split('-')[1];
    return dia + '/' + mes;
  };

  const getCardapio = (dia) => {
    for (let i = 0; i < cardapio.length; i++) {
      if (cardapio[i][0] == dia) {
        return cardapio[i][1];
      }
    }
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
      <Nav username={username} email={email} />

      <Header />

      <GridItem
        backgroundImage={comidas}
        backgroundSize="60%"
        area={'main'}
        h="100%"
        overflowY={'auto'}
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
            bg={'red.400'}
            fontSize="2xl"
            fontWeight={500}
            color="white"
            borderRadius="5px"
            borderWidth="2px"
            borderColor={'#5F0000'}
            shadow={'0px 2px 5px rgba(40, 0, 0, 0.5)'}
          >
            Cardápio da Semana
          </Text>
          {getCardapio(dias[0])}
          {getCardapio(dias[1])}
          {getCardapio(dias[2])}
          {getCardapio(dias[3])}
          {getCardapio(dias[4])}
        </VStack>
      </GridItem>
    </Grid>
  );
}
