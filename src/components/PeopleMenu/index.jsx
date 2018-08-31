import React from 'react';
import { Menu } from 'antd';
import './style.less';

export default class extends React.Component {
  static Item = Menu.Item
  static SubMenu = Menu.SubMenu
  static ItemGroup = Menu.ItemGroup

  render() {
    return <div className=""><Menu {...this.props} /></div>
  }
}