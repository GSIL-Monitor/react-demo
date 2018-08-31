import React from 'react';
import { Icon } from 'antd';
import Search from './Search';
import Menu from './Menu';
import Custom from './Custom';
import Avatar from './Avatar';
import './style.less';

export default class extends React.Component {
  render() {
    return <div className="pui-header">
      <Search />
      <Menu />
      <Custom />
      <Avatar />
    </div>
  }
}