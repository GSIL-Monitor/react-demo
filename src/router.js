import Home from './components/Home';
import Test from './components/Test';
import AgGrid from './components/AgGrid';

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
  }, {
    path: '/test',
    name: 'Test',
    component: Test,
  }, {
    path: '/aggrid',
    name: 'AgGrid',
    component: AgGrid,
  }
];

export default routes;
