const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'), // ✅ Absolute path
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.loadURL('http://localhost:5173');
  win.webContents.openDevTools(); // Check DevTools
}

app.whenReady().then(createWindow);

ipcMain.handle('run-docker-command', async (_, cmd) => {
  console.log('🟢 Received Docker command:', cmd);
  const scriptPath = path.join(__dirname, 'scripts', 'run_command.py');
  spawn('python', [scriptPath, cmd], { shell: true });
});
