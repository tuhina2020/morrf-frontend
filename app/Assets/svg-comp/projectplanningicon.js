import * as React from 'react';

function SvgProjectplanningicon(props) {
  return (
    <svg viewBox="0 0 27.581 28" {...props}>
      <defs>
        <style>
          {
            '.projectb{fill:none;stroke:#000122;stroke-linecap:round;stroke-width:2px}'
          }
        </style>
      </defs>
      <path
        d="M1.5 1.5v25"
        strokeWidth={3}
        fill="none"
        stroke="#000122"
        strokeLinecap="round"
      />
      <path className="projectb" d="M8 4h16.969M9.575 14h11.216M15 24h11.581" />
    </svg>
  );
}

export default SvgProjectplanningicon;
