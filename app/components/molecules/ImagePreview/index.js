import React, { useState } from 'react';
import BaseIcon from 'components/atoms/BaseIcon';
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${
  pdfjs.version
}/pdf.worker.js`;

const PDFPreview = ({ data, onCancel }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div>
      <BaseIcon
        icon="close"
        iconClasses="W($xl) H($xl) Bxz(cb) P($xxs) Bdrs($half) C(white) Bgc($inputGrey):h M($sm) Start(64vw) Pos(r) T(0)"
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          setTimeout(onCancel, 300);
        }}
      />
      <Document
        file={data}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={console.error}
      >
        <Page pageNumber={pageNumber} wrap />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
};
const ImagePreview = ({ data, onCancel }) => {
  return (
    <div>
      <BaseIcon
        icon="close"
        iconClasses="W($xl) H($xl) Bxz(cb) P($xxs) Bdrs($half) C(white) Bgc($inputGrey):h M($sm) Start($full) Pos(r) T(0)"
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          setTimeout(onCancel, 300);
        }}
      />
      <img src={data} className="W($full)" />
    </div>
  );
};

const Preview = ({ data, onCancel, type }) => {
  if (!type) return null;
  if (type.match('image'))
    return <ImagePreview data={data} onCancel={onCancel} />;
  return <PDFPreview data={data} onCancel={onCancel} />;
};

export default Preview;
