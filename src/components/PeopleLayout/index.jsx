import React from 'react';
import { Layout } from 'antd';
import Header from './Header';
import Nav from './Nav';
import Content from './Content';

import './style.less';

export default class extends React.Component {
  static Header = Header
  static Nav = Nav
  static Content = Content

  state = {
    collapsed: false,
  }

  onCollapse = () => {
    this.setState({ collapsed: !this.state.collapsed });
  }

  render() {
    const { collapsed } = this.state;
    let headerChildren;
    let navChildren;
    let contentChildren;
    React.Children.forEach(this.props.children, (child) => {
      if (React.isValidElement(child)) {
        switch (child.type.name) {
          case 'PeopleLayoutHeader':
            headerChildren = child.props.children;
            break;
          case 'PeopleLayoutNav':
            navChildren = child.props.children;
            break;
          case 'PeopleLayoutContent':
            contentChildren = child.props.children;
            break;
          default:
        }
      }
    });
    return (
      <Layout className="pui-layout">
        <Nav collapsed={collapsed} onCollapse={this.onCollapse}>{navChildren}</Nav>
        <Layout>
          <Header collapsed={collapsed}>{headerChildren}</Header>
          <Content>{contentChildren}</Content>
        </Layout>
      </Layout>
    );
  }
}
