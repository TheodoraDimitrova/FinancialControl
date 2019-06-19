import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import Loader from '../layout/Loader';
import classnames from 'classnames';

class Details extends Component {
  render() {
    const { client } = this.props;

    if (client) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/" className="btn btn-link">
                <i className="fas fa-arrow-left" />
                Back To Dashboard
              </Link>
            </div>
            <div className="col-md-6">
              <div className="btn-group float-right">
                <Link to={`/client/edit/${client.id}`} className="btn btn-dark">
                  Edit
                </Link>
                <button className="btn btn-danger">Delete</button>
              </div>
            </div>
          </div>
          <hr />
          <div className="card">
            <div className="card-header">
              <h3>
                {client.firstName} {client.lastName}
              </h3>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-8 col-sm-6">
                  <h4>
                    Client Id:{' '}
                    <span className="text-secondary">{client.id}</span>
                  </h4>
                </div>
                <div className="col-md-4 col-sm-6">
                  <h3 className="pull-right">
                    {' '}
                    <span
                      className={classnames({
                        'text-danger': client.balance > 0,
                        'text-success': client.balance === 0
                      })}
                    >
                      Balance: {parseFloat(client.balance).toFixed(2)}
                    </span>
                  </h3>
                </div>
              </div>

              <hr />
              <ul className="list-group">
                <li className="list-group-item">
                  <h5>
                    Contact Email:{' '}
                    <span className="text-info">{client.email}</span>
                  </h5>
                </li>
                <li className="list-group-item">
                  <h5>
                    Contact Phone:{' '}
                    <span className="text-info">{client.phone}</span>
                  </h5>
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
    } else {
      return <Loader />;
    }
  }
}

Details.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(props => [
    { collection: 'clients', storeAs: 'client', doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    client: ordered.client && ordered.client[0]
  }))
)(Details);

//https://react-redux-firebase.com/docs/firestore.html