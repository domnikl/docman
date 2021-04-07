const path = require("path");
const { app, BrowserWindow } = require("electron");

const debug = /--debug/.test(process.argv[2])

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
      },
    });

    mainWindow.loadURL(path.join("file://", __dirname, "index.html"));

    // Launch fullscreen with DevTools open, usage: npm run debug
    if (debug) {
      mainWindow.webContents.openDevTools();
      mainWindow.maximize();
      require("devtron").install();
    }

    mainWindow.on("closed", () => {
      mainWindow = null;
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
