const { ipcRenderer } = require("electron");

(function () {
  ipcRenderer.on("file-list-reloaded", (_, data) => {
    console.log(data);
  });
})();
