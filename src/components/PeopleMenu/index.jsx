import React from 'react';
import { Menu } from 'antd';

export default class extends React.Component {
  static Item = Menu.Item
  static SubMenu = Menu.SubMenu
  static ItemGroup = Menu.ItemGroup

  render() {
    return <Menu {...this.props} />
  }
}