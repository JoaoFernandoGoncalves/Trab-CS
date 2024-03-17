import { Login } from './Login';
import { Cadastro } from './Cadastro';
import { Cardapio } from './Cardapio';
import { Tickets } from './Tickets';
import { Conta } from './Conta';

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
  {
    path: '/conta',
    element: <Conta />,
  },
];

export default routes;
