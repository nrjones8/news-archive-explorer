import React, { Component } from 'react';

import NavBar from './NavBar.js';

import 'bootswatch/dist/litera/bootstrap.css';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';

class About extends Component {
  render() {
    return (
        <div>
            <NavBar />
            <h1>Why would anyone be interested in this</h1>
        </div>
    )
  }
}
export default About;
