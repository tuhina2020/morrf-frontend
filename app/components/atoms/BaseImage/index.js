import React from 'react';
import PropTypes from 'prop-types';

const Image = React.forwardRef((props, ref) => {
  const { onClick, imageClasses, parentClass, src, text } = props;

  return (
    <div className={parentClass}>
      {src && <img src={src} onClick={onClick} className={imageClasses} />}
      {!src && text && <div className={imageClasses}>{text}</div>}
    </div>
  );
});

Image.defaultProps = {
  width: '100px',
  height: '100px',
  parentClass:
    'W($10x) H($10x) Bgc($navBarBg) D(f) Ai(c) Jc(c) Ff($ffmanrope) Fw($fwsemibold) Fz($5xl) C($iconBlue)',
};

export default Image;
