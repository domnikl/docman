const React = require("react");
const { useState } = require("react");

import RenameFile from "./RenameFile";

interface FileListProps {
  fileNames: string[];
  onChange: (fileName: string) => void;
  onRenameFile: (before: string, after: string, fn: () => void) => void;
}

export default function FileList(props: FileListProps) {
  const [editingFile, setEditingFile] = useState(undefined);

  const goForward = () => {
    let currentIndex = props.fileNames.indexOf(editingFile);

    if (currentIndex < props.fileNames.length && currentIndex != -1) {
      const next = props.fileNames[currentIndex + 1];
      setEditingFile(next);
      props.onChange(next);
    } else {
      setEditingFile(undefined);
      props.onChange(null);
    }
  };

  const handleRename = (before: string, after: string) => {
    if (before != after) {
      props.onRenameFile(before, after, goForward);
    } else {
      goForward();
    }
  };

  const handleRenameAbort = () => {
    setEditingFile(undefined);
  };

  const editFileName = (fileName: string) => {
    setEditingFile(fileName);
    props.onChange(fileName);
  };

  const handleFileSelected = (e) => {
    editFileName(e.target.dataset.fileName);
  };

  const renderFileItem = (file: string) => {
    if (file === editingFile) {
      return (
        <RenameFile
          fileName={editingFile}
          onChange={handleRename}
          onAbort={handleRenameAbort}
        />
      );
    } else {
      return (
        <a href="#" data-file-name={file} onClick={handleFileSelected}>
          {file}
        </a>
      );
    }
  };

  const items = props.fileNames.map((file: string) => (
    <li key={file}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
          clipRule="evenodd"
        />
      </svg>
      {renderFileItem(file)}
    </li>
  ));

  return <ul className="file-list-items">{items}</ul>;
}
