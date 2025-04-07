const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.loadURL('http://localhost:5173');
  mainWindow.webContents.openDevTools();
}

ipcMain.handle('run-command', async (event, command) => {
  return new Promise((resolve, reject) => {
    const cmdProcess = spawn('cmd.exe', ['/c', 'start', 'cmd.exe', '/k', command]);

    cmdProcess.on('error', (err) => {
      reject(`Failed to start CMD: ${err.message}`);
    });

    resolve('Command launched in CMD');
  });
});

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
