import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import Wrap from './layouts/Wrap';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Router><Wrap/></Router>, document.getElementById('root'));
registerServiceWorker();
