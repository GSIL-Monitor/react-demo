import React, { Component } from 'react';
import logo from '../../assets/logo.svg';
import Wrap from '@comps/PeopleWrap';
import './style.less';

class Home extends Component {
  render() {
    return <Wrap className="Home">
      <header className="Home-header">
        <img src={logo} className="Home-logo" alt="logo" />
        <h1 className="Home-title">Welcome to React</h1>
      </header>
      <p className="Home-intro">
        To get started, edit <code>src/componets/Home.js</code> and save to reload.
        </p>
    </Wrap>
  }
}

export default Home;
