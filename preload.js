const { ipcRenderer } = require("electron");

process.once("loaded", () => {
  // send messages from window to IPC
  window.addEventListener("message", (e) => {
    if (e.data.type === "select-dirs") {
      ipcRenderer.send("select-dirs");
    } else if (e.data.type === "rename-file") {
      ipcRenderer.send("rename-file", e.data);
    }
  });
});
