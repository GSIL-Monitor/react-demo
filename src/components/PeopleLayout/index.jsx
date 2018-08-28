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
    const { className = '', children } = this.props;
    let headerChildren = null;
    let hasHeader = false;
    let navChildren = null;
    let hasNav = false;
    let contentChildren = null;
    let hasContent = false;
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child)) {
        switch (child.type.componentName) {
          case 'PeopleLayoutHeader':
            headerChildren = child.props.children;
            hasHeader = true;
            break;
          case 'PeopleLayoutNav':
            navChildren = child.props.children;
            hasNav = true;
            break;
          case 'PeopleLayoutContent':
            contentChildren = child.props.children;
            hasContent = true;
            break;
          default:
        }
      }
    });
    return (
      <Layout className={`pui-layout ${className}`}>
        {hasNav && <Nav collapsed={collapsed} onCollapse={this.onCollapse}>{navChildren}</Nav>}
        <Layout>
          {hasHeader && <Header hasNav={hasNav} collapsed={collapsed}>{headerChildren}</Header>}
          {hasContent && <Content hasNav={hasNav}>{contentChildren}</Content>}
        </Layout>
      </Layout>
    );
  }
}
