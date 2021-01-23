import { morrflogo as MorrfLogo } from 'Assets/svg-comp';
import React, { useEffect, useState } from 'react';
import { getTransitionClass } from 'utils/helper';
import Button from 'components/molecules/Button';
export default function NewHeader({
  isDesktopOrLaptop,
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
    kind: 'primary',
    size: '50x',
  };
  const [headerShadow, setHeaderShadow] = useState(false);
  const onScroll = () => {
    if (document.documentElement.scrollTop > 0) {
      setHeaderShadow(true);
    } else {
      setHeaderShadow(false);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);
  return (
    <div
      className={`Pos(f) T(0) W($full) Op(1) Z(3) ${padding} ${!bgImg &&
        !bgc &&
        'Bgc(#d4d4d4)'} ${getTransitionClass(2)} ${
        headerShadow ? 'Bxsh($bxshnavBar)' : ''
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
          screen.width > 900 ? 'Jc(s) P(1vw)' : 'Jc(c) Py(5vw)'
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
          className={`Fw($fwregular) Ff($ffmanrope) ${
            isDesktopOrLaptop ? 'Fz($mmd)' : 'Fz($fzmobilesubheading)'
          }`}
        >
          Design Made Easy
        </div>
        <div className="Pos(a) End($20x)">
          <Button
            onClick={() => window.open('https://support.morff.co.in/')}
            {...buttonProps}
          >
            Join as a Freelancer
          </Button>
        </div>
      </div>
    </div>
  );
}
