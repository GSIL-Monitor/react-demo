import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
// import Wrap from './layouts/Wrap';
import PeopleLayout from './components/PeopleLayout';
import registerServiceWorker from './registerServiceWorker';

const { Header, Nav, Content } = PeopleLayout;
ReactDOM.render(<Router>
  <PeopleLayout>
    <Header>Header</Header>
    <Nav>Nav</Nav>
    <Content>Content</Content>
  </PeopleLayout>
</Router>, document.getElementById('root'));
registerServiceWorker();
