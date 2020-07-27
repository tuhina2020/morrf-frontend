import * as React from 'react';

function SvgClock(props) {
  return (
    <svg viewBox="0 0 25 25" {...props}>
      <path d="M12.5 0A12.5 12.5 0 1025 12.5 12.517 12.517 0 0012.5 0zm0 2.174A10.326 10.326 0 112.174 12.5 10.31 10.31 0 0112.5 2.174zm-.119 3.244a1.126 1.126 0 00-.968 1.1v5.978a1.13 1.13 0 001.087 1.087h4.891a1.087 1.087 0 100-2.174h-3.8V6.522a1.134 1.134 0 00-1.21-1.104z" />
    </svg>
  );
}

export default SvgClock;
