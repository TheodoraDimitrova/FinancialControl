import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase'; //auth

import { notifyUser } from '../../actions/notifyActions';
import Alert from '../layout/Alert';

class Register extends Component {
  state = {
    email: '',
    password: ''
  };
  onSubmit = e => {
    e.preventDefault();
    const { firebase, notifyUser } = this.props;
    const { email, password } = this.state;
    
    firebase
      .createUser({
        email,
        password
      })
      .catch(err => notifyUser('User already exists', 'error'));
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  componentWillMount(){
    const {allowRegistration} = this.props.settings
    if(!allowRegistration){
       this.props.history.push('/')
    }
  }
  render() {
    const { message, messageType } = this.props.notify;
    return (
      <div className="row">
        <div className="col-6 mx-auto">
          <div className="card">
            <div className="card-body">
              {message ? (
                <Alert message={message} messageType={messageType} />
              ) : null}
              <h1 className="text-center pb-4 pt-3">
                <span className="text-primary">
                  <i className="fas fa-user-plus">Register</i>
                </span>{' '}
              </h1>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    minLength="6"
                    value={this.state.password}
                    onChange={this.onChange}
                    required
                  />
                </div>
                <input
                  type="submit"
                  className="btn btn-primary btn-block"
                  value="Register"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Register.propTypes = {
  firebase: PropTypes.object.isRequired,
  notify: PropTypes.object.isRequired,
  notifyUser: PropTypes.func.isRequired
};
export default compose(
  firebaseConnect(),
  connect(
    (state, props) => ({
      notify: state.notify,
      settings: state.settings
    }),
    { notifyUser }
  )
)(Register);
