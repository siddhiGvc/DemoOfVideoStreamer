const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Optional, for security or additional settings
      nodeIntegration: true,
    },
  });

  // Load a local HTML file or a remote URL (e.g., your web app)
//   win.loadURL('index.html'); // Replace with your web app URL or local file
   win.loadFile(path.join(__dirname, 'index.html'));

}

app.disableHardwareAcceleration();


app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
