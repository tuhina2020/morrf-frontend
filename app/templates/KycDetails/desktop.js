import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import Bankdetails from 'components/organisms/KycDetails/bankdetails';
import AddressDetails from 'components/organisms/KycDetails/address';
import PanDetails from 'components/organisms/KycDetails/pandetails';
import Signature from 'components/organisms/KycDetails/signature';
import Kycpage from 'components/organisms/KycDetails/kycpage';
import Kyckyc from 'components/organisms/KycDetails/kyckyc';
import isEmpty from 'lodash/isEmpty';
import Modal from 'react-modal';
import EditFormModal from './editModal';
import pick from 'lodash/pick';
import Header from 'components/molecules/Header';
import LoadingAnimation from 'Assets/gifs/loading.gif';
import { get } from 'lodash';

const KycDetails = ({
  kyc,
  removeBankDetails,
  removeAddress,
  removePan,
  uploadBankImageData,
  uploadaddressImageData,
  uploadPanImageData,
  uploadSignatureImageData,
  bankImages,
  panImage,
  addressImages,
  signatureImage,
  saveFunctionMap,
  removeBankImages,
  removeAddressImages,
  removeSignatureImage,
  removePanImage,
  setBankImages,
  setAddressImages,
  setPanImage,
  setSignatureImage,
  logout,
  loading,
  viewOnly,
}) => {
  const { bankDetailss, address, panDetails, signature } = kyc;
  const [blur, setBlur] = useState(loading);

  const[open, setOpen] = useState('');
  const [currentIndex, setIndex] = useState();
  const [source, setSourcePage] = useState('main');
  Modal.setAppElement('#app');
  const onCancelModal = () => {
    setOpen('');
    setSourcePage('main');
    setBlur(false);
  };
  const onCancelForm = () => {
    const getstarted = () => {
      setTimeout(() => {
        setOpen('getstarted');
        setSourcePage('getstarted');
        setBlur(true);
      }, 400);
    };
    const main = () => {
      setTimeout(() => {
        setOpen('');
        setBlur(false);
        setSourcePage('main');
      }, 400);
    };
    return source === 'getstarted' ? getstarted() : main();
  };
  const extraProps = {
    source,
    currentIndex,
    onClickAdd: setOpen,
    closeDialog: () => {
      setOpen('');
      setBlur(false);
    },
    uploadBankImageData,
    uploadaddressImageData,
    removeBankImages,
    removeAddressImages,
    removeBankDetails,
    removeAddress,
    removePan,
    uploadPanImageData,
    uploadSignatureImageData,
    removePanImage,
    removeSignatureImage,
    panImage:  get(panImage, 'image', ''),
    bankImages: get(bankImages, 'images', []),
    addressImages: get(addressImages, 'images', []),
    signatureImage: get(signatureImage, 'images', []),
  };
  const [scrolled, setScrollStatus] = useState(false);
  const [headerShadow, setHeaderShadow] = useState(false);
  const onScroll = () => {
    if (document.documentElement.scrollTop > 0) {
      setHeaderShadow(true);
    } else {
      setHeaderShadow(false);
    }
    if (
      document.documentElement.scrollTop > 100 ||
      (document.body.scrollTop > 100 && !scrolled)
    ) {
      setScrollStatus(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    if (isEmpty(open)) setBlur(loading);
  }, [loading]);

  const Loading = () => {
    return loading ? (
      <div className="W($full) H(100vw) Op(0.5) Bgc(white) Z(2)">
        <img
          src={LoadingAnimation}
          className="W($third) Mx(35%) Pos(r) T($20x)"
        />
      </div>
    ) : null;
  };

  console.log('BLUR IS', blur, loading);
  return (
    <div className="Bgc($navBarBg) Mih(100vh)">
      <Loading />
      <div className={`Z(1) ${blur ? 'Blur($xxs)' : undefined}`}>
        <div className={`D(f) Fxd(r) Flw(w) Mx($10x) Maw($full) Ai(s) Jc(s) P($lg)`}>
          <div className="D(f) Fxd(c) Flb(f) F(o) Mend($lg) Miw($60xl)">
            <AddressDetails
              address={address}
              onEdit={index => {
                console.log('EDITING');
                setIndex(index);
                setBlur(true);
                setSourcePage('main');
                setAddressImages({
                  images: address.files.map(file => ({
                    url: file.url,
                    id: file.id,
                  })),
                  id: address.id,
                  done: false,
                });
                setOpen('editAddress');
              }}
              onAdd={() => {
                console.log('ADDING');
                setIndex();
                setBlur(true);
                setSourcePage('main');
                setOpen('address');
              }}
              viewOnly={viewOnly}
            />
            <Signature
              signature={signature}
              onEdit={index => {
                console.log('EDITING');
                setIndex(index);
                setBlur(true);
                setSourcePage('main');
                setSignatureImage({
                  images: signature.files.map(file => ({
                    url: file.url,
                    id: file.id,
                  })),
                  done: false,
                });
                setOpen('editSignature');
              }}
              onAdd={() => {
                console.log('ADDING');
                setIndex();
                setBlur(true);
                setSourcePage('main');
                setOpen('signature');
              }}
              viewOnly={viewOnly}
            />
          </div>
          <div className="D(f) Fxd(c) Mend($lg) Miw($60xl)">
            <PanDetails
              panDetails={panDetails}
              onEdit={index => {
                console.log('EDITING');
                setIndex(index);
                setBlur(true);
                setSourcePage('main');
                setPanImage({
                  images: panDetails.files.map(file => ({
                    url: file.url,
                    id: file.id,
                  })),
                  done: false,
                });
                setOpen('editpanDetails');
              }}
              onAdd={() => {
                console.log('ADDING');
                setIndex();
                setBlur(true);
                setSourcePage('main');
                setOpen('panDetails');
              }}
              viewOnly={viewOnly}
            />
            <Bankdetails
              bankDetailss={bankDetailss}
              onEdit={index => {
                console.log('EDITING');
                setIndex(index);
                setBlur(true);
                setSourcePage('main');
                setBankImages({
                  images: bankDetailss[index].files.map(file => ({
                    url: file.url,
                    id: file.id,
                  })),
                  id: bankDetailss[index].id,
                  done: false,
                });
                setOpen('editbankDetails');
              }}
              onAdd={() => {
                console.log('ADDING');
                setIndex();
                setBlur(true);
                setSourcePage('main');
                setOpen('bankDetailss');
              }}
              viewOnly={viewOnly}
            />
          </div>
        </div>
      </div>
      {!viewOnly && (
        <Modal
          isOpen={!isEmpty(open)}
          contentLabel="onRequestClose Example"
          onRequestClose={onCancelModal}
          className="W($60xl) M(a) H($fc) Pos(r) T($5xl)  Bd(n) O(n)"
          overlayClassName="Bgc($modal) Pos(a) T(0) Start(0) B(0) End(0) W($full) H($full) Ov(h)"
        >
          <EditFormModal
            onCancel={onCancelForm}
            data={open === 'getstarted' ? kyc : kyc[open]}
            onSave={params => {
              saveFunctionMap[open](params);
              setBlur(true);
            }}
            open={open}
            {...extraProps}
          />
        </Modal>
      )}
    </div>
  );
};

KycDetails.propTypes = {
  kyc: PropTypes.object,
  saveFunctionMap: PropTypes.object,
  viewOnly: PropTypes.bool,
};

KycDetails.defaultProps = {
  viewOnly: false,
};

export default KycDetails;
