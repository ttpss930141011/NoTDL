import {app, BrowserWindow, ipcMain} from 'electron';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {datasource} from '/@/database';
import type {
  CreateTask,
  GetAllTasks,
  GetAllTaskTitles,
  GetSelectedDateTasks,
  GetAllUnplannedTasks,
  CreateSelectedDateTask,
  UpdateTaskPriorities,
  PreUpdateTaskPriorities,
  UpdateTask,
} from '#shared/task';
import type {GetIconByTitle} from '#shared/agent';
import {
  createSelectedDateTaskService,
  createUnplannedTaskService,
  deleteTaskService,
  getAllTasksService,
  getAllTaskTitlesService,
  getSelectedDateTasksService,
  getAllUnplannedTasksService,
  updateTaskPrioritiesService,
  updateTaskService,
} from '/@/services/task';
import {getIconByTitleService, preUpdateTaskPrioritiesService} from '/@/services/agent';

/**
 * Create a new DataSource.
 */
async function createDataSource() {
  try {
    await datasource.initialize();
    console.log('DataSource initialized.');
  } catch (error) {
    console.error(error);
  }
}

/**
 * Create a new BrowserWindow.
 */
async function createWindow() {
  console.log(join(app.getAppPath(), 'packages/main/assets/icon.png'));
  const browserWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false, // Use the 'ready-to-show' event to show the instantiated BrowserWindow.
    center: true,
    autoHideMenuBar: true,
    title: 'NoTDL',
    // frame: false,
    vibrancy: 'under-window',
    visualEffectState: 'active',
    // titleBarStyle: 'hidden',
    trafficLightPosition: {x: 15, y: 10},
    icon: join(app.getAppPath(), 'packages/main/assets/icon.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false, // Sandbox disabled because the demo of preload script depend on the Node.js api
      webviewTag: false, // The webview tag is not recommended. Consider alternatives like an iframe or Electron's BrowserView. @see https://www.electronjs.org/docs/latest/api/webview-tag#warning
      preload: join(app.getAppPath(), 'packages/preload/dist/index.mjs'),
    },
  });

  /**
   * If the 'show' property of the BrowserWindow's constructor is omitted from the initialization options,
   * it then defaults to 'true'. This can cause flickering as the window loads the html content,
   * and it also has show problematic behaviour with the closing of the window.
   * Use `show: false` and listen to the  `ready-to-show` event to show the window.
   *
   * @see https://github.com/electron/electron/issues/25012 for the afford mentioned issue.
   */
  browserWindow.on('ready-to-show', () => {
    browserWindow?.show();

    if (import.meta.env.DEV) {
      browserWindow?.webContents.openDevTools();
    }
  });

  /**
   * Load the main page of the main window.
   */
  if (import.meta.env.DEV && import.meta.env.VITE_DEV_SERVER_URL !== undefined) {
    /**
     * Load from the Vite dev server for development.
     */
    await browserWindow.loadURL(import.meta.env.VITE_DEV_SERVER_URL);
  } else {
    /**
     * Load from the local file system for production and test.
     *
     * Use BrowserWindow.loadFile() instead of BrowserWindow.loadURL() for WhatWG URL API limitations
     * when path contains special characters like `#`.
     * Let electron handle the path quirks.
     * @see https://github.com/nodejs/node/issues/12682
     * @see https://github.com/electron/electron/issues/6869
     */
    await browserWindow.loadFile(
      fileURLToPath(new URL('./../../renderer/dist/index.html', import.meta.url)),
    );
  }

  return browserWindow;
}

/**
 * Register the event listener for ipcMain.
 */
export function registerTaskIpcMain() {
  ipcMain.handle('getAllTasksReq', (_, ...args: Parameters<GetAllTasks>) =>
    getAllTasksService(...args),
  );
  ipcMain.handle('getAllUnplannedTasksReq', (_, ...args: Parameters<GetAllUnplannedTasks>) =>
    getAllUnplannedTasksService(...args),
  );
  ipcMain.handle('getSelectedDateTasksReq', (_, ...args: Parameters<GetSelectedDateTasks>) =>
    getSelectedDateTasksService(...args),
  );
  ipcMain.handle('getAllTaskTitlesReq', (_, ...args: Parameters<GetAllTaskTitles>) =>
    getAllTaskTitlesService(...args),
  );
  ipcMain.handle(
    'createSelectedDateTaskService',
    (_, ...args: Parameters<CreateSelectedDateTask>) => createSelectedDateTaskService(...args),
  );
  ipcMain.handle('createUnplannedTaskReq', (_, ...args: Parameters<CreateTask>) =>
    createUnplannedTaskService(...args),
  );
  ipcMain.handle('preUpdateTaskPrioritiesReq', (_, ...args: Parameters<PreUpdateTaskPriorities>) =>
    preUpdateTaskPrioritiesService(...args),
  );
  ipcMain.handle('updateTaskPrioritiesReq', (_, ...args: Parameters<UpdateTaskPriorities>) =>
    updateTaskPrioritiesService(...args),
  );
  ipcMain.handle('deleteTaskReq', (_, id: string) => deleteTaskService(id));

  ipcMain.handle('updateTaskReq', (_, ...args: Parameters<UpdateTask>) =>
    updateTaskService(...args),
  );
}

export function registerAgentIpcMain() {
  ipcMain.handle('getIconByTitleReq', (_, ...args: Parameters<GetIconByTitle>) =>
    getIconByTitleService(...args),
  );
}

/**
 * Restore an existing BrowserWindow or Create a new BrowserWindow.
 */
export async function restoreOrCreateWindow() {
  let window = BrowserWindow.getAllWindows().find(w => !w.isDestroyed());

  if (window === undefined) {
    await createDataSource();
    window = await createWindow();
  }

  if (window.isMinimized()) {
    window.restore();
  }

  window.focus();
}
