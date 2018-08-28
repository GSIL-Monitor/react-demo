import React from 'react';
import { Layout } from 'antd';

import './style.less';

const { Content } = Layout;
export default class PeopleLayoutContent extends React.Component {
  render() {
    return <Content>{this.props.children}</Content>
  }
}