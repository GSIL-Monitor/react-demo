import React from 'react';
import { Layout, Icon } from 'antd';
import LogoPurpleFull from './assets/logo-purple-full.png';
import LogoPurple from './assets/logo-purple.png';

const { Sider } = Layout;
export default class extends React.Component {
  static componentName = 'PeopleLayoutNav'

  render() {
    const { collapsed, children, onCollapse } = this.props;
    return <Sider
      className="pui-layout-sider"
      collapsedWidth={60}
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
    >
      <div className="pui-layout-logo">
        <img className="pui-layout-logo-img" src={collapsed ? LogoPurple : LogoPurpleFull} alt="logo" />
      </div>
      {children}
      {/* <div className="pui-layout-sider-tigger" onClick={onCollapse}><Icon type={collapsed ? 'right' : 'left'} /></div> */}
    </Sider>
  }
}