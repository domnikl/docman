const React = require("react");
const { useState } = require("react");
import FileList from "./FileList";
import PdfPreview from "./PdfPreview";
import ChooseDirectory from "./ChooseDirectory";

interface MainProps {
  workingDir: string;
  fileNames: string[];
  onSelectDirectory: () => void;
  onRenameFile: (
    workingDir: string,
    before: string,
    after: string,
    fn: () => void
  ) => void;
}

export default function Main(props: MainProps) {
  const [selected, setSelected] = useState(undefined);

  let preview = null;

  if (selected != null) {
    preview = <PdfPreview filePath={`${props.workingDir}/${selected}`} />;
  } else {
    preview = <div>No file selected.</div>;
  }

  return (
    <div className="container">
      <div className="sidebar">
        <div className="file-list">
          <div className="file-list-heading">
            <h2>Files</h2>
            <ChooseDirectory
              selected={props.workingDir}
              onClick={props.onSelectDirectory}
            />
          </div>
        </div>
        <FileList
          fileNames={props.fileNames}
          onChange={(filePath: string) => setSelected(filePath)}
          onRenameFile={(before, after, fn) =>
            props.onRenameFile(props.workingDir, before, after, fn)
          }
          onRenameFileAbort={() => setSelected(undefined)}
        />
      </div>

      <div className="main">{preview}</div>
    </div>
  );
}
