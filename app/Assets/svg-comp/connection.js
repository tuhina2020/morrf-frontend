import * as React from 'react';

function SvgConnection(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16.304 15" {...props}>
      <defs>
        <style>{'.connection-cs1-1 {fill: #000122;}'}</style>
      </defs>
      <path
        id="Connection_Icon"
        data-name="Connection Icon"
        className="connection-cs1-1"
        d="M20.37,9a2.938,2.938,0,0,0-2.916,2.609h-4.6A2.937,2.937,0,1,0,11.1,14.628l2.326,4.07a2.935,2.935,0,1,0,3.456,0l2.326-4.071A2.934,2.934,0,1,0,20.37,9Zm-4.054,9.372a2.921,2.921,0,0,0-2.327,0L11.663,14.3a2.934,2.934,0,0,0,1.188-2.041h4.6A2.934,2.934,0,0,0,18.642,14.3Z"
        transform="translate(-7 -9)"
      />
    </svg>
  );
}

export default SvgConnection;
