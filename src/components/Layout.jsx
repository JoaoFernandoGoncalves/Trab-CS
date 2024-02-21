import { Grid, GridItem } from '@chakra-ui/react';

export function Layout() {
  return (
    <Grid
      templateAreas={{
        base: `"header"
               "content"`,
        lg: `"nav header"
             "nav content"`,
      }}
      gridTemplateRows="65px 1fr"
      gridTemplateColumns={{ base: '1fr', lg: '220px 1fr' }}
      h="100vh"
      fontWeight="bold"
    >
      <GridItem gridArea="header" pl="2" bg="purple.400">
        Navbar secundária
      </GridItem>
      <GridItem
        gridArea="nav"
        pl="2"
        bg="orange.400"
        display={{ base: 'none', lg: 'block' }}
      >
        Navbar
      </GridItem>
      <GridItem gridArea="content" pl="2" bg="teal.400">
        Conteudo
      </GridItem>
    </Grid>
  );
}
