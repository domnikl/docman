const React = require("react");

interface RenameFileProps {
  fileName: string;
  onChange: (before: string, after: string) => void;
  onAbort: () => void;
}

export default function RenameFile(props: RenameFileProps) {
  const handleKeyUp = (e) => {
    const before = e.target.dataset.originalName;
    const after = e.target.value;

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
        defaultValue={props.fileName}
        name="file"
        onKeyUp={handleKeyUp}
        autoFocus
      />
    </div>
  );
}
