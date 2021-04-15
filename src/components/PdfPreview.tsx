const { ipcRenderer } = require("electron");
const React = require("react");
import { pdfjs, Document, Page } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class DocumentLoadSuccess {
  numPages: Number;
}

class PdfPreviewState {
  constructor(public numPages: Number, public pageNumber: Number) {}
}

export default class PdfPreview extends React.Component {
  state: PdfPreviewState;

  constructor(props) {
    super(props);

    //this.state.numPages = React.useState(null);
    //this.state.pageNumber = React.useState(1);
    this.state = new PdfPreviewState(0, 1);
  }

  onDocumentLoadSuccess(success: DocumentLoadSuccess) {
    //this.setState({ numPages: success.numPages });
  }

  render() {
    return (
      <div>
        <Document
          file="file:///home/dominik/Workspace/docman/test.pdf"
          onLoadSuccess={this.onDocumentLoadSuccess}
        >
          <Page pageNumber={this.state.pageNumber} />
        </Document>
        <p>
          Page {this.state.pageNumber} of {this.state.numPages}
        </p>
      </div>
    );
  }
}
