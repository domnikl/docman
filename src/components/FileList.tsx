const React = require("react");

import ChooseDirectory from "./ChooseDirectory";
import RenameFile from "./RenameFile";

class FileListState {
  editingFile: string = null;
}

interface FileListProps {
  fileNames: string[];
  onSelectDirectory: () => void;
  onChange: (fileName: string) => void;
  onRenameFile: (before: string, after: string, fn: () => void) => void;
}

export default class FileList extends React.Component {
  constructor(props: FileListProps) {
    super(props);
    this.handleFileSelected = this.handleFileSelected.bind(this);
    this.handleSelectDirectory = this.handleSelectDirectory.bind(this);
    this.handleRename = this.handleRename.bind(this);
    this.handleRenameAbort = this.handleRenameAbort.bind(this);
    this.onFileRenamed = this.onFileRenamed.bind(this);
    this.state = new FileListState();
  }

  handleFileSelected(e) {
    this.editFileName(e.target.dataset.fileName);
  }

  editFileName(fileName: String) {
    this.setState({ editingFile: fileName });
    this.props.onChange(fileName);
  }

  handleSelectDirectory() {
    this.props.onSelectDirectory();
  }

  handleRename(before: string, after: string) {
    if (before != after) {
      this.props.onRenameFile(before, after, this.onFileRenamed);
    } else {
      this.goForward();
    }
  }

  handleRenameAbort() {
    this.setState({ editingFile: null });
  }

  onFileRenamed(_, data) {
    this.goForward();
  }

  goForward() {
    let currentIndex = this.props.fileNames.indexOf(this.state.editingFile);

    if (currentIndex < this.props.fileNames.length && currentIndex != -1) {
      const next = this.props.fileNames[currentIndex + 1];
      this.setState({ editingFile: next });
      this.props.onChange(next);
    } else {
      this.setState({ editingFile: null });
      this.props.onChange(null);
    }
  }

  renderFileItem(file) {
    if (file === this.state.editingFile) {
      return (
        <RenameFile
          fileName={this.state.editingFile}
          onChange={this.handleRename}
          onAbort={this.handleRenameAbort}
        />
      );
    } else {
      return (
        <a href="#" data-file-name={file} onClick={this.handleFileSelected}>
          {file}
        </a>
      );
    }
  }

  render() {
    const items = this.props.fileNames.map((file) => (
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
        {this.renderFileItem(file)}
      </li>
    ));

    return (
      <div className="file-list">
        <div className="file-list-heading">
          <h2>Files</h2>
          <div className="choose-directory">
            <ChooseDirectory onClick={this.handleSelectDirectory} />
          </div>
        </div>
        <ul className="file-list-items">{items}</ul>
      </div>
    );
  }
}
