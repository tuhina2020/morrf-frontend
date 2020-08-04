import * as React from 'react';

function SvgPmicon(props) {
  return (
    <svg viewBox="0 0 16 20" {...props}>
      <defs>
        <style>
          {
            '.Complete_PM_Icon_cls-1 {fill: none;stroke: #000122;stroke-linecap: round;}    '
          }
        </style>
      </defs>
      <g
        id="Complete_PM_Icon"
        data-name="Complete PM Icon"
        transform="translate(52.803 -15.69) rotate(90)"
      >
        <path
          id="Path_162"
          data-name="Path 162"
          className="Complete_PM_Icon_cls-1"
          d="M0,0V14"
          transform="translate(16.19 37.303) rotate(-90)"
        />
        <path
          id="Path_163"
          data-name="Path 163"
          className="Complete_PM_Icon_cls-1"
          d="M0,0V19"
          transform="translate(16.19 45.303) rotate(-90)"
        />
        <path
          id="Path_164"
          data-name="Path 164"
          className="Complete_PM_Icon_cls-1"
          d="M0,0V9"
          transform="translate(16.19 52.303) rotate(-90)"
        />
      </g>
    </svg>
  );
}

export default SvgPmicon;
