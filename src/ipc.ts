const { ipcRenderer } = require("electron");

export function onFileListReloaded(fn) {
  ipcRenderer.on("file-list-reloaded", fn);
}

export function selectDirs() {
  window.postMessage({
    type: "select-dirs",
  });
}
