import { GridItem, SimpleGrid, Button } from '@chakra-ui/react';
import { BotaoBonito } from './BotaoBonito';

export function Header(props) {
  let cardapio = props.cardapio || 'white';
  let tickets = props.tickets || 'white';
  let minhaConta = props.minhaConta || 'white';
  return (
    <GridItem area={'header'} bg="white" h="65px">
      <SimpleGrid
        display="flex"
        alignItems="center"
        justifyContent="center"
        pl="20%"
        pr="20%"
        w="100%"
        h="65px"
        columns={3}
        spacing={6}
      >
        <BotaoBonito
          title="Cardápio"
          height="80%"
          w="100%"
          fontSize="20px"
          color="red.400"
          backgroundColor={cardapio}
        />
        <BotaoBonito
          title="Tickets"
          height="80%"
          w="100%"
          fontSize="20px"
          color="red.400"
          backgroundColor={tickets}
        />
        <BotaoBonito
          title="Minha Conta"
          height="80%"
          w="100%"
          fontSize="20px"
          color="red.400"
          backgroundColor={minhaConta}
        />
      </SimpleGrid>
    </GridItem>
  );
}
