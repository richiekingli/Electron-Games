//Electron
const electron = require('electron');

//App Info
const app = electron.app;
const app_name = 'Diep.io';
const app_title = 'Wings!';
const app_version = '1.0.1';
const app_description = 'The unofficial electron app for diep.io';
const app_menu = electron.Menu;

// App Window
const BrowserWindow = electron.BrowserWindow;

// Main App Window
let mainWindow

// Chooses titleBarStyle based on OS
var app_titleBarStyle;

// If OS is Darwin(MacOS)
if (process.platform == 'darwin') {
  app_titleBarStyle = 'hidden-inset';
} else {
  app_titleBarStyle = 'default';
}

app.on('ready', function createWindow () {
  mainWindow = new BrowserWindow({
    title: app_title,
    titleBarStyle: app_titleBarStyle,
    movable: true,
    width: 1280,
    height: 720,
    fullscreenable: true,
    resizable: true,
    autoHideMenuBar: true
  })
  app_menu.setApplicationMenu(null)
  mainWindow.loadURL('file://' + __dirname + '/index.html')
  mainWindow.on('closed', function () {
  mainWindow = null
  })
})
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
  app.quit()
  }
})
app.on('activate', function () {
  if (mainWindow === null) {
  createWindow()
  }
})
