import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  setAllowRegistration,
  setDisableBalanceOnAdd,
  setDisableBalanceOnEdit
} from '../../actions/settingsActions';

class Settings extends Component {
  allowRegistration = () => {
    const { setAllowRegistration } = this.props;
    setAllowRegistration();
  };
  disableBalanceOnAddChange = () => {
    const { setDisableBalanceOnAdd } = this.props;
    setDisableBalanceOnAdd();
  };
  disableBalanceOnEditChange = () => {
    const { setDisableBalanceOnEdit } = this.props;
    setDisableBalanceOnEdit();
  };

  render() {
    const {
      allowRegistration,
      disableBalanceOnAdd,
      disableBalanceOnEdit
    } = this.props.settings;
   

    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <Link to="/" className="btn btn-link">
              <i className="fas fa-arrow-left" />
              Back To Dashboard
            </Link>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <div className="card-body">
              <from>
                <div className="form-group">
                  <label htmlFor="">Allow Registration </label>{' '}
                  <input
                    type="checkbox"
                    name="allowRegistration"
                    checked={!!allowRegistration}
                    onChange={this.allowRegistration}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="">Disable Balance on Add</label>{' '}
                  <input
                    type="checkbox"
                    name="disableBalanceOnAdd"
                    checked={!!disableBalanceOnAdd}
                    onChange={this.disableBalanceOnAddChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="">Disable Balance on Edit</label>{' '}
                  <input
                    type="checkbox"
                    name="disableBalanceOnEdit"
                    checked={!!disableBalanceOnEdit}
                    onChange={this.disableBalanceOnEditChange}
                  />
                </div>
              </from>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  setAllowRegistration: PropTypes.func.isRequired,
  setDisableBalanceOnAdd: PropTypes.func.isRequired,
  setDisableBalanceOnEdit: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired
};

export default connect(
  (state, props) => ({
    settings: state.settings
  }),
  { setAllowRegistration, setDisableBalanceOnAdd, setDisableBalanceOnEdit }
)(Settings);
