import {BrowserWindow} from 'electron';
import {authenticationURL, loadTokens, logout, logOutURL} from '/@/services/auth';

let browserWindow: BrowserWindow | null = null;

export const createAuthWindow = () => {
  destroyAuthWin();
  // Return a new promise for the authentication window process.
  return new Promise<void>((resolve, reject) => {
    browserWindow = new BrowserWindow({
      width: 500,
      height: 600,
      webPreferences: {
        nodeIntegration: false,
      },
    });
    browserWindow
      .loadURL(authenticationURL)
      .then(() => {
        if (!browserWindow) throw new Error('Browser window no longer exists.');
        const {
          session: {webRequest},
        } = browserWindow.webContents;
        const filter = {urls: ['http://localhost/callback*']};

        // Listen for the specific URL callback.
        webRequest.onBeforeRequest(filter, async ({url}) => {
          try {
            await loadTokens(url); // Load tokens asynchronously
            destroyAuthWin(); // Always destroy the window after loading tokens
            resolve(); // Resolve the promise after completing the token load
          } catch (error) {
            console.error('Error processing authentication:', error);
            destroyAuthWin();
            reject(error); // Reject the promise on error
          }
        });

        browserWindow?.on('closed', () => {
          browserWindow = null;
          resolve(); // Resolve the promise if the window is closed before the process is complete
        });
      })
      .catch(error => {
        console.error('Failed to load URL:', error);
        destroyAuthWin();
        reject(error); // Reject the promise if URL loading fails
      });
  });
};

function destroyAuthWin() {
  console.log('Destroying authentication window', browserWindow);
  if (!browserWindow) return;
  browserWindow.close(); // Close only if browserWindow is not null.
  browserWindow = null;
}

export const createLogoutWindow = async () => {
  const logoutWindow = new BrowserWindow({
    show: false,
  });

  await logoutWindow.loadURL(logOutURL);

  logoutWindow.on('ready-to-show', async () => {
    await logout();
    logoutWindow.close();
  });
};
