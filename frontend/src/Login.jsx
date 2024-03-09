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
import { InputLogin } from './components/inputLogin';
import { Link } from 'react-router-dom';
import { uem } from './assets/images';
import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';

export function Login() {
  return (
    <SimpleGrid columns={2} height="100vh">
      <Box bg="red.700" height="100%">
        <Image src={uem} alt="UEM" objectFit="cover" height="100vh" />
      </Box>
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
            <InputLogin></InputLogin>

            <InputLogin title="Senha" password={true}></InputLogin>

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
                to="/Cadastro"
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
