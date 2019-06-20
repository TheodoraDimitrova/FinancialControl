import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase'; //auth

class Login extends Component {
  state = {
    email: '',
    password: ''
  };
  onSubmit = e => {
    e.preventDefault();
    const { firebase } = this.props;
    const { email, password } = this.state;
    console.log(email,password)
    firebase
      .login({
        email,
        password
      })
      .catch(err => alert('Invalid login credentials'));
      
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <div className="row">
        <div className="col-6 mx-auto">
          <div className="card">
            <div className="card-body">
              <h1 className="text-center pb-4 pt-3">
                <span className="text-primary">
                  <i className="fas fa-lock"> Login</i>
                </span>
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
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                </div>
                <input
                  type="submit"
                  className="btn btn-primary btn-block"
                  value="Login"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Login.propTypes = {
  firebase: PropTypes.object.isRequired
};
export default firebaseConnect()(Login);
