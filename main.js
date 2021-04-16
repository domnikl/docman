const path = require("path");
const fs = require("fs");
const { app, dialog, BrowserWindow, ipcMain } = require("electron");

const debug = /--debug/.test(process.argv[2]);
const settingsPath = path.join(app.getPath("userData"), "settings.json");

function loadSettings() {
  try {
    return JSON.parse(fs.readFileSync(settingsPath));
  } catch (error) {
    return {
      lastDir: process.cwd(),
    };
  }
}

function saveSettings(settings) {
  fs.writeFileSync(settingsPath, JSON.stringify(settings));
}

const settings = loadSettings();
let workingDir = settings.lastDir;
let watcher = null;

function sendFileListToBrowser(mainWindow) {
  const files = fs.readdirSync(workingDir, {
    withFileTypes: true,
  });

  const f = files.filter((file) => file.isFile()).map((file) => file.name);

  mainWindow.webContents.send("file-list-reloaded", f);
}

function watchWorkingDir(mainWindow) {
  return fs.watch(workingDir, (e) => {
    sendFileListToBrowser(mainWindow, workingDir);
  });
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
        preload: path.join(__dirname, "preload.js"),
        nodeIntegration: true,
        contextIsolation: false,
      },
    });

    mainWindow.loadURL(path.join("file://", __dirname, "dist/index.html"));

    watcher = watchWorkingDir(mainWindow);

    mainWindow.webContents.on("dom-ready", () => {
      sendFileListToBrowser(mainWindow);
    });

    // Launch fullscreen with DevTools open, usage: npm run debug
    if (debug) {
      mainWindow.webContents.openDevTools();
    }

    ipcMain.on("select-dirs", async (event, arg) => {
      const result = await dialog.showOpenDialog(mainWindow, {
        properties: ["openDirectory"],
      });

      if (result.filePaths.length >= 1) {
        if (watcher) watcher.close();
        workingDir = result.filePaths[0];
        settings.lastDir = workingDir;
        saveSettings(settings);
        sendFileListToBrowser(mainWindow);
        watcher = watchWorkingDir(mainWindow);
      }
    });
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
