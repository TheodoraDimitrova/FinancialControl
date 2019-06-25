import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import Loader from '../layout/Loader';

// ! use defaultValue for inputs to full it and use ref to take values

class EditClient extends Component {
  constructor(props) {
    super(props);
    //create refs
    this.firstNameInput = React.createRef();
    this.lastNameInput = React.createRef();
    this.phoneInput = React.createRef();
    this.emailInput = React.createRef();
    this.balanceInput = React.createRef();
  }
  onSubmit = e => {
    e.preventDefault();
    const { client, firestore } = this.props;
    const updatedClient = {
      firstName: this.firstNameInput.current.value,
      lastName: this.lastNameInput.current.value,
      email: this.emailInput.current.value,
      phone: this.phoneInput.current.value,
      balance:
        this.balanceInput.current.value === ''
          ? 0
          : this.balanceInput.current.value
    };
    firestore
      .update({ collection: 'clients', doc: client.id }, updatedClient)
      .then(this.props.history.push('/'));
  };

  render() {
    const { client } = this.props;
    const { disableBalanceOnEdit } = this.props.settings;
    if (client) {
      return (
        <div>
          <div>
            <div className="row">
              <div className="col">
                <Link to="/" className="btn btn-link">
                  <i className="fas fa-arrow-left" />
                  Back To Dashboard
                </Link>
                <div className="card">
                  <div className="card-header">Edit Client</div>
                  <div className="card-body">
                    <form onSubmit={this.onSubmit}>
                      <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="firstName"
                          ref={this.firstNameInput}
                          defaultValue={client.firstName}
                          minLength="3"
                          maxLength="10"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="lastName"
                          ref={this.lastNameInput}
                          defaultValue={client.lastName}
                          minLength="5"
                          maxLength="10"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="phone">Phone</label>
                        <input
                          type="text"
                          className="form-control"
                          name="phone"
                          ref={this.phoneInput}
                          defaultValue={client.phone}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          ref={this.emailInput}
                          defaultValue={client.email}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="balance">Balance</label>
                        <input
                          type="number"
                          className="form-control"
                          name="balance"
                          ref={this.balanceInput}
                          defaultValue={client.balance}
                          disabled={disableBalanceOnEdit}
                          min='0'
                          pattern="^[0-9]"
                        />
                      </div>

                      <button
                        type="submit"
                        className="btn btn-primary btn-block"
                      >
                        Save Client
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <Loader />;
    }
  }
}
EditClient.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(props => [
    { collection: 'clients', storeAs: 'client', doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered }, settings }, props) => ({
    //take setting from state
    client: ordered.client && ordered.client[0],
    settings: settings
  }))
)(EditClient);
