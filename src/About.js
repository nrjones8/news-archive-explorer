import React, { Component } from 'react';
import moment from 'moment';

import NavBar from './NavBar.js';
import { MIN_DATE, MAX_DATE } from './App.js';

import 'bootswatch/dist/litera/bootstrap.css';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';

class About extends Component {
  render() {
    return (
        <div>
            <NavBar />
            <div className="container mt-5">
                <h2>About this project</h2>
                <p>
                    This project has been retired as of {moment(MAX_DATE).format('MMMM D, YYYY')}, but the screenshot archive remains available to browse.
                    Screenshots were taken once an hour across a number of news websites starting January 1, 2019; screenshots
                    from {moment(MIN_DATE).format('MMMM D, YYYY')} through {moment(MAX_DATE).format('MMMM D, YYYY')} are
                    available here. Earlier screenshots have been moved to cold storage — please reach out using the contact
                    info below if you are interested in accessing them.
                    You can find more information about the source of the screenshots, and how to use them for your own project, <a href="https://github.com/nrjones8/website-screenshotter#news-homepage-archive" target="_blank" rel="noopener noreferrer">here</a>.
                </p>
                <p>
                    This web app itself is built using React, and the code for it is available <a href="https://github.com/nrjones8/news-archive-explorer">on Github</a>. If
                    you have feedback or spot a bug, please file <a href="https://github.com/nrjones8/news-archive-explorer/issues">a Github issue</a>, or if
                    you aren't familiar with Github, send an email to newsscreenshotarchive@gmail.com.
                </p>
                <p>
                    This project is unaffiliated with <a href="http://www.pastpages.org/" target="_blank" rel="noopener noreferrer">PastPages</a>, a similar effort that took screenshots from 2012 to 2018 from a
                    much wider range of news websites.
                </p>
                <p>Thanks for visiting!</p>
            </div>
        </div>
    )
  }
}
export default About;
