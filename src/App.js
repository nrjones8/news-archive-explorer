import React, { Component } from 'react';
import DatePicker from 'react-datepicker';

import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

import queryString from 'query-string';
import moment from 'moment';

import NavBar from './NavBar.js';
import { websites, getWebsitePreviewText } from './WebsiteUtils.js';

// Based largely on https://upmostly.com/tutorials/create-simple-web-app-react-airtable/

import 'bootswatch/dist/litera/bootstrap.css';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';

// When screenshots are first available - zero-indexed dates, this is JS
const MIN_DATE = new Date(2019, 0, 0);

// TODO - make sure timezones are handled correctly here, they're probably not
const MAX_DATE = new Date();

class App extends Component {
  constructor(props) {
    super(props);

    this.handleDayChange = this.handleDayChange.bind(this);
    this.handleTimeNavigation = this.handleTimeNavigation.bind(this);

    const queryParams = queryString.parse(props.location.search);
    this.state = this.getInitialState(queryParams);
  }

  getInitialState(queryParams) {
    const defaultLeft = "nytimes.com";
    const defaultRight = "foxnews.com";

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

    const providedYear = parseInt(queryParams.year);
    // Zero-indexed
    const providedMonth = parseInt(queryParams.month) - 1;
    const providedDay = parseInt(queryParams.day);
    const providedHour = parseInt(queryParams.hour);

    // default to two days prior, unless full date was parsed from URL
    var targetDate = moment(new Date()).subtract(2, 'days').toDate();

    if (providedYear && providedMonth && providedDay && providedHour) {
      targetDate = new Date(providedYear, providedMonth, providedDay, providedHour);
    }

    // TODO - definitely display something if we can't parse the date
    // TODO - this is likely redundant with the targetDate stuff above
    const dateToUse = (targetDate && targetDate > MIN_DATE && targetDate <= MAX_DATE)
      ? targetDate
      : new Date(2019, 2, 26, 13);

    return {
      leftWebsite: leftWebsite,
      rightWebsite: rightWebsite,
      screenshotDateTime: dateToUse,
    };
  }

  handleDayChange(newDay) {
    this.setState({screenshotDateTime: newDay});
  }

  handleTimeNavigation(event) {
    var newDateTime = this.state.screenshotDateTime;
    const intervalInHours = event.currentTarget.getAttribute('intervalhours');

    if (intervalInHours) {
      newDateTime = moment(this.state.screenshotDateTime).add(intervalInHours, 'hours').toDate();
    } else {
      console.log("Couldn't find the correct interval! Check your button attrs.");
    }

    this.setState({screenshotDateTime: newDateTime});
  }

  // TODO create the proper URL for someone to share the current view (i.e. based on 2 websites shown and date/time)
  generateDeeplink() {}

  render() {
    return (
      <div className="App-wrapper">
        <NavBar />
        <div className="container mt-5">
          <div className="form-row justify-content-md-center">
              {/* 
                TODO this would work much better with at "timeline"-like picker...like http://visjs.org/timeline_examples.html
                https://github.com/namespace-ee/react-calendar-timeline
                https://github.com/onejgordon/react-life-timeline
                or create your own:
                https://react-component.github.io/slider/
                https://whoisandy.github.io/react-rangeslider/
                https://github.com/davidchin/react-input-range
              */}
              <div className="datetimenav">
                <button type="button" className="btn btn-info btn-sm" intervalhours="-24" onClick={this.handleTimeNavigation}>
                  <FaAngleLeft />
                  24 Hrs
                </button>

                <button type="button" className="btn btn-info btn-sm" intervalhours="-4" onClick={this.handleTimeNavigation}>
                  <FaAngleLeft />
                  4 Hrs
                </button>

                <button type="button" className="btn btn-info btn-sm mr-2" intervalhours="-1" onClick={this.handleTimeNavigation}>
                  <FaAngleLeft />
                  1 Hr
                </button>

                <DatePicker
                  selected={this.state.screenshotDateTime}
                  onChange={this.handleDayChange}
                  showTimeSelect
                  dateFormat="MMM d, yyyy ha"
                  timeFormat="HH"
                  timeIntervals={60}
                  minDate={MIN_DATE}
                  // TODO make sure timezones are being handled correctly here
                  maxDate={MAX_DATE}
                  className="form-control"
                />

                <button type="button" className="btn btn-info btn-sm ml-2" intervalhours="1" onClick={this.handleTimeNavigation}>
                  1 Hr
                  <FaAngleRight />
                </button>

                <button type="button" className="btn btn-info btn-sm" intervalhours="4" onClick={this.handleTimeNavigation}>
                  4 Hrs
                  <FaAngleRight />
                </button>

                <button type="button" className="btn btn-info btn-sm" intervalhours="24" onClick={this.handleTimeNavigation}>
                  24 Hrs
                  <FaAngleRight />
                </button>
              </div>

            {/* TODO - "share current view" button */}

          </div>

          {/* TODO I think <br> is bad so change this? */}
          <br />
          <div className="row">
            <div className="col">
              {/* TODO - somethin somethin fix this horrible whitespace, maybe https://www.w3schools.com/cssref/css3_pr_flex.asp */}
              <div className="card-deck">
                <ScreenshotCard
                  website={this.state.leftWebsite}
                  year={this.state.screenshotDateTime.getUTCFullYear()}
                  month={this.state.screenshotDateTime.getUTCMonth() + 1}
                  day={this.state.screenshotDateTime.getUTCDate()}
                  hour={this.state.screenshotDateTime.getUTCHours()}
                />
                <ScreenshotCard
                  website={this.state.rightWebsite}
                  year={this.state.screenshotDateTime.getUTCFullYear()}
                  month={this.state.screenshotDateTime.getUTCMonth() + 1}
                  day={this.state.screenshotDateTime.getUTCDate()}
                  hour={this.state.screenshotDateTime.getUTCHours()}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function screenshotUrl(website, year, month, day, hour) {
  // https://d1k37mkoj29puy.cloudfront.net/foxnews.com/2019/3/15/23/2/screenshot.{png,jpeg}
  // All screenshots are taken at the second minute of the hour. See:
  // https://github.com/nrjones8/website-screenshotter#how-to-access-screenshots
  return `https://d1k37mkoj29puy.cloudfront.net/${website}/${year}/${month}/${day}/${hour}/2/screenshot.jpeg`;
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
      <div className="card App-card">
        <div className="card-body">
          <h5 className="card-title">
            <WebsitePicker website={this.state.websiteName} onWebsiteChange={this.handleWebsiteChange} />
          </h5>
          <p className="card-text"><small className="text-muted">{getWebsitePreviewText(this.state.websiteName)}</small></p>
          <a target="_blank" href={screenshotUrl(this.state.websiteName, this.props.year, this.props.month, this.props.day, this.props.hour)}>
            <img
              className="card-img-top"
              // Only website is in this component's state, the rest comes from the parent.
              // The year/month/day/hour props are expected to be in UTC.
              src={screenshotUrl(this.state.websiteName, this.props.year, this.props.month, this.props.day, this.props.hour)}
              alt={
                `Screenshot of the homepage of ${this.state.websiteName} taken on ` +
                `${this.props.year}-${this.props.month}-${this.props.day}, ${this.props.hour} hours UTC`
              }
            />
          </a>
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

export default App;
