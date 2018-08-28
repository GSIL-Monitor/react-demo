import React from 'react';
import { Layout } from 'antd';
import LogoPurple from './logo-purple.png';

import './style.less';

const { Header } = Layout;
export default class PeopleLayoutHeader extends React.Component {
  render() {
    const { collapsed, children } = this.props;
    return <Header className="pui-layout-header">
      {collapsed && <div className="pui-layout-logo collapsed">
        <img className="pui-layout-logo-img" src={LogoPurple} alt="logo" />
      </div>}
      {children}
    </Header>
  }
}