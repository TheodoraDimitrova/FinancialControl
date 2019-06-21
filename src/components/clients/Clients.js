import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect} from 'react-redux-firebase';
import Loader from '../layout/Loader';

class Clients extends Component {
  state = {
    totalOwed: null
  };
  static getDerivedStateFromProps(props, state) {
    //componentWillReceiveProps() is a static method which is invoked after a component is instantiated as well as when it receives new props
    const { clients } = props;

    if (clients) {
      const total = clients.reduce((total, client) => {
        return total + parseFloat(client.balance.toString());
      }, 0);
      return { totalOwed: total };
    } else {
      return null;
    }
  }
  render() {
    const { clients } = this.props;
    const { totalOwed } = this.state;

    if (clients) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <h2>
                {' '}
                <i className="fas fa-users" /> Clients
              </h2>
            </div>
            <div className="col-md-6">
              <h2 className="text-warning">
                Total: {parseFloat(totalOwed).toFixed(2)} лева{' '}
              </h2>
            </div>
          </div>
          <table className="table table-striped table-responsive">
            <thead className="thead-inverse">
              <tr>
                <th>Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Balance</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {clients.map(client => (
                <tr key={client.id}>
                  <td>{client.firstName}</td>
                  <td>{client.lastName}</td>
                  <td>{client.email}</td>
                  <td>{parseFloat(client.balance).toFixed(2)} лева</td>
                  <td>
                    <Link
                      to={`/client/${client.id}`}
                      className="btn btn-secondary btn-sm"
                    >
                      <i className="fas fa-arrow-circle-right" /> Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      return <Loader />;
    }
  }
}
Clients.propTypes = {
  firestore: PropTypes.object.isRequired,
  clients: PropTypes.array
};
export default compose(
  firestoreConnect([{ collection: 'clients' }]),
  connect((state, props) => ({
    clients: state.firestore.ordered.clients //mapStateToProps
  }))
)(Clients);
//.table-striped to add zebra-striping
