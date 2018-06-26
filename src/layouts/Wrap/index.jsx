import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import {
  Route,
  Link,
  withRouter,
  Redirect,
} from 'react-router-dom'
import routes from '../../router';
import logo from '../../assets/logo.svg';
import './style.less';

const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;

class Wrap extends React.Component {
  state = {
    collapsed: false,
  };
  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  }
  render() {
    return (
      <Layout className='wrap'>
        <Header className="wrap-header">
          <img src={logo} className="wrap-header-logo" alt="logo" />
          React Demo
        </Header>
        <Layout>
          <Sider
            className="wrap-sider"
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}>
            <Menu
              defaultOpenKeys={['antd']}
              selectedKeys={[this.props.location.pathname]}
              mode="inline">
              <SubMenu
                key="antd"
                title={<span><Icon type="star" /><span>Antd Demo</span></span>}>
                {routes.map(({ path, name }) => (
                  <MenuItem key={path}><Link to={path}>{name}</Link></MenuItem>
                ))}
              </SubMenu>
            </Menu>
          </Sider>
          <Content className="wrap-content">
            <Route exact path='/' render={()=><Redirect to={routes[0].path}/>} />
            {routes.map(({ path, component }, i) => (
              <Route key={path} path={path} component={component} />
            ))}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(Wrap);
