import { useEffect, useState } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "./PDFViewer.css";
import Loader from "../../Loader/Loader";
import Theme from "../../types/Theme";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

type PDFViewerProps = {
  file: File;
  theme: Theme;
};
function PDFViewer(props: PDFViewerProps) {
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [containerHeight, setContainerHeight] = useState<number>(
    calculateContainerHeight()
  );

  const { file, theme } = props;
  useEffect(() => {
    const handleResize = () => {
      setContainerHeight(calculateContainerHeight());
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  function changePage(offset: number) {
    setPageNumber(pageNumber + offset);
  }
  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setTotalPages(numPages);
  }
  function calculateContainerHeight(): number {
    const containerHeight = +getComputedStyle(
      document.getElementsByClassName("pdf-container")[0]
    ).height.split("px")[0];
    const containerWidth = +getComputedStyle(
      document.getElementsByClassName("pdf-container")[0]
    ).width.split("px")[0];
    const aspectRatio = containerHeight / containerWidth;

    if (aspectRatio > 1.4) {
      return containerWidth * 1.4;
    } else {
      return containerHeight;
    }
  }

  return (
    <div className="pdfviewer-view">
      <Document
        loading={<Loader theme={theme} />}
        className={"pdfviewer-document"}
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {
          <Page
            loading={<Loader theme={theme} />}
            devicePixelRatio={2}
            height={containerHeight}
            className={"pdfviewer-page"}
            pageNumber={pageNumber}
          />
        }
      </Document>
      <p className="pdfviewer-pageControls">
        {pageNumber - 1 >= 1 && (
          <button onClick={() => changePage(-1)}>{"<"}</button>
        )}
        <p className="pdfviewer-pageControls-pagenumber">
          Page {pageNumber} / {totalPages}
        </p>
        {pageNumber + 1 <= totalPages && (
          <button onClick={() => changePage(1)}>{">"}</button>
        )}
      </p>
    </div>
  );
}

export default PDFViewer;
