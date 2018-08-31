import React from 'react';
import { Dropdown, Menu } from 'antd';

import './style.less';
import logo from './test.png';

const MenuItem = Menu.Item;
const Divider = Menu.Divider;

export default class extends React.Component {
  render() {
    return <Dropdown
      placement="bottomRight"
      overlay={
        <Menu mode="horizontal">
          <MenuItem key="profile">
            <a href="#" target='__blank'>个人信息</a>
          </MenuItem>
          <Divider key="divider-0" />
          <MenuItem key="cn">中文</MenuItem>
          <MenuItem key="en">EN</MenuItem>
          <Divider key="divider-1" />
          <MenuItem key="sign-out">退出</MenuItem>
        </Menu>
      }
      trigger="click"
    >
      <span className="pui-header-avatar">
        <img className="pui-header-avatar-img" src={logo} alt="avatar" />
        <span className="pui-header-avatar-txt">我是头像</span>
      </span>
    </Dropdown>
  }
}