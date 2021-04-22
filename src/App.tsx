const React = require("react");
const { useState, useEffect } = require("react");

import Main from "./components/Main";
import { onFileListReloaded, renameFile, selectDirs } from "./ipc";

class AppState {
  workingDir: string = null;
  fileNames: string[] = [];
}

export default function App(props) {
  const [workingDir, setWorkingDir] = useState<string | undefined>(undefined);
  const [fileNames, setFileNames] = useState([]);

  useEffect(() => {
    onFileListReloaded((_, data) => {
      setWorkingDir(data.dir);
      setFileNames(data.fileNames);
    });
  });

  return (
    <Main
      workingDir={workingDir}
      fileNames={fileNames}
      onSelectDirectory={() => selectDirs()}
      onRenameFile={renameFile}
    />
  );
}
