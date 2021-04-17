const React = require("react");

import Main from "./components/Main";
import { onFileListReloaded, selectDirs } from "./ipc";

class AppState {
  workingDir: string = null;
  fileNames: string[] = [];
}

export default class App extends React.Component {
  private state: AppState;

  constructor(props) {
    super(props);
    this.state = new AppState();
    this.handleSelectDirectory = this.handleSelectDirectory.bind(this);
  }

  componentDidMount() {
    onFileListReloaded((_, data) => {
      this.setState({ workingDir: data.dir, fileNames: data.fileNames });
    });
  }

  handleSelectDirectory() {
    selectDirs();
  }

  render() {
    return (
      <Main
        workingDir={this.state.workingDir}
        fileNames={this.state.fileNames}
        onSelectDirectory={this.handleSelectDirectory}
      />
    );
  }
}
