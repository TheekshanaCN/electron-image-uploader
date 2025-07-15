const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const api = require('./api');

let mainWindow;
let apiServer;

function createWindow() {
  // Start Express server first
  apiServer = api.listen(0, () => {
    const port = apiServer.address().port;
    console.log(`API running on port ${port}`);

    mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        preload: path.join(__dirname, 'preload.js')
      }
    });

    mainWindow.loadFile('./src/renderer/index.html');

    // Send port to renderer when window is ready
    mainWindow.webContents.on('did-finish-load', () => {
      mainWindow.webContents.send('api-port', port);
    });
  });
}

ipcMain.handle('get-api-port', () => {
  return apiServer?.address()?.port;
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});