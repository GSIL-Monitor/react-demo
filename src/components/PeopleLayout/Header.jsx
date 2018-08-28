import React from 'react';
import { Layout } from 'antd';
import LogoPurpleFull from './assets/logo-purple-full.png';

const { Header } = Layout;
export default class extends React.Component {
  static componentName = 'PeopleLayoutHeader'

  render() {
    const { hasNav, children } = this.props;
    return <Header className={`pui-layout-header${hasNav ? '' : ' nonav'}`}>
      {!hasNav && <div className="pui-layout-logo nonav">
        <img className="pui-layout-logo-img" src={LogoPurpleFull} alt="logo" />
      </div>}
      {children}
    </Header>
  }
}