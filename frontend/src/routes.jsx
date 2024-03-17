import { Login } from './Login';
import { Cadastro } from './Cadastro';
import { Cardapio } from './Cardapio';
import { Tickets } from './Tickets';

const routes = [
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/cadastro',
    element: <Cadastro />,
  },
  {
    path: '/cardapio',
    element: <Cardapio />,
  },
  {
    path: '/tickets',
    element: <Tickets />,
  },
];

export default routes;
