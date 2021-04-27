const React = require("react");
const { useState, useEffect } = require("react");

import Main from "./components/Main";
import { onFileListReloaded, renameFile, selectDirs } from "./ipc";

export default function App() {
  const [workingDir, setWorkingDir] = useState<string | undefined>(undefined);
  const [fileNames, setFileNames] = useState([]);

  useEffect(() => {
    onFileListReloaded((e: any, data: FileList) => {
      setWorkingDir(data.dir);
      setFileNames(data.fileNames);

      document.title = "docman: " + data.dir;
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
