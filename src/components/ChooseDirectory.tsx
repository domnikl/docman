const React = require("react");

interface ChooseDirectoryProps {
  selected: string;
  onClick: () => void;
}

export default function ChooseDirectory(props: ChooseDirectoryProps) {
  const handleSelectDirectory = () => {
    props.onClick();
  };

  return (
    <div className="directory-chooser">
      <div>
        <a href="#" onClick={handleSelectDirectory}>
          {props.selected}
        </a>
      </div>
      <div>
        <a href="#" onClick={handleSelectDirectory}>
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
      </div>
    </div>
  );
}
