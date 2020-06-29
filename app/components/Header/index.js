import { morrflogo as MorrfLogo } from 'Assets/svg-comp';
import React from 'react';
import { getTransitionClass } from 'utils/helper';
export default function Header({ isDesktopOrLaptop, shadow }) {
  return (
    <div
      className={`Pos(f) T(0) W(100%) Op(1) Z(2) Bgc($navBarBg) ${getTransitionClass(
        2,
      )} ${shadow ? 'Bxsh($bxshnavBar)' : ''}`}
    >
      <div
        className={`D(f) ${
          isDesktopOrLaptop ? 'Jc(s) P(1vw)' : 'Jc(c) Py(5vw)'
        } Ai(c)`}
      >
        <MorrfLogo
          width={isDesktopOrLaptop ? '11vw' : null}
          height={isDesktopOrLaptop ? null : '10vw'}
          className="Mstart(3.6vw)"
        />
        <div
          className={`Bdend($bdlightGrey) ${
            isDesktopOrLaptop
              ? 'Pt(2.5vw) Pstart(1.8vw) Mend(1.8vw)'
              : 'Pt(5.5vw) Pstart(2.8vw) Mend(2.8vw)'
          }`}
        />
        <div
          className={`Fw($fwregular) ${
            isDesktopOrLaptop ? 'Fz($fzsubheading)' : 'Fz($fzmobilesubheading)'
          }`}
        >
          Design Made Easy
        </div>
      </div>
    </div>
  );
}
