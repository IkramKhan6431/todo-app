import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import {Router, browserHistory} from 'react-router';
import routes from './routes';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Router history={browserHistory} routes={routes}/>,
    document.getElementById('root')
);
registerServiceWorker();
