import React, { useState } from 'react';
import BaseIcon from 'components/atoms/BaseIcon';
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${
  pdfjs.version
}/pdf.worker.js`;
import { classnames } from 'utils/helper';

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

const ImagePreview = ({ data, onCancel, files, index }) => {
  const commonIconStyle = classnames({
    'W($xl)': true,
    'H($xl)': true,
    'Bdrs($lg)': true,
    // 'C(white)': imageCount4,
    'Trsdu(0.4s)': true,
    'Trsp(a)': true,
    'Trstf(e)': true,
    // 'W(0)': imageCount4,
    // 'H(0)': imageCount4,
  });
  const [currentIndex, setCurrentIndex] = useState(index);
  const [currentImage, setCurrentImage] = useState({ data, index });
  const onBackClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setCurrentImage({
        data: files[currentIndex - 1].url,
        index: currentIndex - 1,
      });
    }
  };
  const total = files.length;

  const onNextClick = () => {
    if (currentIndex < total - 1) {
      setCurrentIndex(currentIndex + 1);
      setCurrentImage({
        data: files[currentIndex + 1].url,
        index: currentIndex + 1,
      });
    }
  };

  return (
    <div>
      <BaseIcon
        icon="close"
        iconClasses="W($xl) H($xl) Bxz(cb) P($xxs) Bdrs($half) C(white) Bgc($inputGrey):h M($sm) Start(90%) Pos(f) T($10x)"
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          setTimeout(onCancel, 300);
        }}
      />
      <div className="D(f) Ai(c) Jc(c)">
        <BaseIcon
          icon="showmore"
          iconClasses={`${commonIconStyle} Rotate(90deg) ${
            currentIndex === 0 ? 'C($disabledGrey)' : 'Bgc($navBarBg):h'
          } Pos(f) T($35x) Start($20x)`}
          onClick={onBackClick}
        />
        <img src={currentImage.data} className="W($60xl)" />
        <BaseIcon
          icon="showmore"
          iconClasses={`${commonIconStyle} Rotate(-90deg) ${
            currentIndex >= total - 1 ? 'C($disabledGrey)' : 'Bgc($navBarBg):h'
          } Pos(f) T($35x) End($20x)`}
          onClick={onNextClick}
        />
      </div>
    </div>
  );
};

const Preview = ({ data, onCancel, type, files, index }) => {
  if (!type) return null;
  if (type.match('image'))
    return (
      <ImagePreview
        data={data}
        onCancel={onCancel}
        files={files}
        index={index}
      />
    );
  return <PDFPreview data={data} onCancel={onCancel} />;
};

export default Preview;
