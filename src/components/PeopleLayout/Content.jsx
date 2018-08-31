import React from 'react';
import { Layout } from 'antd';

export default class extends React.Component {
  static componentName = 'PeopleLayoutContent'
  
  render() {
    const { hasNav, children, className } = this.props;
    return <Layout.Content className={`people-layout-content${hasNav ? '' : ' nonav'} ${className}`}>{children}</Layout.Content>
  }
}