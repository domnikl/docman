const { ipcRenderer } = require("electron");

export function onFileListReloaded(fn) {
  ipcRenderer.on("file-list-reloaded", fn);
}

export function onFileRenamed(fn) {
  ipcRenderer.on("file-renamed", fn);
}

export function selectDirs() {
  window.postMessage(
    {
      type: "select-dirs",
    },
    null
  );
}

export function renameFile(
  workingDir: string,
  before: string,
  after: string,
  fn: () => void
) {
  window.postMessage(
    {
      type: "rename-file",
      workingDir,
      before,
      after,
    },
    null
  );

  ipcRenderer.once("file-renamed", fn);
}
