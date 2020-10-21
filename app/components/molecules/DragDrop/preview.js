import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import BaseIcon from 'components/atoms/BaseIcon';
import { classnames } from 'utils/helper';
import get from 'lodash/get';
import FileLoading from 'Assets/gifs/file-loading.gif';
const FilePreview = ({ onRemove, data, success, onload }) => {
  const [loading, setLoading] = useState(true);
  const [removed, setRemoved] = useState(false);
  const classes = classnames({
    'Bgc($navBarBg)': true,
    'Bdrs($3xs)': true,
    'D(f)': true,
    'Ai(c)': true,
    'Jc(sb)': true,
    'Mx($sm)': true,
    'My($xms)': true,
    'Op(1)': !removed,
    'Op(0)': removed,
    'Trsdu(0.3s)': true,
    'Trsp(a)': true,
    'Trstf(e)': true,
  });
  console.log('PREVIEW COMPONENT ', success);
  return (
    <div className={classes}>
      <div className="Ff($ffmanrope) Fz($sm) C($headingDarkGrey) P($xs)">
        {data.name}
      </div>
      {success ? (
        <BaseIcon
          icon="close"
          iconClasses="W($mmd) Bxz(cb) P($xxs) Bdrs($half) C($headingDarkGrey) Bgc($hoverInput):h M($xms)"
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            setRemoved(true);
            setTimeout(onRemove, 300);
          }}
        />
      ) : (
        <img src={FileLoading} className="W($mmd) M($xms)" />
      )}
    </div>
  );
};

FilePreview.defaultProps = {
  onload: params => {
    console.log('loading ', params);
  },
  success: false,
};

export default FilePreview;
