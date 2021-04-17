const React = require("react");

import ChooseDirectory from "./ChooseDirectory";

export default class FileList extends React.Component {
  constructor(props) {
    super(props);
    this.handleFileSelected = this.handleFileSelected.bind(this);
    this.handleSelectDirectory = this.handleSelectDirectory.bind(this);
  }

  handleFileSelected(e) {
    this.props.onChange(e.target.dataset.filePath);
  }

  handleSelectDirectory() {
    this.props.onSelectDirectory();
  }

  render() {
    const items = this.props.fileNames.map((file) => (
      <li>
        <a href="#" data-file-path={file} onClick={this.handleFileSelected}>
          {file}
        </a>
      </li>
    ));

    return (
      <div class="file-list">
        <div class="file-list-heading">
          <h2>Files</h2>
          <div class="choose-directory">
            <ChooseDirectory onClick={this.handleSelectDirectory} />
          </div>
        </div>
        <ul>
          <li>
            <div class=""></div>
          </li>
          {items}
        </ul>
      </div>
    );
  }
}
