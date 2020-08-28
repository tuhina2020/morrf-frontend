import React from 'react';
import BaseIcon from 'components/atoms/BaseIcon';
const ImagePreview = ({ image, onCancel }) => {
  return (
    <div className="Pos(r)">
      <BaseIcon
        icon="close"
        iconClasses="W($xl) H($xl) Bxz(cb) P($xxs) Bdrs($half) C(white) Bgc($inputGrey):h M($sm) Pos(a) Start(89%)"
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          setTimeout(onCancel, 300);
        }}
      />
      <img src={image} className="W($full)" />
    </div>
  );
};

export default ImagePreview;
