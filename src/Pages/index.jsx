import React from 'react';
import { Menu, Icon } from 'antd';
import _ from 'lodash';
import PeopleLayout from '@comps/PeopleLayout';
import {
  Route,
  Link,
  withRouter,
  Redirect,
  Switch
} from 'react-router-dom';
import navs from '../router';

const { Header, Nav, Content } = PeopleLayout;
const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;

export default withRouter((props) => <PeopleLayout>
  <Header>Header</Header>
  <Nav>
    <Menu
      defaultOpenKeys={['antd']}
      selectedKeys={[props.location.pathname]}
      mode="inline">
      {navs.map(route => <SubMenu
        key={route.path}
        title={<span><Icon type={route.icon} /><span>{route.key}</span></span>}>
        {(route.children || []).map(({ path, key }) => (
          <MenuItem key={path}><Link to={path}>{key}</Link></MenuItem>
        ))}
      </SubMenu>)}
    </Menu>
  </Nav>
  <Content>
    {_.flattenDeep(navs.map(nav => nav.children.map(child => <Route {...child} />)))}
  </Content>
</PeopleLayout>);
