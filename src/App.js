import React, { Component } from 'react';
import DatePicker from 'react-datepicker';

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

const ANIMATION_START_TEXT = "Animate";
const ANIMATION_PAUSE_TEXT = "Pause";

const INTERVAL_1_HOUR = '1 Hour';
const INTERVAL_4_HOURS = '4 Hours';
const INTERVAL_24_HOURS = '24 Hours';


class App extends Component {
  constructor(props) {
    super(props);

    this.handleDayChange = this.handleDayChange.bind(this);
    this.handleTimeIntervalChange = this.handleTimeIntervalChange.bind(this);
    this.handleAnimationToggle = this.handleAnimationToggle.bind(this);

    const queryParams = queryString.parse(props.location.search);
    this.state = this.getInitialState(queryParams);
  }

  getInitialState(queryParams) {
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

    const providedYear = parseInt(queryParams.year);
    // Zero-indexed
    const providedMonth = parseInt(queryParams.month) - 1;
    const providedDay = parseInt(queryParams.day);
    const providedHour = parseInt(queryParams.hour);
    // TODO this is a pretty janky way to handle dates...
    const targetDate = new Date(
      providedYear ? providedYear : 2019,
      providedMonth ? providedMonth : 2,
      providedDay ? providedDay : 26,
      // Default to 9am local time if not provided
      providedHour ? providedHour : 9
    );

    // TODO - definitely display something if we can't parse the date
    // TODO - this is likely redundant with the targetDate stuff above
    const dateToUse = (targetDate && targetDate > MIN_DATE && targetDate <= MAX_DATE)
      ? targetDate
      : new Date(2019, 2, 26, 13);

    return {
      leftWebsite: leftWebsite,
      rightWebsite: rightWebsite,
      yearMonthDay: dateToUse,

      // Unused with removal of "animate" button
      isAnimating: false,
      animationButtonText: ANIMATION_START_TEXT,
      // do we need to clearInterval..?
      // https://reactjs.org/docs/state-and-lifecycle.html#adding-lifecycle-methods-to-a-class
      timer: null,
      // 4 hours seems like reasonable default
      timeInterval: INTERVAL_4_HOURS,
    };
  }

  handleDayChange(newDay) {
    this.setState({yearMonthDay: newDay});
  }

  handleTimeIntervalChange(newInterval) {
    this.setState({timeInterval: newInterval});
  }

  // Unused with removal of "animate" button
  handleAnimationToggle(event) {
    if (this.state.isAnimating) {
      this.setState({
        isAnimating: false,
        animationButtonText: ANIMATION_START_TEXT,
      });
      clearInterval(this.state.timer);
    } else {
      const interval = setInterval(
        () => this.incrementTime(),
        1500
      );
      this.setState({
        isAnimating: true,
        animationButtonText: ANIMATION_PAUSE_TEXT,
        timer: interval,
      });
    }
  }

  incrementTime() {
    // TODO (UX) make this configurable (i.e. allow for adding 1 day or 1 hour or 6 hours etc.)
    const updated = moment(this.state.yearMonthDay).add(1, 'days').toDate();
    if (updated > MIN_DATE && updated < MAX_DATE) {
      this.setState({yearMonthDay: updated});
    } else {
      // TODO tell the user?
      console.log(`Date outside of current supported range of ${MIN_DATE} to ${MAX_DATE}`);
      // TODO the point of this call is to pause animation, but it's a little janky and misleading
      this.handleAnimationToggle();
    }
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
              <DatePicker
                selected={this.state.yearMonthDay}
                onChange={this.handleDayChange}
                showTimeSelect
                dateFormat="MMMM d, yyyy ha"
                timeFormat="HH"
                timeIntervals={60}
                minDate={MIN_DATE}
                // TODO make sure timezones are being handled correctly here
                maxDate={MAX_DATE}
                className="form-control"
              />

              {/* used to have the "animate" button here, leaving this as placeholder in case want to add it back */}

            {/* TODO - "share current view" button */}

          </div>

          <div className="form-row justify-content-md-center py-2">
            {/* TODO - need Font Awesome or somethin https://www.npmjs.com/package/react-fontawesome */}
            <button type="button" className="btn btn-info">Subtract</button>

            <div className="px-2">
              <form>
                <select className="form-control" value={this.props.timeInterval} onChange={this.handleTimeIntervalChange}>
                  <option value={INTERVAL_1_HOUR} key={INTERVAL_1_HOUR}>{INTERVAL_1_HOUR}</option>
                  <option value={INTERVAL_4_HOURS} key={INTERVAL_4_HOURS}>{INTERVAL_4_HOURS}</option>
                  <option value={INTERVAL_24_HOURS} key={INTERVAL_24_HOURS}>{INTERVAL_24_HOURS}</option>
                </select>
              </form>
            </div>

            <button type="button" className="btn btn-info">Add</button>
          </div>

          {/* TODO I think <br> is bad so change this? */}
          <br />
          <div className="row">
            <div className="col">
              {/* TODO - somethin somethin fix this horrible whitespace, maybe https://www.w3schools.com/cssref/css3_pr_flex.asp */}
              <div className="card-deck">
                <ScreenshotCard
                  website={this.state.leftWebsite}
                  year={this.state.yearMonthDay.getUTCFullYear()}
                  month={this.state.yearMonthDay.getUTCMonth() + 1}
                  day={this.state.yearMonthDay.getUTCDate()}
                  hour={this.state.yearMonthDay.getUTCHours()}
                />
                <ScreenshotCard
                  website={this.state.rightWebsite}
                  year={this.state.yearMonthDay.getUTCFullYear()}
                  month={this.state.yearMonthDay.getUTCMonth() + 1}
                  day={this.state.yearMonthDay.getUTCDate()}
                  hour={this.state.yearMonthDay.getUTCHours()}
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
        </div>
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
