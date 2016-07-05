//Electron
const electron = require('electron');

//App Info
const app = electron.app;
const app_name = 'idiots.win';
const app_title = 'idiots.win';
const app_version = '1.0.1';
const app_description = 'The unofficial electron app for idiots.win';
const app_menu = electron.Menu;

// App Window
const BrowserWindow = electron.BrowserWindow;

//Menu Contents for MacOS ONLY
const darwin_menu_content = [
  {
    label: 'Application',
    submenu: [
      { label: 'Hide ' + app_name, accelerator: 'Command+H', role: 'hide' },
      { label: 'Hide Others', accelerator: 'Command+Shift+H', role: 'hideothers' },
      { type: 'separator' },
      { label: 'Quit', accelerator: 'Command+Q', click: function() {app.quit();} }
    ]
  }, {
    label: 'Edit',
    submenu: [
      { label: 'Undo', accelerator: 'CommandOrControl+Z', role: 'undo' },
      { label: 'Redo', accelerator: 'Shift+CommandOrControl+Z', role: 'redo' },
      { type: 'separator' },
      { label: 'Cut', accelerator: 'CommandOrControl+X', role: 'cut' },
      { label: 'Copy', accelerator: 'CommandOrControl+C', role: 'copy' },
      { label: 'Paste', accelerator: 'CommandOrControl+V', role: 'paste' },
      { label: 'Select All', accelerator: 'CommandOrControl+A', role: 'selectall' }
    ]
  }, {
    label: 'View',
    submenu: [
      { label: 'Forward', accelerator: 'CommandOrControl+Right', click: function(item,focusedWindow) {if (focusedWindow) focusedWindow.webContents.goForward();console.log("Going forward a page!")} },
      { label: 'Back', accelerator: 'CommandOrControl+Left', click: function(item,focusedWindow) {if (focusedWindow) focusedWindow.webContents.goBack();console.log("Going back a page!")} },
      { type: 'separator' },
      { label: 'Reload', accelerator: 'CommandOrControl+R', click: function(item,focusedWindow) {if (focusedWindow) focusedWindow.webContents.reload();} }
    ]
  }, {
    label: 'Window',
    role: 'window',
    submenu: [
      { label: 'Minimize', accelerator: 'CommandOrControl+M', role: 'minimize' },
      { label: 'Close', accelerator: 'CommandOrControl+W', role: 'close' }
    ]
  }, {
    label: 'Help',
    role: 'help',
    submenu: [
      { label: 'About idiots.win', click: function() { require('electron').shell.openExternal("https://github.com/Meadowcottage/idiots.win" + app_version) } },
      { label: 'View idiots.win', click: function() { require('electron').shell.openExternal("https://idiots.win") } },
      { type: 'separator' },
      { label: 'Changelog', click: function() { require('electron').shell.openExternal("https://github.com/Meadowcottage/idiots.win/releases/tag/" + app_version) } }
    ]
  }
];

//General Menu Contents
const menu_content = [
  {
    label: 'Edit',
    submenu: [
      { label: 'Undo', accelerator: 'CommandOrControl+Z', role: 'undo' },
      { label: 'Redo', accelerator: 'Shift+CommandOrControl+Z', role: 'redo' },
      { type: 'separator' },
      { label: 'Cut', accelerator: 'CommandOrControl+X', role: 'cut' },
      { label: 'Copy', accelerator: 'CommandOrControl+C', role: 'copy' },
      { label: 'Paste', accelerator: 'CommandOrControl+V', role: 'paste' },
      { label: 'Select All', accelerator: 'CommandOrControl+A', role: 'selectall' }
    ]
  }, {
    label: 'View',
    submenu: [
      { label: 'Forward', accelerator: 'CommandOrControl+Right', click: function(item,focusedWindow) {if (focusedWindow) focusedWindow.webContents.goForward();console.log("Going forward a page!")} },
      { label: 'Back', accelerator: 'CommandOrControl+Left', click: function(item,focusedWindow) {if (focusedWindow) focusedWindow.webContents.goBack();console.log("Going back a page!")} },
      { type: 'separator' },
      { label: 'Reload', accelerator: 'CommandOrControl+R', click: function(item,focusedWindow) {if (focusedWindow) focusedWindow.webContents.reload();} }
    ]
  }, {
    label: 'Window',
    role: 'window',
    submenu: [
      { label: 'Minimize', accelerator: 'CommandOrControl+M', role: 'minimize' },
      { label: 'Close', accelerator: 'CommandOrControl+W', role: 'close' }
    ]
  }, {
    label: 'Help',
    role: 'help',
    submenu: [
      { label: 'About idiots.win', click: function() { require('electron').shell.openExternal("https://github.com/Meadowcottage/idiots.win" + app_version) } },
      { label: 'View idiots.win', click: function() { require('electron').shell.openExternal("https://idiots.win") } },
      { type: 'separator' },
      { label: 'Changelog', click: function() { require('electron').shell.openExternal("https://github.com/Meadowcottage/idiots.win/releases/tag/" + app_version) } }
    ]
  }
];

// Main App Window
let mainWindow

// Chooses titleBarStyle based on OS
var app_titleBarStyle;

// Chooses menu to load based on OS
var app_OS_menu;

// If OS is Darwn(MacOS)
if (process.platform == 'darwin') {
  app_titleBarStyle = 'hidden-inset';
  app_OS_menu = darwin_menu_content;
} else {
  app_titleBarStyle = 'default';
  app_OS_menu = menu_content;
}

app.on('ready', function createWindow () {
  mainWindow = new BrowserWindow({
    title: app_title,
    titleBarStyle: app_titleBarStyle,
    backgroundColor: '#31313',
    movable: true,
    width: 1024,
    height: 768,
    fullscreenable: true,
    resizable: true,
    autoHideMenuBar: true
  })
  app_menu.setApplicationMenu(app_menu.buildFromTemplate(app_OS_menu))
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
