const { ipcRenderer } = require("electron");

process.once("loaded", () => {
  // send messages from window to IPC
  window.addEventListener("message", (e) => {
    if (e.data.type === "select-dirs") {
      ipcRenderer.send("select-dirs");
    }
  });
});
