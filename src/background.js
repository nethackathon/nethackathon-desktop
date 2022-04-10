'use strict'

import { app, protocol, BrowserWindow, ipcMain, shell } from 'electron';
import * as fs from 'fs';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
import { c, x } from 'tar';
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer';
import axios from 'axios';
import FData from 'form-data';
const isDev = (process.env.NODE_ENV === 'development')
const apiRoute = 'https://api.nethackathon.org'
const devRoute = 'http://localhost:3000'
const baseRoute = (isDev) ? devRoute : apiRoute

const isDevelopment = process.env.NODE_ENV !== 'production'

const path = require('path');
const nethackPath = path.join(__dirname, '/nethack/nethack')

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

function getNetHackZip(claimee) {
  const archivePath = path.join(__dirname, `${claimee}_${new Date().getTime()}.tgz`);
  c({ gzip: true, portable: true, C: __dirname, sync: true }, ['nethack'])
    .pipe(fs.createWriteStream(archivePath))
  return archivePath;
}

async function launchNetHack() {
  shell.openPath(nethackPath);
}

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, '../src/preload.js'),
      
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
  
  ipcMain.on('launch-nethack', launchNetHack)
  
  ipcMain.handle('upload-nethack-zip', async (evt, args) => {
    const archivePath = getNetHackZip(args.claimee);
    const route = baseRoute + '/invoke/uploadSave';
    let formData = new FData();
    formData.append('file', fs.createReadStream(archivePath));
    formData.append('characterName', args.characterName);

    const request_config = {
      headers: {
        'Authorization': `Bearer ${args.accessToken}`,
        ...formData.getHeaders()
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity
    };

    await axios.post(route, 
      formData, 
      request_config);
      
    return 'done';
  })
  
  ipcMain.handle('download-nethack-zip', async (evt, args) => {
    const archivePath = path.join(__dirname, args.fileName);
    const route = baseRoute + '/invoke/downloadSave';
    
    await axios.post(route, { fileName: args.fileName }, {
      responseType: 'stream',
      headers: {
        'Authorization': `Bearer ${args.accessToken}`
      }
    }).then(function (response) {
      const stream = response.data.pipe(fs.createWriteStream(archivePath));
      stream.on('finish', async () => {
        // delete existing 'nethack' directory
        await fs.promises.rmdir(path.join(__dirname, 'nethack'), { recursive: true, force: true });
        // extract zip
        x({ file: archivePath , C: __dirname, sync: true });
        return 'done';
      });
    });

  })
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
