import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { Route, BrowserRouter as Router } from 'react-router-dom'

import About from './About';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Import Bootstrap CSS and JS
import 'bootswatch/dist/litera/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';


// Good simple overview: https://codeburst.io/getting-started-with-react-router-5c978f70df91
const routing = (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route exact path="/about" component={About} />
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
