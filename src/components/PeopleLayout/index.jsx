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

  doNavCollapse = () => {
    this.setState({ collapsed: !this.state.collapsed });
  }

  render() {
    const { collapsed } = this.state;
    const { className = '', children } = this.props;
    let headerProps = null;
    let hasHeader = false;
    let navProps = null;
    let hasNav = false;
    let contentProps = null;
    let hasContent = false;
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child)) {
        switch (child.type.componentName) {
          case 'PeopleLayoutHeader':
            headerProps = child.props;
            hasHeader = true;
            break;
          case 'PeopleLayoutNav':
            navProps = child.props;
            hasNav = true;
            break;
          case 'PeopleLayoutContent':
            contentProps = child.props;
            hasContent = true;
            break;
          default:
        }
      }
    });
    return (
      <Layout className={`people-layout ${className}`}>
        {hasNav && <Nav collapsed={collapsed} {...navProps} doNavCollapse={this.doNavCollapse} />}
        <Layout>
          {hasHeader && <Header hasNav={hasNav} collapsed={collapsed} {...headerProps} />}
          {hasContent && <Content hasNav={hasNav} {...contentProps} />}
        </Layout>
      </Layout>
    );
  }
}
