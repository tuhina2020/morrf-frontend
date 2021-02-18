import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import DisplayCard from 'components/molecules/DisplayCard';
import sortBy from 'lodash/sortBy';
import isEmpty from 'lodash/isEmpty';
import isNull from 'lodash/isNull';
import BaseIcon from 'components/atoms/BaseIcon';
import ImagePreview from 'components/molecules/ImagePreview';
import { classnames } from 'utils/helper';
import Modal from 'react-modal';
import LazyImage from 'components/molecules/LazyImg';

const AddressScroll = ({
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
      <div className="Ov(h) Maw($50xl)">
        <div
          className="D(f) Ai(c) Jc(fs) Trsdu(1s) Trsp(a) Trstf(e)"
          ref={newRef}
          style={{
            transform: `translateX(${-1 * currentIndex * 400}px)`,
          }}
        >
          {files.map(({ url, id, type }, index) => (
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
        className="W($60xl) M(a) H($fc) Pos(r) T($3xl) Bd(n) O(n)"
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
const AddressDetails = ({
  address,
  onAdd,
  onPreviewImage,
  onEdit,
  viewOnly,
}) => {
  const { line_1, line_2, city, state, pincode, proof_type, files } = address;
  if (isEmpty(line_1))
    return (
      <div className="Bdrs($xs) Bgc(white) W($60xl) H(fc)">
        <DisplayCard heading="Billing Details">
          <div className="D(f) Ai(c) Jc(fs) Ff($ffopensans) Fz($md)">
            <div className="W($full)">
              <div className="D(f) Fxd(r) Jc(fs)">
                <div className="Fz($md) My($xms)">
                  This address will be used in the invoices you raise
                </div>
                <div className="Fz($smd) My($xms) Mstart($xl)">
                  <BaseIcon
                    icon="add"
                    width="26px"
                    height="26px"
                    fill="#0000FF"
                    onClick={onAdd}
                  />
                  Add Address
                </div>
              </div>
            </div>
          </div>
        </DisplayCard>
      </div>
    );
  return (
    <div className="Bdrs($xs) Bgc(white) W($60xl) H(fc)">
      <DisplayCard
        heading="Billing Details"
        topRightIcon={!viewOnly ? 'edit' : ''}
        onClickIcon={onEdit}
        childPadding="Px($lg) Pt($sm)"
      >
        <div className="D(f) Ai(c) Jc(fs) Ff($ffopensans) Fz($md)">
          <div className="W($full)">
            <div className="Fw($fwbold) Fz($smx) Lh(1) Mb($xs)">
              Adress Details
            </div>
            <div className="D(f) Fxd(c) Flw(w) Jc(fs)">
              <div className="Fz($smd) My($xms)">{line_1}</div>
              <div className="Fz($smd) Mend($xs) My($xms)">{line_2}</div>
              <div className="Fz($smd) Mend($xs) My($xms)">{city}</div>
              <div className="Fz($smd) Mend($xs) My($xms)">{state}</div>
              <div className="Fz($smd) Mend($xs) My($xms)">{pincode}</div>
              <div className="Fz($smd) Mend($xs) My($xms)">{proof_type}</div>
              <AddressScroll
                files={files}
                onNext={() => {}}
                onBack={() => {}}
                onPreviewImage={onPreviewImage}
              />
            </div>
          </div>
        </div>
      </DisplayCard>
    </div>
  );
};

AddressDetails.propTypes = {
  address: PropTypes.object,
  onEdit: PropTypes.func,
  onAdd: PropTypes.func,
  viewOnly: PropTypes.bool,
};

AddressDetails.defaultProps = {
  viewOnly: false,
  onAdd: () => {},
  onEdit: () => {},
};
AddressScroll.defaultProps = {
  files: [],
  viewOnly: false,
};
export default AddressDetails;
