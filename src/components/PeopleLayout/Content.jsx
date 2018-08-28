import React from 'react';
import { Layout } from 'antd';

const { Content } = Layout;
export default class extends React.Component {
  static componentName = 'PeopleLayoutContent'

  render() {
    const { hasNav, children } = this.props;
    return <Content className={`pui-layout-content${hasNav ? '' : ' nonav'}`}>{children}</Content>
  }
}