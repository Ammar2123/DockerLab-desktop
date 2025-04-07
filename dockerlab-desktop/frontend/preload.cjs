const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  runDockerCommand: (cmd) => {
    console.log("🔌 Preload sending command:", cmd);
    return ipcRenderer.invoke('run-docker-command', cmd);
  },
});
