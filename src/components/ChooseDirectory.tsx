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
      <a href="#" onClick={this.handleSelectDirectory}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z"
            clipRule="evenodd"
          />
          <path d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z" />
        </svg>
      </a>
    );
  }
}
