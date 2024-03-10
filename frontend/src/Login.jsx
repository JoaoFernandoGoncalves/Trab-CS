import {
  Button,
  Stack,
  Box,
  SimpleGrid,
  Image,
  Text,
  Center,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { InputLogin } from './components/inputLogin';
import { uem } from './assets/images';
import { Link, useNavigate } from 'react-router-dom';
import api from './api';
import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';

export function Login() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');
  const [invalid, setInvalid] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleClick = () => {
    let getStr = `/usuario_nome/${user}`;
    if (validateEmail(user)) {
      getStr = `/usuario_email/${user}`;
    }

    api
      .get(getStr)
      .then((response) => {
        if (response.status === 200) {
          if (response.data.senha === password) navigate('/home');
          else {
            setErro('Credênciais inválidas');
            setInvalid(true);
          }
        }
      })
      .catch((error) => {
        setErro('Credênciais inválidas');
        setInvalid(true);
      });

    setTimeout(() => {
      setErro('');
      setInvalid(false);
    }, 5000);
  };

  return (
    <SimpleGrid columns={2} height="100vh">
      <Box
        bg="linear-gradient(180deg, rgba(222,41,52,1) 50%, rgba(255,148,148,1) 100%)"
        height="100%"
      >
        <Image
          src={uem}
          alt="UEM"
          objectFit="cover"
          height="100vh"
          paddingRight="1%"
        />
      </Box>

      <Box
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <VStack spacing={0} w="10vh">
          <Text fontSize="5xl" mb={-1}>
            Entrar
          </Text>
          <Text
            fontSize="18px"
            width="100vh"
            mb={10}
            textAlign="center"
            fontWeight={300}
          >
            Para continuar, faça login no TicketRU
          </Text>

          <Stack spacing={10} width="300px" direction="column" align="center">
            <InputLogin
              isInvalid={invalid}
              value={user}
              onInput={(e) => setUser(e.target.value)}
            ></InputLogin>

            <InputLogin
              title="Senha"
              password={true}
              isInvalid={invalid}
              value={password}
              onInput={(e) => setPassword(e.target.value)}
            ></InputLogin>

            <Text
              fontSize="14px"
              width="100vh"
              m={-5}
              color={'red.400'}
              textAlign="center"
              fontWeight={800}
            >
              {erro}
            </Text>

            <Button
              bg="linear-gradient(90deg, rgba(222,41,52,1) 15%, rgba(255,148,148,1) 100%)"
              width="100%"
              size="lg"
              py="30px"
              borderRadius={30}
              textColor="White"
              fontWeight="400"
              _hover={{
                bg: 'gray.700',
              }}
              onClick={handleClick}
            >
              Entrar
            </Button>

            <Text
              fontSize="14px"
              width="100vh"
              m={-5}
              color="grey"
              textAlign="center"
              fontWeight={500}
            >
              Não tem uma conta?{' '}
              <Link
                to="/cadastro"
                style={{ fontWeight: 'bold', textDecoration: 'underline' }}
              >
                Cadastre-se.
              </Link>
            </Text>
          </Stack>
        </VStack>
      </Box>
    </SimpleGrid>
  );
}
