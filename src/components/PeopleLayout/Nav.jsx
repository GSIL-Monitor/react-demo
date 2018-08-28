import React from 'react';
import { Layout, Icon } from 'antd';
import LogoPurpleFull from './logo-purple-full.png';

import './style.less';

const { Sider } = Layout;
export default class PeopleLayoutNav extends React.Component {
  render() {
    const { collapsed, children, onCollapse } = this.props;
    return <Sider
      className="pui-layout-sider"
      trigger={null}
      collapsedWidth={0}
      collapsible
      collapsed={collapsed}
    >
      <div className="pui-layout-logo">
        <img className="pui-layout-logo-img" src={LogoPurpleFull} alt="logo" />
      </div>
      {children}
      <div className="pui-layout-sider-tigger" onClick={onCollapse}><Icon type={collapsed ? 'right' : 'left'} /></div>
    </Sider>
  }
}