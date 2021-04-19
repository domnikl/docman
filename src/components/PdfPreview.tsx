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
    this.state = new PdfPreviewState(0, 1);
    this.handleDocumentLoadSuccess = this.handleDocumentLoadSuccess.bind(this);
  }

  handleDocumentLoadSuccess(success: DocumentLoadSuccess) {
    this.setState({ numPages: success.numPages });
  }

  render() {
    const filePath = "file://" + this.props.filePath;

    return (
      <div>
        <Document
          file={filePath}
          onLoadSuccess={this.handleDocumentLoadSuccess}
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
