const React = require("react");
const { useState } = require("react");
import FileList from "./FileList";
import PdfPreview from "./PdfPreview";

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
        <FileList
          fileNames={props.fileNames}
          onChange={(filePath: string) => setSelected(filePath)}
          onSelectDirectory={props.onSelectDirectory}
          onRenameFile={(before, after, fn) =>
            props.onRenameFile(props.workingDir, before, after, fn)
          }
        />
      </div>

      <div className="main">{preview}</div>
    </div>
  );
}
