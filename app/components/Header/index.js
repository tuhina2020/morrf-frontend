import { morrflogo as MorrfLogo } from 'Assets/svg-comp';
import React from 'react';
import { Link } from 'react-router-dom';
export default function Header() {
  return (
    <div className="D(f) Jc(s) Ai(e) Py(2vw) Px(1vw) Bdb($bdGrey)">
      <Link to="/">
        <MorrfLogo width="10vw" className="Mstart(7vw)" />
      </Link>
      <div className="Fw($fwregular) Fz(2vw) Mstart(2vw)">Design Made Easy</div>
    </div>
  );
}
