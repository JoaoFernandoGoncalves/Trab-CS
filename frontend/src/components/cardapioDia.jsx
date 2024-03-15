import {
  Box,
  VStack,
  StackDivider,
  Heading,
  List,
  ListItem,
} from '@chakra-ui/react';

export function CardapioDia(props) {
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
    >
      <VStack divider={<StackDivider borderColor="red.400" />}>
        <Heading fontSize="xl">SEGUNDA</Heading>
        <List fontSize="lg" align="center">
          <ListItem>Arroz</ListItem>
          <ListItem>Feijão</ListItem>
          <ListItem>Carne</ListItem>
          <ListItem>Salada</ListItem>
          <ListItem>Sobremesa</ListItem>
        </List>
      </VStack>
    </Box>
  );
}
