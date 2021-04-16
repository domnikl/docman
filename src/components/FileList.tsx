const { ipcRenderer } = require("electron");
const React = require("react");

import ChooseDirectory from "./ChooseDirectory";

class FileListState {
  fileList: string[];
}

export default class FileList extends React.Component {
  state: FileListState;

  constructor(props) {
    super(props);
    this.state = { fileList: [] };
  }

  componentDidMount() {
    ipcRenderer.on("file-list-reloaded", (_, data) => {
      this.setState({ fileList: data });
    });
  }

  render() {
    const items = this.state.fileList.map((file) => (
      <li>
        <a
          href="#"
          class="relative flex flex-row items-center focus:outline-none hover:bg-gray-700 text-gray-500 hover:text-gray-200 border-l-4 border-transparent hover:border-blue-500 pr-6"
        >
          <span class="ml-2 font-semibold text-sm tracking-wide truncate font-sans">
            {file}
          </span>
        </a>
      </li>
    ));

    return (
      <ul class="flex flex-col py-6 space-y-1">
        <li class="px-5">
          <div class="flex flex-row items-center h-8">
            <div class="flex font-semibold text-sm text-gray-300 my-4 font-sans uppercase pr-1">
              Files
            </div>
            <div clas="flex justify-end">
              <ChooseDirectory />
            </div>
          </div>
        </li>
        {items}
      </ul>
    );
  }
}
