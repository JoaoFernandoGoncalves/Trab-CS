import { Layout } from './components/Layout';
import { Login } from './Login';

const routes = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/app',
    element: <Layout />,
  },
];

export default routes;
