import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
// import Wrap from './layouts/Wrap';
import Pages from './Pages';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Router><Pages /></Router >, document.getElementById('root'));
registerServiceWorker();
