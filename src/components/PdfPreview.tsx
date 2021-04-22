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

  return (
    <div>
      <Document
        file={filePath}
        onLoadSuccess={(success: DocumentLoadSuccess) =>
          setNumPages(success.numPages)
        }
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
}
