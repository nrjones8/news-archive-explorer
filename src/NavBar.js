import React, { Component } from 'react';

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand" href={process.env.PUBLIC_URL + "/#/"}>News Homepage Archive</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#explorerNavBar" aria-controls="explorerNavBar" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="explorerNavBar">
            <ul className="navbar-nav">
                <li className="nav-item active">
                    {/* There is probably a better way to do this */}
                    <a className="nav-link" href={process.env.PUBLIC_URL + "/#/"}>Home</a>
                </li>
            </ul>
            <ul className="navbar-nav">
                <li className="nav-item active">
                    {/* There is probably a better way to do this */}
                    <a className="nav-link" href={process.env.PUBLIC_URL + "/#/about"}>About</a>
                </li>
            </ul>
        </div>
      </nav>
    )
  }
}

export default NavBar;
