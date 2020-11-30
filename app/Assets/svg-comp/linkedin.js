import * as React from 'react';

function SvgLinkedin(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
      <defs>
        <style>{'.a{fill:#fff;}.b{fill:none;}'}</style>
      </defs>
      <path
        className="a"
        d="M26.21,4H5.79A1.78,1.78,0,0,0,4,5.73V26.2a1.77,1.77,0,0,0,1.79,1.73H26.21A1.77,1.77,0,0,0,28,26.2V5.73A1.78,1.78,0,0,0,26.21,4ZM11.11,24.41H7.59V13h3.52Zm-1.72-13A2.07,2.07,0,0,1,7.32,9.39,2,2,0,0,1,9.39,7.32a2.07,2.07,0,0,1,0,4.13ZM24.48,24.34H21V18.76c0-1.33,0-3.06-1.86-3.06S17,17.16,17,18.63v5.65H13.44V13h3.32v1.5h.07a3.72,3.72,0,0,1,3.39-1.86c3.59,0,4.26,2.4,4.26,5.45Z"
      />
      <rect className="b" width={32} height={32} />
    </svg>
  );
}

export default SvgLinkedin;
