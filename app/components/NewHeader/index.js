import { morrflogo as MorrfLogo } from 'Assets/svg-comp';
import React, { useEffect, useState } from 'react';
import { getTransitionClass } from 'utils/helper';
import Button from 'components/molecules/Button';

export default function NewHeader({
  isDesktopOrLaptop,
  bgImg,
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
      className={`Pos(f) T(0) W($full) Op(1) Z(3) H($5xl) ${padding} ${!bgImg &&
        !bgc &&
        'Bgc(#d4d4d4)'} ${getTransitionClass(2)} ${
        headerShadow ? 'Bxsh($bxshnavBar)' : ''
      }`}
      style={{
        backgroundImage: bgImg && `url(${bgImg})`,
        backgroundSize: bgImg && 'cover',
        backgroundColor: !bgImg && bgc,
      }}
    >
      <div
        className={`D(f) H($5xl) ${
          screen.width > 900
            ? 'Jc(sb) P(1vw)'
            : 'Jc(c) Py(3vw) Mstart(5vw) Mend(12vw)'
        } Ai(c)`}
      >
        <div className="D(f) Ai(c) Jc(c)">
          <MorrfLogo
            width={isDesktopOrLaptop ? null : '33vw'}
            height={isDesktopOrLaptop ? '40px' : null}
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
              isDesktopOrLaptop ? 'Fz($mmd)' : 'Fz($smd)'
            }`}
          >
            Design Made Easy
          </div>
        </div>
        {isDesktopOrLaptop && (
          <div>
            <Button
              {...buttonProps}
              onClick={() =>
                window.open('https://support.morff.io/freelancers')
              }
            >
              Join as a Freelancer
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
