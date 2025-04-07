const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.loadURL('http://localhost:5173');
  win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

ipcMain.handle('run-docker-command', async (_, { os, cmd }) => {
  console.log('🟢 Received Docker command:', os, cmd);
  const scriptPath = path.join(__dirname, 'scripts', 'run_command.py');

  let pythonProcess;

  if (os === 'ubuntu') {
    pythonProcess = spawn('python3', [scriptPath, os, cmd], {
      shell: true,
      detached: true,
    });
  } else {
    pythonProcess = spawn('python', [scriptPath, os, cmd], {
      shell: true,
      detached: true,
    });
  }

  pythonProcess.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
});
