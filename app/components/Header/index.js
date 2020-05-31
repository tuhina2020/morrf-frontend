import { morrflogo as MorrfLogo } from 'Assets/svg-comp';
import React from 'react';
import { Link } from 'react-router-dom';
export default function Header() {
  return (
    <div className="Bdb($bdGrey)">
      <div className="D(f) Jc(s) Ai(e) Py(2vw) Px(1vw) Trsdu(0.5s) Trsp(a) Trstf(e)">
        <Link to="/">
          <MorrfLogo
            width="10vw"
            className="Mstart(7vw) Trsdu(0.5s) Trsp(a) Trstf(e)"
          />
        </Link>
        <div className="Fw($fwregular) Fz(2vw) Mstart(2vw) Trsdu(0.5s) Trsp(a) Trstf(e)">
          Design Made Easy
        </div>
      </div>
    </div>
  );
}
