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

const BankDetailsScroll = ({
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
debugger;

const BankDetails = ({
  bankDetailss,
  onAdd,
  onPreviewImage,
  onEdit,
  viewOnly,
}) => {
  // const { holderName, bankName, accountNumber, ifscCode } = bankDetails;
  if (isEmpty(bankDetailss))
    return (
      <DisplayCard heading="Bank Details">
        <div className="D(f) Ai(c) Jc(fs) Ff($ffopensans) Fz($md)">
          <div className="W($full)">
            <div className="D(f) Fxd(r) Jc(fs)">
              <div className="Fz($md) My($xms)">
                Required to manage your payouts
              </div>
              <div className="Fz($smd) My($xms) Mx($2xl)">
                <BaseIcon
                  icon="add"
                  width="26px"
                  height="26px"
                  fill="#0000FF"
                  onClick={onAdd}
                />
                Add Bank Account
              </div>
            </div>
          </div>
        </div>
      </DisplayCard>
    );
  // debugger;
  return (
    <div className="Bdrs($xs) Bgc(white) W($60xl) H(fc)">
      <DisplayCard
        heading="Bank Details"
        topRightIcon={!viewOnly && 'simpleadd'}
        onClickIcon={onAdd}
      >
        {bankDetailss.map(
          (
            {
              holder_name,
              bank_name,
              account_number,
              ifsc_code,
              upi_code,
              files,
              order,
              mode,
            },
            i,
          ) => (
            <div className="D(f) Ai(c) Jc(fs) Ff($ffopensans) Fz($md)">
              <div className="W($full)">
                <div className="Fw($fwbold) Fz($smx) Lh(1) Mb($xs)">
                  Account Details
                  {!viewOnly && (
                    <BaseIcon
                      icon="edit"
                      width="28px"
                      height="28px"
                      iconClasses="Fl(end) Bdrs($xs) Bgc($navBarBg):h P($xxs) C($inputGrey) Mstart($lg)"
                      onClick={() => onEdit(i)}
                    />
                  )}
                </div>
                <div className="D(f) Fxd(c) Flw(w) Jc(fs)">
                  <div className="Fz($smd) My($xms)">
                    Name as per bank account : {holder_name}
                  </div>
                  <div className="Fz($smd) Mend($xs) My($xms)">
                    Account No : {account_number}
                  </div>
                  <div className="Fz($smd) Mend($xs) My($xms)">
                    IFSC code : {ifsc_code}
                  </div>
                  <div
                    className="Fz($smd) Mend($xs) My($xms)"
                    key={bank_name + i}
                  >
                    Bank Name : {bank_name}
                  </div>
                  <div className="Fz($smd) Mend($xs) My($xms)">
                    UPI code : {upi_code}
                  </div>
                  <BankDetailsScroll
                    files={files}
                    onNext={() => {}}
                    onBack={() => {}}
                    onPreviewImage={onPreviewImage}
                  />
                </div>
              </div>
            </div>
          ),
        )}
      </DisplayCard>
    </div>
  );
};

BankDetails.propTypes = {
  bankDetailss: PropTypes.array,
  onEdit: PropTypes.func,
  onAdd: PropTypes.func,
  viewOnly: PropTypes.bool,
};

BankDetailsScroll.defaultProps = {
  files: [],
  viewOnly: false,
};
export default BankDetails;
