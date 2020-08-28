import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DisplayCard from 'components/molecules/DisplayCard';
import ImagePreview from 'components/molecules/ImagePreview';
import isEmpty from 'lodash/isEmpty';
import BaseIcon from 'components/atoms/BaseIcon';
import { classnames } from 'utils/helper';
import Modal from 'react-modal';

const PortfolioScroll = ({ onNext, onBack, images, current = false }) => {
  Modal.setAppElement('#app');
  const imageCount4 = images.length <= 4;
  const remaining = imageCount4 ? [...Array(4 - images.length).keys()] : [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState('');
  const commonIconStyle = classnames({
    'W($xl)': true,
    'H($xl)': true,
    'Bdrs($lg)': true,
    'C(white)': imageCount4,
    'Bgc($navBarBg):h': !imageCount4,
    'Trsdu(0.4s)': true,
    'Trsp(a)': true,
    'Trstf(e)': true,
  });
  const onBackClick = () => {
    if (imageCount4) return;
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      onBack();
    }
  };

  const onNextClick = () => {
    if (imageCount4) return;
    if (currentIndex < images.length / 4 - 1) {
      setCurrentIndex(currentIndex + 1);
      onNext();
    }
  };

  const onImageClick = (e, image) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImage(image);
  };
  return (
    <div className="D(f) Jc(fs) Ai(c) W(fc) Pos(r) End($xss)">
      <BaseIcon
        icon="showmore"
        iconClasses={commonIconStyle + ' Rotate(90deg)'}
        onClick={onBackClick}
      />
      <div className="Ov(h) Maw($50xl)">
        <div
          className="D(f) Ai(c) Jc(fs) Trsdu(1s) Trsp(a) Trstf(e)"
          style={{
            transform: `translateX(${-1 * currentIndex * 400}px)`,
          }}
        >
          {images.map(({ link, id, data, type, name }) => (
            <div
              key={id}
              className="M($xxs) Bdrs($xxs) Bd($bdblue):h"
              onClick={e => onImageClick(e, link || data)}
            >
              {type === 'image' && (
                <img
                  src={link || data}
                  className="W($10x) H($10x) Bdrs($xxs)"
                />
              )}
              {type === 'application/pdf' && (
                <div className="W($10x) H($10x) Bdrs($xxs) Ff($ffmanrope) Fz($sm) Bd($bdinputGrey) P($xs)">
                  {name.length <= 65 ? name : name.slice(0, 62) + '...'}
                </div>
              )}
            </div>
          ))}
          {/* {remaining.map(o => (
            <div
              key={o}
              className="W($10x) H($10x) M($xxs) Bdrs($xxs) Bgc(white)"
            />
          ))} */}
        </div>
      </div>
      <BaseIcon
        icon="showmore"
        iconClasses={commonIconStyle + ' Rotate(-90deg)'}
        fill={imageCount4 ? 'white' : 'black'}
        onClick={onNextClick}
      />
      <Modal
        isOpen={!isEmpty(currentImage)}
        onRequestClose={() => setCurrentImage('')}
        className={`W($61xl) M(a) H($fc) Pos(r) T($deci) Bd(n) O(n)`}
        overlayClassName="Bgc($modal) Pos(f) T(0) Start(0) B(0) End(0)"
      >
        <ImagePreview
          image={currentImage}
          onCancel={() => setCurrentImage('')}
        />
      </Modal>
    </div>
  );
};

const DraftPortfolio = ({ project, loopKey, onEdit, mode }) => {
  return (
    <div className="Ff($ffopensans) Lh(1)" key={loopKey}>
      <div className="D(f) Ai(fs) Jc(sb)">
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

const Portfolio = ({ portfolio, onEdit, onAdd }) => {
  if (isEmpty(portfolio)) return null;
  return (
    <DisplayCard
      heading="Portfolio"
      topRightIcon="simpleadd"
      onClickIcon={onAdd}
    >
      {portfolio.map(
        ({ project, from, duration, description, images, order, mode }, i) =>
          mode === 'completed' ? (
            <div
              className="Ff($ffopensans) Lh(1)"
              key={project.replace(/ /g, '') + i}
            >
              <div className="D(f) Ai(fe) Jc(s)">
                <div className="Fw($fwsemibold) Mend($md) Fz($smx) W(69%)">
                  {project}
                </div>
                <div className="Fz($smd) W($quarter) Ta(e)">
                  {from} {duration ? ', ' + duration + ' mon' : ''}
                </div>
                <BaseIcon
                  icon="edit"
                  width="28px"
                  height="28px"
                  iconClasses="Bdrs($half) Bgc($navBarBg):h P($xxs) C($inputGrey) Mstart($lg)"
                  onClick={() => onEdit(i)}
                />
              </div>
              <div className="Mt($md) Mb($lg)">{description}</div>
              <PortfolioScroll
                images={images}
                onNext={() => {}}
                onBack={() => {}}
              />
            </div>
          ) : (
            <DraftPortfolio
              project={project}
              mode={mode}
              loopKey={project.replace(/ /g, '') + i}
              onEdit={() => onEdit(i)}
            />
          ),
      )}
    </DisplayCard>
  );
};

Portfolio.propTypes = {
  portfolio: PropTypes.array,
  onEdit: PropTypes.func,
  onAdd: PropTypes.func,
};

export default Portfolio;
