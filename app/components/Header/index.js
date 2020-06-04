import { morrflogo as MorrfLogo } from 'Assets/svg-comp';
import React from 'react';
export default function Header() {
  return (
    <div className="Pos(f) T(0) W(100%) Op(1) Z(2) Bgc($navBarBg)">
      <div className="D(f) Jc(s) Ai(c) P(1vw)">
        <MorrfLogo width="11vw" className="Mstart(3.6vw)" />
        <div className="Pt(2.5vw) Pstart(1.8vw) Mend(1.8vw) Bdend($bdlightGrey)" />
        <div className="Fw($fwregular) Fz($fzsubheading)">Design Made Easy</div>
      </div>
    </div>
  );
}
