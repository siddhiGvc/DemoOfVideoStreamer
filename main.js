const { app, BrowserWindow,screen } = require('electron');
const path = require('path');

function createWindow() {


  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.size; // Use workAreaSize to exclude taskbar
  const win = new BrowserWindow({
    width: width,
    height: height,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Optional, for security or additional settings
      nodeIntegration: true,
    },
    fullscreen: true,
    autoHideMenuBar: true,
  });

  // Load a local HTML file or a remote URL (e.g., your web app)
//   win.loadURL('index.html'); // Replace with your web app URL or local file
   win.loadFile(path.join(__dirname, 'index.html'));
   win.once('ready-to-show', () => {
    win.setFullScreen(true); // Simulate full-screen on startup
  });

  // Register F11 key for toggling full-screen mode
  globalShortcut.register('F11', () => {
    win.setFullScreen(!win.isFullScreen()); // Toggle full-screen mode
  });


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
