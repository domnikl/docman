const React = require("react");
import FileList from "./FileList";
import PdfPreview from "./PdfPreview";

class MainState {
  selected: string = null;
}

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

export default class Main extends React.Component {
  constructor(props: MainProps) {
    super(props);
    this.handleSelectDirectory = this.handleSelectDirectory.bind(this);
    this.handleFileSelected = this.handleFileSelected.bind(this);
    this.handleRenameFile = this.handleRenameFile.bind(this);
    this.state = new MainState();
  }

  handleSelectDirectory() {
    this.props.onSelectDirectory();
  }

  handleFileSelected(filePath: string) {
    this.setState({ selected: filePath });
  }

  handleRenameFile(before: string, after: string, fn: () => void) {
    this.props.onRenameFile(this.props.workingDir, before, after, fn);
  }

  render() {
    let preview = null;

    if (this.state.selected != null) {
      preview = (
        <PdfPreview
          filePath={`${this.props.workingDir}/${this.state.selected}`}
        />
      );
    } else {
      preview = <div>No file selected.</div>;
    }

    return (
      <div className="container">
        <div className="sidebar">
          <FileList
            fileNames={this.props.fileNames}
            onChange={this.handleFileSelected}
            onSelectDirectory={this.handleSelectDirectory}
            onRenameFile={this.handleRenameFile}
          />
        </div>

        <div className="main">{preview}</div>
      </div>
    );
  }
}
