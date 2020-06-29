import React from 'react';
import PropTypes from 'prop-types';

function Icon({ icon, width, height, fill, iconClasses, ...props }) {
  if (!icon) return null;
  const RawSvg = require(`Assets/svg-comp/${icon}`).default;
  return (
    <RawSvg
      width={width}
      height={height}
      fill={fill}
      className={iconClasses}
      {...props}
    />
  );
}

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  fill: PropTypes.string,
};
export default Icon;
