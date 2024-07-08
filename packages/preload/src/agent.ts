import {ipcRenderer} from 'electron';
import type {GetIconByTitle} from '#shared/agent';

const getIconByTitleReq: GetIconByTitle = async (...args) =>
  ipcRenderer.invoke('getIconByTitleReq', ...args);

const agents = {
  getIconByTitleReq,
};

export default agents;
