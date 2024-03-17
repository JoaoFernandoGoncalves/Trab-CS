import {
  GridItem,
  VStack,
  Text,
  Box,
  Image,
  Button,
  StackDivider,
  Link,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { userIcon, mapa } from '../assets/images';
import { Logout } from '../assets/logoutIcon';

export function Nav(props) {
  let botaoSair = props.username ? (
    <Button
      rightIcon={<Logout w={5} h={5} />}
      color={'red.400'}
      variant="ghost"
      onClick={() => {
        sessionStorage.removeItem('access_token');
        window.location.href = '/';
      }}
    ></Button>
  ) : null;

  return (
    <GridItem bg="white" w="100%" area={'nav'}>
      <VStack
        gap={5}
        divider={
          <StackDivider
            borderWidth="2px"
            borderColor="gray.300"
            borderRadius="5px"
            w="90%"
            alignSelf="center"
          />
        }
      >
        <Text
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="38px"
          as="i"
          fontSize="4xl"
          fontFamily="Baskervville"
          fontWeight={500}
          color="#5F0000"
          pt={7}
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
            <Image src={userIcon} h="25%" w="25%" objectFit="cover" />
            <Text fontSize="md" color="grey" w="100%" align="center">
              {props.username ? props.username : 'Usuário não logado'} <br />
              {props.email ? (
                props.email
              ) : (
                <Link href="/" color="teal.500">
                  Faça login <ExternalLinkIcon mx="2px" />
                </Link>
              )}{' '}
              <br />
              {props.tickets ? props.tickets + ' Tickets' : null}
            </Text>
            {botaoSair}
          </VStack>
        </Box>

        <Box w="95%" h="20vh" color="gray.600">
          <VStack spacing={4}>
            <Text fontSize="md" w="100%" align="center">
              <Text fontWeight="bold">Atendimento: </Text>
              Segunda a Sexta <br />
              Almoço: das 11:00 às 13:00 <br />
              Jantar: das 18:00 às 19:30 <br />
            </Text>
            <Text fontSize="md" w="100%" align="center">
              <Text fontWeight="bold">Contato: </Text>
              sec-ru@uem.br <br />
              compras-ru@uem.br
            </Text>
          </VStack>
        </Box>

        <VStack w="95%">
          <Box
            w="100%"
            h="20vh"
            borderWidth="5px"
            borderColor="gray.500"
            borderRadius="5px"
          >
            <Link
              href="https://www.google.com.br/maps/place/Restaurante+Universit%C3%A1rio+-+UEM/@-23.406851,-51.9470125,15z/data=!4m5!3m4!1s0x94ecd6d298bf5319:0xec0c89cb12c03d91!8m2!3d-23.406851!4d-51.9382578"
              isExternal
            >
              <Image
                src={mapa}
                h="100%"
                w="100%"
                objectFit="cover"
                borderRadius="5px"
              />
            </Link>
          </Box>

          <Text
            fontWeight="bold"
            fontSize="lg"
            color="gray.600"
            w="100%"
            align="center"
          >
            Localização
          </Text>
        </VStack>
      </VStack>
    </GridItem>
  );
}
