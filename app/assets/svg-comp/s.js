import * as React from 'react';

function SvgS(props) {
  return (
    <svg width={48} height={1} viewBox="0 0 48 1" {...props}>
      <path d="M0 0h48v1H0z" fill="#063855" fillRule="evenodd" />
    </svg>
  );
}

export default SvgS;
