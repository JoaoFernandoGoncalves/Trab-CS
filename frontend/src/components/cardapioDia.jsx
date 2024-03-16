import {
  Box,
  VStack,
  StackDivider,
  Heading,
  List,
  ListItem,
} from '@chakra-ui/react';

export function CardapioDia(props) {
  let diaSemana = props.dia || 'DIA';
  let diaMes = props.diaMes || '';
  let refeicao = props.refeicao || 'ALMOÇO/JANTAR';
  let opcao1 = props.opcao1 || '';
  let opcao2 = props.opcao2 || '';
  let opcao3 = props.opcao3 || '';
  let opcao4 = props.opcao4 || '';
  let opcao5 = props.opcao5 || '';

  return (
    <Box
      h="100%"
      w="50%"
      padding="5px"
      bg="red.100"
      shadow={'0px 2px 5px rgba(40, 0, 0, 0.5)'}
      borderWidth="5px"
      borderColor="red.200"
      borderRadius="25px"
      onLoad={props.onLoad}
    >
      <VStack divider={<StackDivider borderColor="red.400" />}>
        <Heading fontSize="xl" textTransform="uppercase">
          {diaSemana} - {diaMes} - {refeicao}
        </Heading>
        <List fontSize="lg" align="center" textTransform="uppercase">
          <ListItem>{opcao1}</ListItem>
          <ListItem>{opcao2}</ListItem>
          <ListItem>{opcao3}</ListItem>
          <ListItem>{opcao4}</ListItem>
          <ListItem>{opcao5}</ListItem>
        </List>
      </VStack>
    </Box>
  );
}
