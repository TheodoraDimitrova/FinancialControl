import {
  ALLOW_REGISTRATION,
  DISABLE_BALANCE_ON_ADD,
  DISABLE_BALANCE_ON_EDIT
} from './types';

export const setAllowRegistration = () => {
  //get settings from local-storage
  const settings = JSON.parse(localStorage.getItem('settings'));
  //toggle
  settings.allowRegistration = !settings.allowRegistration;
  //sent back to the local-storage
  localStorage.setItem('settings', JSON.stringify(settings));

  return {
    type: ALLOW_REGISTRATION,
    payload: settings.allowRegistration
  };
};
export const setDisableBalanceOnEdit = () => {
  //get settings from local-storage
  const settings = JSON.parse(localStorage.getItem('settings'));
  //toggle
  settings.disableBalanceOnEdit = !settings.disableBalanceOnEdit;
  //sent back to the local-storage
  localStorage.setItem('settings', JSON.stringify(settings));

  return {
    type: DISABLE_BALANCE_ON_EDIT,
    payload: settings.disableBalanceOnEdit
  };
};
export const setDisableBalanceOnAdd = () => {
  const settings = JSON.parse(localStorage.getItem('settings'));

  //toggle
  settings.disableBalanceOnAdd = !settings.disableBalanceOnAdd;
  //sent back to the local-storage
  localStorage.setItem('settings', JSON.stringify(settings));
 
  return {
    type: DISABLE_BALANCE_ON_ADD,
    payload: settings.disableBalanceOnAdd
  };
};
