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
import { Link } from 'react-router-dom';
import api from './api';
import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';

export function Cadastro() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [erro, setErro] = useState('');
  const [invalidFields, setInvalidFields] = useState({});

  const handleClick = () => {
    setErro('');
    setInvalidFields((prevState) => ({
      ...prevState,
      user: false,
      password: false,
      cpf: false,
      email: false,
    }));

    if (password !== confirmPassword) {
      setErro('As senhas não coincidem');
      setInvalidFields((prevState) => ({
        ...prevState,
        password: true,
      }));
      return;
    }

    api
      .post('/usuario', {
        nome: user,
        email: email,
        senha: password,
        cpf: cpf,
        qtd_tickets: 0,
      })
      .then((response) => {
        if (response.status === 201) {
          alert('Usuário cadastrado com sucesso');
        }
      })
      .catch((error) => {
        if (error.response) {
          const msg = error.response.data.detail;
          setErro(msg);

          if (msg.startsWith('Usuário')) {
            setInvalidFields((prevState) => ({
              ...prevState,
              user: true,
            }));
          }
          if (msg.startsWith('CPF')) {
            setInvalidFields((prevState) => ({
              ...prevState,
              cpf: true,
            }));
          }
          if (msg.startsWith('Email')) {
            setInvalidFields((prevState) => ({
              ...prevState,
              email: true,
            }));
          }
        }
      });
  };

  return (
    <SimpleGrid columns={2} height="100vh">
      <Box
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <VStack spacing={0}>
          <Text fontSize="5xl" mb={-1}>
            Cadastro
          </Text>
          <Text
            fontSize="18px"
            width="100vh"
            mb={10}
            textAlign="center"
            fontWeight={300}
          >
            Crie sua conta. É rápido e fácil.
          </Text>

          <Stack spacing={10} width="300px" direction="column" align="center">
            <InputLogin
              title="Usuário"
              isInvalid={invalidFields.user}
              value={user}
              onInput={(e) => setUser(e.target.value)}
            ></InputLogin>

            <InputLogin
              title="Senha"
              password={true}
              value={password}
              onInput={(e) => setPassword(e.target.value)}
            ></InputLogin>

            <InputLogin
              title="Confirmar Senha"
              isInvalid={invalidFields.password}
              notShow={true}
              value={confirmPassword}
              onInput={(e) => setConfirmPassword(e.target.value)}
            ></InputLogin>

            <InputLogin
              title="CPF"
              isInvalid={invalidFields.cpf}
              value={cpf}
              onInput={(e) => setCpf(e.target.value)}
            ></InputLogin>

            <InputLogin
              title="E-mail"
              isInvalid={invalidFields.email}
              value={email}
              onInput={(e) => setEmail(e.target.value)}
            ></InputLogin>

            <Text
              fontSize="14px"
              width="100vh"
              m={-5}
              color={'rgba(222,41,52,1)'}
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
              Cadastrar
            </Button>

            <Text
              fontSize="14px"
              width="100vh"
              m={-5}
              color="grey"
              textAlign="center"
              fontWeight={500}
            >
              Já tem uma conta?{' '}
              <Link
                to="/"
                style={{ fontWeight: 'bold', textDecoration: 'underline' }}
              >
                Faça login.
              </Link>
            </Text>
          </Stack>
        </VStack>
      </Box>
      <Box bg="red.700" height="100%">
        <Image src={uem} alt="UEM" objectFit="cover" height="100vh" />
      </Box>
    </SimpleGrid>
  );
}
