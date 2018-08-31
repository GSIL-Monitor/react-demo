import React from 'react';
import { Icon } from 'antd';
import _ from 'lodash';
import {
  Route,
  Link,
  withRouter,
  Redirect,
  Switch
} from 'react-router-dom';
import PeopleLayout from '@comps/PeopleLayout';
import Menu from '@comps/PeopleMenu';
import PeopleHeader from '@comps/PeopleHeader';
import navs from '../router';

const { Header, Nav, Content } = PeopleLayout;
const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;

export default withRouter((props) => <PeopleLayout>
  <Header>
    <PeopleHeader />
  </Header>
  <Nav>
    <Menu
      defaultOpenKeys={['antd']}
      selectedKeys={[props.location.pathname]}
      style={{ border: 'none' }}
      mode="inline">
      {navs.map(route => <Menu.SubMenu
        key={route.path}
        title={<span><Icon type={route.icon} /><span>{route.key}</span></span>}>
        {(route.children || []).map(({ path, key }) => (
          <Menu.Item key={path}>{key}</Menu.Item>
        ))}
      </Menu.SubMenu>)}
    </Menu>
  </Nav>
  <Content>
    {_.flattenDeep(navs.map(nav => nav.children.map(child => <Route {...child} />)))}
  </Content>
</PeopleLayout>);
