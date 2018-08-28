import Antd from './Pages/Antd';
import Demo from './Pages/Demo';
import Test from './Pages/Test';
import Test1 from './Pages/Test/Test1';
import Test2 from './Pages/Test/Test2';

const routes = [{
  key: 'Antds',
  icon: 'ant-design',
  children: [{
    path: '/antd/',
    key: 'Antd',
    component: Antd,
  }]
}, {
  key: 'Demos',
  icon: 'star',
  children: [{
    path: '/demo/',
    key: 'Demo',
    component: Demo,
  }]
}, {
  key: 'Test',
  icon: 'smile',
  children: [{
    path: '/test/test1/',
    key: 'Test1',
    component: Test1,
  }, {
    path: '/test/test2/',
    key: 'Test2',
    component: Test2,
  }]
}];

export default routes;
