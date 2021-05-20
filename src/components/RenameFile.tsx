const React = require("react");
const path = require("path");

interface RenameFileProps {
  fileName: string;
  onChange: (before: string, after: string) => void;
  onAbort: () => void;
}

export default function RenameFile(props: RenameFileProps) {
  const parsedPath = path.parse(props.fileName);

  const handleKeyUp = (e) => {
    const before = e.target.dataset.originalName;
    const after = e.target.value + parsedPath.ext;

    if (e.key == "Enter") {
      props.onChange(before, after);
    } else if (e.key == "Escape") {
      props.onAbort();
    }
  };

  return (
    <div className="inline-input">
      <input
        type="text"
        data-original-name={props.fileName}
        defaultValue={parsedPath.name}
        name="file"
        onKeyUp={handleKeyUp}
        autoFocus
      />
      <span>{parsedPath.ext}</span>
    </div>
  );
}
