import { Layout } from './components/Layout';
import { Login } from './Login';
import { Cadastro } from './Cadastro';

const routes = [
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/Cadastro',
    element: <Cadastro />,
  },
  {
    path: '/app',
    element: <Layout />,
  },
];

export default routes;
