import React, { Component } from 'react';
import DatePicker from 'react-datepicker';

import queryString from 'query-string';

// Based largely on https://upmostly.com/tutorials/create-simple-web-app-react-airtable/

import "react-datepicker/dist/react-datepicker.css";

const websites = [
  "nytimes.com",
  "washingtonpost.com",
  "cnn.com",
  "wsj.com",
  "foxnews.com"
];

// When screenshots are first available - zero-indexed dates, this is JS
const MIN_DATE = new Date(2019, 0, 0);

// TODO - make sure timezones are handled correctly here, they're probably not
const MAX_DATE = new Date();

class App extends Component {
  constructor(props) {
    super(props);

    this.handleDayChange = this.handleDayChange.bind(this);
    this.handleHourChange = this.handleHourChange.bind(this);

    const queryParams = queryString.parse(props.location.search);
    this.state = this.getInitialState(queryParams);
  }

  getInitialState(queryParams) {
    console.log(queryParams);
    const originalDate = new Date(2019, 3, 18);
    const defaultLeft = "nytimes.com";
    const defaultRight = "cnn.com"

    const leftFromParams = queryParams.siteOne;
    const rightFromParams = queryParams.siteTwo;

    // TODO - display something if the provided website isn't one of the supported ones?
    // otherwise just looks like a bug to a user if their URL includes website X but website
    // Y shows up
    const leftWebsite = (leftFromParams && websites.includes(leftFromParams))
      ? leftFromParams
      : defaultLeft;

    const rightWebsite = (rightFromParams && websites.includes(rightFromParams))
      ? rightFromParams
      : defaultRight;

    return {
      leftWebsite: leftWebsite,
      rightWebsite: rightWebsite,
      yearMonthDay: originalDate,

      hour: 12
    };
  }

  handleDayChange(newDay) {
    this.setState({yearMonthDay: newDay});
  }

  handleHourChange(event) {
    this.setState({hour: event.target.value});
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col">
            <div className="card-deck">
              <ScreenshotCard 
                website={this.state.leftWebsite} 
                year={this.state.yearMonthDay.getFullYear()}
                month={this.state.yearMonthDay.getMonth() + 1}
                day={this.state.yearMonthDay.getDate()}
                hour={this.state.hour} 
              />
              <ScreenshotCard
                website={this.state.rightWebsite}
                year={this.state.yearMonthDay.getFullYear()} 
                month={this.state.yearMonthDay.getMonth() + 1}
                day={this.state.yearMonthDay.getDate()}
                hour={this.state.hour} 
              />
            </div>
          </div>
        </div>

        <div className="row justify-content-md-center">
          <div className="col col-md-auto">
            <h5>Day</h5>
            {/* 
              TODO this would work much better with at "timeline"-like picker...like http://visjs.org/timeline_examples.html
              https://github.com/namespace-ee/react-calendar-timeline
              https://github.com/onejgordon/react-life-timeline
              or create your own:
              https://react-component.github.io/slider/
              https://whoisandy.github.io/react-rangeslider/
              https://github.com/davidchin/react-input-range
            */}
            <DatePicker
              selected={this.state.yearMonthDay}
              onChange={this.handleDayChange}
              minDate={MIN_DATE}
              // TODO make sure timezones are being handled correctly here
              maxDate={MAX_DATE}
            />
          
            <div id="hourPicker">
              <input
                type="range" 
                min="0" max="23" 
                value={this.state.hour} 
                onChange={this.handleHourChange}
                step="1"
              />
              {this.state.hour}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

function screenshotUrl(website, year, month, day, hour) {
  // https://d1k37mkoj29puy.cloudfront.net/foxnews.com/2019/3/15/23/2/screenshot.png
  return `https://d1k37mkoj29puy.cloudfront.net/${website}/${year}/${month}/${day}/${hour}/2/screenshot.png`;
}

class ScreenshotCard extends Component {
  // keep it dumb, let the parent handle the changing logic ("lift the state up")
  constructor(props) {
    super(props);

    // maybe someday I will understand this
    this.handleWebsiteChange = this.handleWebsiteChange.bind(this);

    this.state = {
      websiteName: props.website,
    }
  }

  handleWebsiteChange(websiteName) {
    this.setState({websiteName: websiteName});
  }

  render() {
    return (
      <div className="card">
        <img 
          className="card-img-top" 
          // Only website is in this component's state, the rest comes from the parent
          src={screenshotUrl(this.state.websiteName, this.props.year, this.props.month, this.props.day, this.props.hour)} alt="Card cap" 
        />
        <div className="card-body">
          <h5 className="card-title">
            <WebsitePicker website={this.state.websiteName} onWebsiteChange={this.handleWebsiteChange} />
          </h5>
          {/* TODO - put some useful text here? E.g. wsj.com has a bunch of undismissed modals. Caveat it? */}
          <p className="card-text"><small className="text-muted">something here?</small></p>
        </div>
      </div>
    )
  }
}

class WebsitePicker extends Component {
  // Thank you https://reactjs.org/docs/forms.html#the-select-tag

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onWebsiteChange(event.target.value);
  }

  render() {
    return (
      <form>
        <label>Website</label>
        <select className="form-control" value={this.props.website} onChange={this.handleChange}>
          {
            websites.map((websiteName) => {
              return <option value={websiteName} key={websiteName}>{websiteName}</option>
            })
          }
        </select>
      </form>
    );
  }
}
