//Electron
const electron = require('electron');
const globalShortcut = electron.globalShortcut;
const browserWindow = electron.BrowserWindow;
const menu = electron.Menu;

//App Info
const app = electron.app;
const app_name = app.getName();
const app_title = app.getName();
const app_version = app.getVersion();
const app_description = 'The unofficial electron app for Slither.io';
const app_config = require('./config');

// System paths
const path = require('path');
const fs = require('fs');

// Electron DL
require('electron-dl')();

// Electron Debug
require('electron-debug')({showDevTools: true});

// Main Application Window
let mainWindow

// If the application is quitting
let isQuitting = false;

// Main Window
function createMainWindow() {
    const lastWindowState = app_config.get('lastWindowState');
    const app_view = new electron.BrowserWindow({
        title: app_title,
        x: lastWindowState.x,
        y: lastWindowState.y,
        width: lastWindowState.width,
        height: lastWindowState.height,
        resizable: true,
        movable: true,
        fullscreenable: true,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: false,
            plugins: true
        }
    });
    app_view.loadURL('http://Slither.io/');

    // When window is closed, hide window
    app_view.on('close', e => {
        if (!isQuitting) {
            e.preventDefault();
            if (process.platform === 'darwin') {
                app.hide();
            } else {
                app.quit();
            }
        }

    });
    return app_view;
}

app.on('ready', () => {
    mainWindow = createMainWindow();
    menu.setApplicationMenu(require('./menu'))

    const app_page = mainWindow.webContents;

    app_page.on('dom-ready', () => {
        mainWindow.show();
    });

    //Open external links in browser
    app_page.on('new-window', (e, url) => {
        e.preventDefault();
        electron.shell.openExternal(url);
    });

    //Shortcut to reload the page.
    globalShortcut.register('CmdOrCtrl+R', () => {
        mainWindow.webContents.reload();
    })
    globalShortcut.register('CmdOrCtrl+Left', () => {
        mainWindow.webContents.goBack();
        mainWindow.webContents.reload();
    })

    mainWindow.on('app-command', (e, cmd) => {
        // Navigate the window back when the user hits their mouse back button
        if (cmd === 'browser-backward' && mainWindow.webContents.canGoBack()) {
            mainWindow.webContents.goBack()
        }
    })
})
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
app.on('activate', () => {
    mainWindow.show()
})
app.on('before-quit', () => {
	isQuitting = true;
});
