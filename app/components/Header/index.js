import { morrflogo as MorrfLogo } from 'Assets/svg-comp';
import React from 'react';
import { getTransitionClass } from 'utils/helper';
import Button from 'components/molecules/Button';
export default function Header({
  isDesktopOrLaptop,
  shadow,
  bgImg,
  height,
  padding,
  bgc,
  logout,
  logoutAction,
}) {
  const buttonProps = {
    iconDescription: 'sign in with google',
    alignContent: 'center',
    kind: 'secondary',
    size: '10x',
    onClick: logoutAction,
  };
  return (
    <div
      className={`Pos(f) T(0) W(100%) Op(1) Z(2) ${padding} ${!bgImg &&
        !bgc &&
        'Bgc(#d4d4d4)'} ${getTransitionClass(2)} ${
        shadow ? 'Bxsh($bxshnavBar)' : ''
      }`}
      style={{
        height,
        backgroundImage: bgImg && `url(${bgImg})`,
        backgroundSize: bgImg && 'cover',
        backgroundColor: !bgImg && bgc,
      }}
    >
      <div
        className={`D(f) ${
          isDesktopOrLaptop ? 'Jc(s) P(1vw)' : 'Jc(c) Py(5vw)'
        } Ai(c)`}
        style={{ height }}
      >
        <MorrfLogo
          width={isDesktopOrLaptop ? null : '33%'}
          height={isDesktopOrLaptop ? '90%' : null}
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
            isDesktopOrLaptop ? 'Fz($md)' : 'Fz($fzmobilesubheading)'
          }`}
        >
          Design Made Easy
        </div>
        {logout && (
          <div className="Pos(a) End(10px)">
            <Button {...buttonProps}>Logout</Button>
          </div>
        )}
      </div>
    </div>
  );
}
