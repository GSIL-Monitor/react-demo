import Home from './components/Home';
import Test from './components/Test';
import FormValidate from './components/FormValidate';

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
    path: '/formvalidate',
    name: 'FormValidate',
    component: FormValidate,
  }
];

export default routes;
