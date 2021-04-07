const path = require("path");
const fs = require("fs");
const { app, BrowserWindow, ipcMain } = require("electron");

const debug = /--debug/.test(process.argv[2]);

function sendFileListToBrowser(mainWindow, workingDir) {
  mainWindow.webContents.send("file-list-reloaded", fs.readdirSync(workingDir));
}

function initialize() {
  makeSingleInstance();

  function createWindow() {
    const mainWindow = new BrowserWindow({
      width: 1080,
      minWidth: 680,
      height: 840,
      title: app.getName(),
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
    });

    mainWindow.loadURL(path.join("file://", __dirname, "dist/index.html"));

    const workingDir = process.cwd();

    fs.watch(workingDir, (e) => {
      sendFileListToBrowser(mainWindow, workingDir);
    });

    mainWindow.webContents.on("dom-ready", () => {
      sendFileListToBrowser(mainWindow, workingDir);
    });

    // Launch fullscreen with DevTools open, usage: npm run debug
    if (debug) {
      mainWindow.webContents.openDevTools();
      //mainWindow.maximize();
      require("devtron").install();
    }
  }

  app.on("ready", () => {
    createWindow();
  });

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });

  app.on("activate", () => {
    if (mainWindow === null) {
      createWindow();
    }
  });
}

function makeSingleInstance() {
  if (process.mas) return;

  app.requestSingleInstanceLock();

  app.on("second-instance", () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });
}

initialize();
