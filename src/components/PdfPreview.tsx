const { ipcRenderer } = require("electron");
const React = require("react");
const { useState } = require("react");
import { pdfjs, Document, Page } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class DocumentLoadSuccess {
  numPages: Number;
}

interface PdfPreviewProps {
  filePath: string;
}

export default function PdfPreview(props: PdfPreviewProps) {
  const filePath = "file://" + props.filePath;
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  const nextPage = () => {
    if (pageNumber <= numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const previousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "space-evenly",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: "calc(100vh - 5rem)",
            width: "30px",
            paddingRight: "5px",
            cursor: "pointer",
          }}
          onClick={previousPage}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
            />
          </svg>
        </div>
        <Document
          file={filePath}
          onLoadSuccess={(success: DocumentLoadSuccess) => {
            setNumPages(success.numPages);
            setPageNumber(1);
          }}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: "calc(100vh - 5rem)",
            width: "30px",
            cursor: "pointer",
            paddingLeft: "5px",
          }}
          onClick={nextPage}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>

      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
}
