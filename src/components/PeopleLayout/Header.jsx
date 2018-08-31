import React from 'react';
import { Layout } from 'antd';
import LogoPurpleFull from './assets/logo-purple-full.png';

export default class extends React.Component {
  static componentName = 'PeopleLayoutHeader'

  render() {
    const { hasNav, children, className = '' } = this.props;
    return <Layout.Header className={`people-layout-header${hasNav ? '' : ' nonav'} ${className}`}>
      {!hasNav && <div className="people-layout-logo nonav">
        <img className="people-layout-logo-img" src={LogoPurpleFull} alt="logo" />
      </div>}
      <div className="people-layout-header-content">{children}</div>
    </Layout.Header>
  }
}