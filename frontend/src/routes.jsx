import { Login } from './Login';
import { Cadastro } from './Cadastro';
import { Cardapio } from './Cardapio';

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
];

export default routes;
