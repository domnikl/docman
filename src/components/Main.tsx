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
}

export default class Main extends React.Component {
  constructor(props: MainProps) {
    super(props);
    this.handleSelectDirectory = this.handleSelectDirectory.bind(this);
    this.handleFileSelected = this.handleFileSelected.bind(this);
    this.state = new MainState();
  }

  handleSelectDirectory() {
    this.props.onSelectDirectory();
  }

  handleFileSelected(filePath: string) {
    this.setState({ selected: filePath });
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
      preview = "No file selected.";
    }

    return (
      <div class="container">
        <div class="sidebar">
          <h1>docman</h1>
          <FileList
            fileNames={this.props.fileNames}
            onChange={this.handleFileSelected}
            onSelectDirectory={this.handleSelectDirectory}
          />
        </div>

        <div class="main">{preview}</div>
      </div>
    );
  }
}
