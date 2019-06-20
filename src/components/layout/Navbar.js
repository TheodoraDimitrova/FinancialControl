import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase'; //auth

class Navbar extends Component {
  state = {
    isAuthenticated: false
  };
  static getDerivedStateFromProps(props, state) {
    // componentWillReceiveProps
    const { auth } = props;
    if (auth.uid) {
      return { isAuthenticated: true };
    } else {
      return { isAuthenticated: false };
    }
  }

  onLogoutClick = e => {
    e.preventDefault();
    console.log(this.props)
    const { firebase } = this.props;
    firebase.logout();
  };
  render() {
    //.container to center it on a page
    //navbar-expand-lg never collapse
    const { isAuthenticated } = this.state;
    const { auth } = this.props;
    return (
      <nav className="navbar  navbar-expand-lg navbar-light bg-primary mb-4">
        <div className="container">
          <Link to="/" className="navbar-brand">
            Financial Control
          </Link>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarMain"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarMain">
          <ul className="navbar-nav mr-auto">
            {isAuthenticated ? (
              <li className="nav-item active">
                <Link to="/" className="nav-link">
                  Dashboard
                </Link>
              </li>
            ) : null}
            {isAuthenticated ? (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a href="#!" className="nav-link">
                    {auth.email}
                  </a>
                </li>
              </ul>
            ) : null}
            {isAuthenticated ? (
              <li className="nav-item">
                <a href="#!" className="nav-link" onClick={this.onLogoutClick}>
                  Logout{' '}
                </a>
              </li>
            ) : null}
            {/* <li className="nav-item active">
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </li>
            <li className="nav-item active">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li> */}
          </ul>
        </div>
      </nav>
    );
  }
}
Navbar.propTypes = {
  firebase: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};
export default compose(
  firebaseConnect(),
  connect((state, props) => ({
    auth: state.firebase.auth //come from redux state
  }))
)(Navbar);
