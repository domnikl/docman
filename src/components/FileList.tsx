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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
              clip-rule="evenodd"
            />
          </svg>
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
        <ul class="file-list-items">{items}</ul>
      </div>
    );
  }
}
