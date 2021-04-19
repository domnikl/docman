const React = require("react");

interface RenameFileProps {
  fileName: string;
  onChange: (before: string, after: string) => void;
  onAbort: () => void;
}

export default class RenameFile extends React.Component {
  nameInput: any;

  constructor(props: RenameFileProps) {
    super(props);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  handleKeyUp(e) {
    const before = e.target.dataset.originalName;
    const after = e.target.value;

    if (e.key == "Enter") {
      this.props.onChange(before, after);
    } else if (e.key == "Escape") {
      this.props.onAbort();
    }
  }

  onComponentMounted() {
    this.nameInput.focus();
  }

  render() {
    return (
      <div className="inline-input">
        <input
          type="text"
          data-original-name={this.props.fileName}
          defaultValue={this.props.fileName}
          name="file"
          onKeyUp={this.handleKeyUp}
          ref={(input) => {
            this.nameInput = input;
          }}
          autoFocus
        ></input>
      </div>
    );
  }
}
