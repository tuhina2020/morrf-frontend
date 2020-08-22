import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import BaseIcon from 'components/atoms/BaseIcon';
import { classnames } from 'utils/helper';
import get from 'lodash/get';
const FilePreview = ({ onRemove, data, onload }) => {
  const [loading, setLoading] = useState(true);
  const [src, setSrc] = useState();
  const [removed, setRemoved] = useState(false);
  const loadData = (localdata = data) => {
    if (!localdata || get(localdata, 'id') || get(localdata, 'link')) {
      return;
    }
    const reader = new FileReader();
    const type = (() => {
      if (localdata.type.match('text')) {
        return 'text';
      } else if (localdata.type.match('image')) {
        return 'image';
      } else {
        return localdata.type;
      }
    })();

    reader.onload = e => {
      const src = e.target.result;
      setSrc(src);
      setLoading(false);
    };
    useEffect(() => {
      onload({ name: localdata.name, data: src });
    }, [src]);
    if (type === 'text') {
      reader.readAsText(localdata);
    } else if (type === 'image') {
      reader.readAsDataURL(localdata);
    } else {
      setSrc(false);
      setLoading(false);
    }
  };
  loadData();
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
  return (
    <div className={classes}>
      <div className="Ff($ffmanrope) Fz($sm) C($headingDarkGrey) P($xs)">
        {data.name}
      </div>
      <BaseIcon
        icon="close"
        iconClasses="W($xss) H($xss) Bxz(cb) P($xxs) Bdrs($half) C($headingDarkGrey) Bgc($hoverInput):h M($sm)"
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          setRemoved(true);
          setTimeout(onRemove, 300);
        }}
      />
    </div>
  );
};

FilePreview.defaultProps = {
  onload: params => {
    console.log('loading ', params);
  },
};

export default FilePreview;
