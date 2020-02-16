import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import ReactGA from 'react-ga';

import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { CopyToClipboard } from 'react-copy-to-clipboard';

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

// Event like changing date, changing websites shown, etc
const EVENT_CAT_VIEW_CHANGE = 'Screenshot View Change';
const EVENT_TRACKING_MOMENT_FORMAT = 'YYYY-MM-DD, HH';

const SHARE_LINK_BTN_TEXT = 'Share link to current view';

class App extends Component {
  constructor(props) {
    super(props);

    this.handleDayChange = this.handleDayChange.bind(this);
    this.handleTimeNavigation = this.handleTimeNavigation.bind(this);
    this.updateLeftWebsite = this.updateLeftWebsite.bind(this);
    this.updateRightWebsite = this.updateRightWebsite.bind(this);

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
    const providedMonth = parseInt(queryParams.month);
    const providedDay = parseInt(queryParams.day);
    const providedHour = parseInt(queryParams.hour);

    // default to two days prior, unless full date was parsed from URL
    let targetDate = moment(new Date()).subtract(2, 'days').toDate();

    if (providedYear && providedMonth && providedDay && providedHour) {
      const inUtc = moment.utc(
        `${providedYear}-${providedMonth}-${providedDay}-${providedHour}`,
        'YYYY-MM-DD-kk',
      );
      targetDate = inUtc.local().toDate();
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

      copyLinkText: SHARE_LINK_BTN_TEXT,
    };
  }

  handleDayChange(newDay) {
    this.setState({screenshotDateTime: newDay});

    ReactGA.event({
      category: EVENT_CAT_VIEW_CHANGE,
      action: 'day change',
      label: moment(newDay).format(EVENT_TRACKING_MOMENT_FORMAT),
    });
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

    ReactGA.event({
      category: EVENT_CAT_VIEW_CHANGE,
      action: 'time change by interval',
      label: moment(newDateTime).format(EVENT_TRACKING_MOMENT_FORMAT),
    });
  }

  updateLeftWebsite(newSite) {
    this.setState({leftWebsite: newSite});
  }

  updateRightWebsite(newSite) {
    this.setState({rightWebsite: newSite});
  }

  generateDeeplink() {
    const year = this.state.screenshotDateTime.getUTCFullYear();
    const month = this.state.screenshotDateTime.getUTCMonth() + 1;
    const day = this.state.screenshotDateTime.getUTCDate();
    const hour = this.state.screenshotDateTime.getUTCHours();

    const { leftWebsite, rightWebsite } = this.state;

    // this is leaking all sorts of implementation details about ports and such, but should do the trick
    let base = "localhost:3000";
    if (process.env.PUBLIC_URL) {
      base = `https://${window.location.host}/${process.env.PUBLIC_URL}`;
    }

    return `${base}/#/?year=${year}&month=${month}&day=${day}&hour=${hour}&siteOne=${leftWebsite}&siteTwo=${rightWebsite}`;
  }

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
          </div>

          <div className="form-row justify-content-md-center" id="share-link-wrapper">
            <CopyToClipboard
              text={this.generateDeeplink()}
              onCopy={() => {
                this.setState({copyLinkText: 'Copied!'});
                // Show confirmation for one second before setting "copy link" text back
                setTimeout(() => this.setState({copyLinkText: SHARE_LINK_BTN_TEXT}), 1000);
              }}
            >
              <button type="button" className="btn btn-info btn-sm">
                { this.state.copyLinkText }
              </button>
            </CopyToClipboard>
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
                  propogateWebsiteUpdate={this.updateLeftWebsite}
                />
                <ScreenshotCard
                  website={this.state.rightWebsite}
                  year={this.state.screenshotDateTime.getUTCFullYear()}
                  month={this.state.screenshotDateTime.getUTCMonth() + 1}
                  day={this.state.screenshotDateTime.getUTCDate()}
                  hour={this.state.screenshotDateTime.getUTCHours()}
                  propogateWebsiteUpdate={this.updateRightWebsite}
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
    this.handleImageLoaded = this.handleImageLoaded.bind(this);

    this.state = {
      websiteName: props.website,
      imageLoaded: false,
    }
  }

  handleWebsiteChange(websiteName) {
    this.setState({
      websiteName: websiteName,
      imageLoaded: false,
    });
    ReactGA.event({
      category: EVENT_CAT_VIEW_CHANGE,
      action: 'website change',
      label: websiteName,
    });
    this.props.propogateWebsiteUpdate(websiteName);
  }

  handleImageLoaded() {
    this.setState({imageLoaded: true});
  }

  componentDidUpdate(prevProps) {
    // When the parent component updates the date / time of the screenshot to display, that
    // ends up changing the props of this component (the year/month/day/hour); as a result, we'll
    // be loading a new image, and want to loading spinner to be displayed while that image is
    // still in the process of being loaded.
    //
    // https://reactjs.org/docs/react-component.html#componentdidupdate
    // "Use this as an opportunity to operate on the DOM when the component has been updated.
    // This is also a good place to do network requests as long as you compare the current props
    // to previous props (e.g. a network request may not be necessary if the props have not
    // changed)"
    const doesntMatch = prevProps.website !== this.props.website ||
      prevProps.year !== this.props.year ||
      prevProps.month !== this.props.month ||
      prevProps.day !== this.props.day ||
      prevProps.hour !== this.props.hour;

    if (doesntMatch) {
      this.setState({imageLoaded: false});
    }
  }

  render() {
    const { imageLoaded } = this.state;

    return (
      <div className="card App-card">
        <div className="card-body">
          <h5 className="card-title">
            <WebsitePicker website={this.state.websiteName} onWebsiteChange={this.handleWebsiteChange} />
          </h5>
          <p className="card-text"><small className="text-muted">{getWebsitePreviewText(this.state.websiteName)}</small></p>

          {/* Show a loading spinner while image isn't loaded yet
            https://getbootstrap.com/docs/4.4/components/spinners/#flex
          */}
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status" style={{ display: imageLoaded ? 'none' : 'block' }}></div>
          </div>

          <a target="_blank" href={screenshotUrl(this.state.websiteName, this.props.year, this.props.month, this.props.day, this.props.hour)}>
            {/* Hide the image until it's loaded */}
            <img
              className="card-img-top"
              // Only website is in this component's state, the rest comes from the parent.
              // The year/month/day/hour props are expected to be in UTC.
              src={screenshotUrl(this.state.websiteName, this.props.year, this.props.month, this.props.day, this.props.hour)}
              alt={
                `Screenshot of the homepage of ${this.state.websiteName} taken on ` +
                `${this.props.year}-${this.props.month}-${this.props.day}, ${this.props.hour} hours UTC`
              }
              style={{ display: imageLoaded ? 'block' : 'none' }}
              onLoad={this.handleImageLoaded}
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
