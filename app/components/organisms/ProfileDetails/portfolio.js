import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import DisplayCard from 'components/molecules/DisplayCard';
import ImagePreview from 'components/molecules/ImagePreview';
import isEmpty from 'lodash/isEmpty';
import BaseIcon from 'components/atoms/BaseIcon';
import { classnames } from 'utils/helper';
import Modal from 'react-modal';
import LazyImage from 'components/molecules/LazyImg';
const PortfolioScroll = ({
  onNext,
  onBack,
  files,
  onPreviewImage,
  current = false,
  viewOnly,
}) => {
  Modal.setAppElement('#app');
  const imageCount4 = files.length <= 4;
  const remaining = imageCount4 ? [...Array(4 - files.length).keys()] : [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState({});
  const [totalWidth, setWidth] = useState(0);
  const commonIconStyle = classnames({
    'W($xl)': !imageCount4,
    'H($xl)': !imageCount4,
    'Bdrs($lg)': true,
    'C(white)': imageCount4,
    'Trsdu(0.4s)': true,
    'Trsp(a)': true,
    'Trstf(e)': true,
    'W(0)': imageCount4,
    'H(0)': imageCount4,
  });
  const onBackClick = () => {
    if (imageCount4) return;
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      onBack();
    }
  };

  const newRef = useRef();

  const onNextClick = () => {
    if (imageCount4) return;
    if (currentIndex < files.length - 1) {
      setCurrentIndex(currentIndex + 1);
      onNext();
    }
  };

  const onImageClick = (e, params) => {
    e.preventDefault();
    e.stopPropagation();
    onPreviewImage(true);
    setCurrentImage(params);
  };
  const onClosePreview = () => {
    onPreviewImage(false);
    setCurrentImage({});
  };
  console.log(
    imageCount4,
    files.length,
    'imageCount4',
    commonIconStyle,
    currentIndex === 0 ? 'C($navBarBg)' : '',
  );

  console.log(totalWidth);
  return (
    <div className="D(f) Jc(fs) Ai(c) W(fc) End($xss)">
      <BaseIcon
        icon="showmore"
        iconClasses={`${commonIconStyle} Rotate(90deg) ${
          currentIndex === 0 ? 'C($disabledGrey)' : 'Bgc($navBarBg):h'
        }`}
        onClick={onBackClick}
      />
      {/* <div>{JSON.stringify(images)}</div> */}
      <div className="Ov(h) Maw($50xl)">
        <div
          className="D(f) Ai(c) Jc(fs) Trsdu(1s) Trsp(a) Trstf(e)"
          ref={newRef}
          style={{
            transform: `translateX(${-1 * currentIndex * 400}px)`,
          }}
        >
          {files.map(({ url, id, data, type, name }, index) => (
            <div
              key={id}
              className="M($xxs) Bdrs($xxs) Bd($bdblue):h"
              onClick={e => onImageClick(e, { data: url, type, index })}
            >
              <img
                src={url}
                className="W(a) H($10x) Bdrs($xxs)"
                // placeHolderClass="W($10x) H($10x)"
              />
            </div>
          ))}
        </div>
      </div>
      <BaseIcon
        icon="showmore"
        iconClasses={`${commonIconStyle} Rotate(-90deg) ${
          currentIndex >= files.length - 1
            ? 'C($disabledGrey)'
            : 'Bgc($navBarBg):h'
        }`}
        onClick={onNextClick}
      />
      <Modal
        isOpen={!isEmpty(currentImage)}
        onRequestClose={onClosePreview}
        className={`W($fc) M(a) H($fc) Pos(r) T($20x) Bd(n) O(n)`}
        overlayClassName="Bgc($modal) Pos(f) T(0) Start(0) B(0) End(0)"
      >
        <ImagePreview
          {...currentImage}
          onCancel={onClosePreview}
          files={files}
        />
      </Modal>
    </div>
  );
};

const DraftPortfolio = ({ project, loopKey, onEdit, mode, last }) => {
  return (
    <div
      className={`Ff($ffopensans) Lh(1) Px($lg) Py($smx) ${
        last ? 'Bdb($bdcardGrey)' : ''
      }`}
      key={loopKey}
    >
      <div className="D(f) Ai(c) Jc(sb)">
        <div className="Fw($fwsemibold) Mend($md) Fz($smx) W($quarter)">
          {(project && project.slice(0, 10) + '...') || 'Project'}
        </div>
        <div className="Fz($smd) Fs(i) C($inputGrey)">
          Saved draft. Will be visible only to you until completed
        </div>

        <BaseIcon
          icon="edit"
          width="28px"
          height="28px"
          iconClasses="Bdrs($half) Bgc($navBarBg):h P($xxs) C($inputGrey)"
          onClick={onEdit}
        />
      </div>
    </div>
  );
};

const Portfolio = ({ portfolio, onEdit, onAdd, onPreviewImage, viewOnly }) => {
  if (isEmpty(portfolio)) return null;
  return (
    // <DisplayCard
    //   heading="Portfolio"
    //   topRightIcon="simpleadd"
    //   onClickIcon={onAdd}
    // >
    <div className="Bdrs($xs) Bgc(white) W($60xl) H(fc)">
      <div className="D(f) Ai(c) Jc(sb) Fz($mmd) Lh(1) Px($lg) Py($xss) Bdb($bdcardGrey) Ff($ffmanrope) H($2xl)">
        <div>Portfolio</div>
        {!viewOnly && (
          <BaseIcon
            icon="simpleadd"
            width="24px"
            height="24px"
            iconClasses="Bdrs($half) Bgc($navBarBg):h P($xxs)"
            fill="black"
            onClick={onAdd}
          />
        )}
      </div>
      {portfolio.map(
        (
          {
            project,
            startYear: from,
            endYear: to,
            highlights: description,
            files,
            client,
            order,
            mode,
          },
          i,
        ) =>
          !isEmpty(files) ? (
            <div
              className={`Ff($ffopensans) Lh(1) P($lg) ${
                i < portfolio.length - 1 ? 'Bdb($bdcardGrey)' : ''
              }`}
              key={project.replace(/ /g, '') + order}
            >
              <div className="D(f) Ai(c) Jc(s)">
                <div className="Fw($fwsemibold) Mend($md) Fz($smx) W(69%)">
                  {project}
                </div>
                <div className="Fz($smd) W($quarter) Ta(e)">
                  {from} {to ? ', ' + to : ''}
                </div>
                {!viewOnly && (
                  <BaseIcon
                    icon="edit"
                    width="28px"
                    height="28px"
                    iconClasses="Bdrs($half) Bgc($navBarBg):h P($xxs) C($inputGrey) Mstart($lg)"
                    onClick={() => onEdit(i)}
                  />
                )}
              </div>
              <div className="Mt($xs) Mb($lg)">{description}</div>
              <PortfolioScroll
                files={files}
                onNext={() => {}}
                onBack={() => {}}
                onPreviewImage={onPreviewImage}
              />
            </div>
          ) : (
            <DraftPortfolio
              project={project}
              mode={mode}
              last={i < portfolio.length - 1}
              loopKey={project && project.replace(/ /g, '') + i}
              onEdit={() => onEdit(i)}
            />
          ),
      )}
    </div>
  );
};

Portfolio.propTypes = {
  portfolio: PropTypes.array,
  onEdit: PropTypes.func,
  onAdd: PropTypes.func,
  viewOnly: PropTypes.bool,
};

PortfolioScroll.defaultProps = {
  files: [],
  viewOnly: false,
};

export default Portfolio;
