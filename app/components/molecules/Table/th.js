import React from 'react';
const Th = ({ headers, totalWidth }) => {
  return (
    <div className="Px($lg) Py($sm) Bdb($bdcardGrey) D(f) Ai(c) Ff($ffmanrope) Fz($md)">
      {headers.map(header => {
        const width = (header.width * 100) / totalWidth + '%';
        return (
          <div key={header.key} style={{ width }} className="Mx($xxs)">
            {header.heading}
          </div>
        );
      })}
    </div>
  );
};

export default Th;
