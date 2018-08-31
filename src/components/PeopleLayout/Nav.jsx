import React from 'react';
import { Layout, Icon } from 'antd';
import LogoPurpleFull from './assets/logo-purple-full.png';
import LogoPurple from './assets/logo-purple.png';

const { Sider } = Layout;
export default class extends React.Component {
  static componentName = 'PeopleLayoutNav'

  render() {
    const { collapsed, children, doNavCollapse, onCollapse, className = '' } = this.props;
    return <Sider
      className={`people-layout-sider ${className}`}
      collapsedWidth={60}
      collapsible
      collapsed={collapsed}
      trigger={null}
    >
      <div className="people-layout-logo">
        <img className="people-layout-logo-img" src={collapsed ? LogoPurple : LogoPurpleFull} alt="logo" />
      </div>
      {children}
      <div className="people-layout-sider-trigger" onClick={() => {
        if (typeof onCollapse === 'function') {
          onCollapse.call(this, collapsed);
        }
        doNavCollapse();
      }}><Icon type={collapsed ? 'right' : 'left'} /></div>
    </Sider>
  }
}