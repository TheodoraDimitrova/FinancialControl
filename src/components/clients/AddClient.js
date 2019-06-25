import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

class AddClient extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: ''
  };
  onSubmit = e => {
    e.preventDefault();
    const newClient = this.state;
    const { firestore } = this.props;
    if (newClient.balance === '') {
      newClient.balance = 0;
    }
    firestore
      .add({ collection: 'clients' }, newClient)
      .then(() => this.props.history.push('/'));
    this.setState({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      balance: ''
    });
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { disableBalanceOnAdd } = this.props.settings;
    return (
      <div>
        <div className="row">
          <div className="col">
            <Link to="/" className="btn btn-link">
              <i className="fas fa-arrow-left" />
              Back To Dashboard
            </Link>
            <div className="card">
              <div className="card-header">Add Client</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="firstName"
                      onChange={this.onChange}
                      value={this.state.firstName}
                      minLength="3"
                      maxLength="20"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="lastName"
                      onChange={this.onChange}
                      value={this.state.lastName}
                      minLength="5"
                      maxLength="10"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Format :+359 (XXX) XX-XX-XX</label>
                    <input
                      type="tel"
                      pattern="[\+]\d{3}\s[\(]\d{3}[\)]\s\d{2}[\-]\d{2}[\-]\d{2}"
                      className="form-control"
                      name="phone"
                      onChange={this.onChange}
                      value={this.state.phone}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      onChange={this.onChange}
                      value={this.state.email}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="balance">Balance</label>
                    <input
                      type="number"
                      className="form-control"
                      name="balance"
                      onChange={this.onChange}
                      value={this.state.balance}
                      disabled={disableBalanceOnAdd}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary btn-block">
                    Save Client
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
AddClient.propTypes = {
  firestore: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired
};
export default compose(
  firestoreConnect(), //base
  connect((state, props) => ({
    //state
    settings: state.settings
  }))
)(AddClient);
