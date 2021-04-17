const React = require("react");

class ChooseDirectoryState {
  directory: string;
}

interface ChooseDirectoryProps {
  onClick: () => void;
}

export default class ChooseDirectory extends React.Component {
  state: ChooseDirectoryState;

  constructor(props: ChooseDirectoryProps) {
    super(props);
    this.state = { directory: "" };
    this.handleSelectDirectory = this.handleSelectDirectory.bind(this);
  }

  handleSelectDirectory() {
    this.props.onClick();
  }

  render() {
    return (
      <button
        onClick={this.handleSelectDirectory}
        class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-0.5 px-0.5 rounded inline-flex items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"
          />
        </svg>
      </button>
    );
  }
}
