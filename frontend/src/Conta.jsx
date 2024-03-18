import {
  Text,
  VStack,
  Grid,
  GridItem,
  Box,
  Image,
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { Form, useNavigate } from 'react-router-dom';
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
  const [userId, setUserId] = useState('');
  const [curUser, setCurUser] = useState('');
  const [newUser, setNewUser] = useState('');
  const [curEmail, setCurEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [curPassword, setCurPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPassword2, setNewPassword2] = useState('');
  const [validatePassword, setValidatePassword] = useState('');
  const [tickets, setTickets] = useState(0);
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
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
            setCurUser(response.data.nome);
            setCurPassword(response.data.senha);
            setCurEmail(response.data.email);
            setTickets(response.data.qtd_tickets);
          }
        })
        .catch((error) => {})
    );

    Promise.all(promises).then(() => {
      setIsFetched(true);
    });
  }, []);

  const handleClick = () => {
    setCarregando(true);

    if (validateFields()) {
      api
        .put(`/usuario/${userId}`, {
          nome: newUser,
          email: newEmail,
          senha: newPassword,
          cpf: '',
          qtd_tickets: 0,
        })
        .then((response) => {
          if (response.status === 200) {
            window.location.reload();
          }
        })
        .catch((error) => {
          setErro(error.response.data.detail);
        })
        .finally(() => {
          setCarregando(false);
        });
    } else {
      setCarregando(false);
    }

    setTimeout(() => {
      setErro('');
      setInvalid(false);
    }, 5000);
  };

  const validateFields = () => {
    if (
      newUser === '' &&
      newEmail === '' &&
      newPassword === '' &&
      newPassword2 === ''
    ) {
      setErro('Preencha pelo menos um dos campos');
      return false;
    }

    if (newPassword !== newPassword2) {
      setErro('As senhas não coincidem');
      return false;
    }

    if (validatePassword !== '' && newPassword === '') {
      setErro('Preencha a nova senha');
      return false;
    }

    if (validatePassword !== '' && curPassword !== validatePassword) {
      setErro('Senha atual incorreta');
      return false;
    }

    return true;
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
      <Nav username={curUser} email={curEmail} tickets={tickets} />

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
                  {curUser}
                  <br />
                  {curEmail}
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
              spacing={4}
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

              <Text>Preencha os campos das informações que deseja alterar</Text>

              <FormControl w="40%">
                <FormLabel>Nome de Usuário:</FormLabel>
                <Input
                  focusBorderColor="blue.200"
                  variant="outline"
                  type="user"
                  placeholder="novo usuário"
                  _placeholder={{
                    color: 'gray.400',
                  }}
                  borderWidth={2}
                  onInput={(e) => setNewUser(e.target.value)}
                />
              </FormControl>

              <FormControl w="40%">
                <FormLabel>Endereço de Email:</FormLabel>
                <Input
                  focusBorderColor="blue.200"
                  variant="outline"
                  type="email"
                  placeholder="novo@email.com"
                  _placeholder={{
                    color: 'gray.400',
                  }}
                  borderWidth={2}
                  onInput={(e) => setNewEmail(e.target.value)}
                />
              </FormControl>

              <FormControl w="40%">
                <FormLabel>Senha Atual:</FormLabel>
                <Input
                  focusBorderColor="blue.200"
                  variant="outline"
                  type="password"
                  placeholder="senha atual"
                  _placeholder={{
                    color: 'gray.400',
                  }}
                  borderWidth={2}
                  onInput={(e) => setValidatePassword(e.target.value)}
                />
              </FormControl>

              <FormControl w="40%">
                <FormLabel>Nova Senha:</FormLabel>
                <Input
                  focusBorderColor="blue.200"
                  variant="outline"
                  type="password"
                  placeholder="nova senha"
                  _placeholder={{
                    color: 'gray.400',
                  }}
                  borderWidth={2}
                  onInput={(e) => setNewPassword(e.target.value)}
                />
              </FormControl>

              <FormControl w="40%">
                <Input
                  focusBorderColor="blue.200"
                  variant="outline"
                  type="password"
                  placeholder="digite a senha novamente"
                  _placeholder={{
                    color: 'gray.400',
                  }}
                  borderWidth={2}
                  onInput={(e) => setNewPassword2(e.target.value)}
                />
              </FormControl>

              <Text
                fontSize="md"
                bg="gray.700"
                borderRadius={5}
                width="50%"
                color={'red.500'}
                textAlign="center"
                fontWeight={400}
              >
                {erro}
              </Text>

              <Button
                m={4}
                size="lg"
                colorScheme="green"
                borderWidth="2px"
                borderColor="green.700"
                isLoading={carregando}
                onClick={handleClick}
              >
                Confirmar Alterações
              </Button>
            </VStack>
          </Box>
        </VStack>
      </GridItem>
    </Grid>
  );
}
