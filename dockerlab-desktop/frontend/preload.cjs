const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // Add APIs here if needed later
});
