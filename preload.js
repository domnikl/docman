const { ipcRenderer } = require("electron");

process.once("loaded", () => {
  window.addEventListener("message", (e) => {
    if (e.data.type === "select-dirs") {
      ipcRenderer.send("select-dirs");
    }
  });
});
