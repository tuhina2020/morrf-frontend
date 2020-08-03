import * as React from 'react';

function SvgCheck(props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
    </svg>
  );
}

export default SvgCheck;
