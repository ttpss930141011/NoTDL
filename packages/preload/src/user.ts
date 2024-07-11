import {ipcRenderer} from 'electron';
import type {GetCurrentUser} from '#shared/auth';

const userLoginReq = async () => await ipcRenderer.invoke('userLoginReq');

const getCurrentUserReq: GetCurrentUser = async () => await ipcRenderer.invoke('getCurrentUserReq');

const userLogoutReq = async () => await ipcRenderer.invoke('userLogoutReq');

const user = {
  userLoginReq,
  getCurrentUserReq,
  userLogoutReq,
};

export default user;
