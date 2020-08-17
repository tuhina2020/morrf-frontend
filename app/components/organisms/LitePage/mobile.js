import React, { useState, useRef, useEffect } from 'react';
import { morrflogo as MorrfLogo, showmore as ShowMore } from 'Assets/svg-comp';

import { getTransitionClass, scrollTo, scrollToElement } from 'utils/helper';
import MovingDots from 'components/MovingDots';
import CallBackForm from 'components/organisms/LiteForms/CallBackForm/index';
import RequestForm from 'components/organisms/LiteForms/RequestForm/index';
import Button from 'components/molecules/Button';
import { Link } from 'react-router-dom';
import LiteCard from 'components/molecules/LiteCard';
import Gradient from 'Assets/images/Gradient_BG.png';
import Splash from 'Assets/images/Splash_BG.png';
import menuHeader from 'Assets/images/Menu_Header.png';
import BaseIcon from '../../atoms/BaseIcon/index';

const MobilePage = ({
  allProfessionTypes,
  isDesktopOrLaptop,
  sendEmail,
  callbackReq,
  success,
}) => {
  const [callToggle, setCallToggle] = useState(false);
  const secondPage = useRef(null);
  const [scrolled, setScrollStatus] = useState(false);
  const onScroll = () => {
    if (
      document.documentElement.scrollTop > 100 ||
      (document.body.scrollTop > 100 && !scrolled)
    ) {
      setScrollStatus(true);
    }
  };
  window.addEventListener('scroll', onScroll);

  useEffect(() => {
    setTimeout(() => {}, 500);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);
  const onClickShowMore = () => {
    setScrollStatus(!scrolled);
    const showMore = () => {
      const top = document.documentElement.scrollTop || document.body.scrollTop;
      if (top === 0)
        scrollToElement({
          element: secondPage.current,
          offset: 100,
          duration: 500,
        });
      else scrollTo({});
    };
    setTimeout(showMore, 200);
  };
  return (
    <>
      <div
        className="W($full) H($5xl) D(f) Jc(c) Ai(c) Bgr(nr) Bxz(pb)"
        style={{
          backgroundImage: `url(${menuHeader})`,
          backgroundPosition: 'center top',
        }}
      >
        <div className="D(f) W($full) Ai(c) Jc(c)">
          <MorrfLogo className="W(140px)" />
          <div
            className={`Bdend($bdlightGrey) Pstart($md) Mend($md)`}
            style={{
              paddingTop: '2.5vh',
            }}
          />
          <div className="Ff($ffmanrope) Fw($fwregular) Fz($fzmessage)">
            Design Made Easy
          </div>
        </div>
      </div>

      <div
        className="Bgr(nr)"
        style={{
          backgroundImage: `url(${Splash}),url(${Gradient})`,
          backgroundPosition: 'center top',
          backgroundSize: 'auto auto, 100% 100%',
        }}
      >
        <div className="Px($mmd) Ta(c) Ff($ffmanrope) Fw($fwmedium) D(f) Pt($lg) Fld(c) Ai(c) W($full) Jc(c) Mb($lg)">
          <div className="Fz($xl) Mb($md)">
            Looking for a freelance designer?
          </div>
          <div className="Fz($smx)">
            Drop your details and we will find the best pick for you
          </div>
        </div>

        <div className="Pb($2xl)">
          {callBackForm ? (
            <CallBackForm
              isDesktopOrLaptop
              setCallToggle={setCallToggle}
              callbackReq={callbackReq}
              success={success}
            />
          ) : (
            <RequestForm
              isDesktopOrLaptop
              setCallToggle={setCallToggle}
              allProfessionTypes={allProfessionTypes}
              sendEmail={sendEmail}
              success={success}
            />
          )}
        </div>
      </div>
      <div className="Bgc($navBarBg)">
        <div className="Ff($ffmanrope) D(f) Fw($fwmedium) Ai(c) Jc(c) Fz($lmg) Pt($lg)">
          How is Morff different
        </div>
        <div className="Pt($lg)" ref={secondPage}>
          <div className="D(f) Px($mmd) Ai(s) Jc(c) Flw(w)">
            <LiteCard
              isDesktopOrLaptop={false}
              title="Ease of finding reliable freelance"
              description="With Morff you can be assured that the designers are well qualified and have a good work experience in their own professional domains."
            />
            <LiteCard
              isDesktopOrLaptop={false}
              title="Get help in preparing contracts"
              description="Once you finalise on the designer you want to work with, it’s as easy as getting started with project as we will take care of your legal work such a drafting contracts etc."
            />

            <LiteCard
              isDesktopOrLaptop={false}
              title="Payment management"
              description="We assure you payment protection through a govt. approved escrow service. Your payments will only go through if the project is fruitful."
            />

            <LiteCard
              isDesktopOrLaptop={false}
              title="Project management assistance"
              description="We understand that design projects are a handful to manage, that is why we offer you a continuous handholding and support you through out your project."
            />
          </div>
          <div className="O(1) Mt($lg) Mb($lg) Bd($bdinputGrey)" />
          <div className="W($full) Px($mmd) Ta(c) Pb($2xl) D(f) Fld(c) Pt($lg)">
            <div className="Fw($fwmedium) Ff($ffmanrope) Ta(c) Fz($lmg) Lh(38px) Mb($xl)">
              About Us
            </div>
            <div className="Fw($fwregular) Ff($ffopensans) Ta(c) Fz($fzbutton) Lh($lg)">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
              mollis turpis augue, nec ultrices ipsum maximus a. Quisque leo
              metus, lobortis ac mattis sed, cursus ut nisl. Nulla ut eros quam.
              Curabitur quis nisi erat. Phasellus vel pharetra tellus. Nam et
              nulla viverra, commodo velit pellentesque, consequat nulla.
            </div>
          </div>
        </div>
      </div>
      <div className="H($20xl) Bgc($inputGrey) Px($mmd) Py($sm) D(f) Jc(fs) Ai(c)">
        <div className="W($20xl) D(f) Fld(c) Jc(fs) Ai(fs)">
          <div className="Fz($fzmessage) Ff($ffmanrope) C(white)">
            Like to know more?
          </div>
          <div className="Ff($ffmanrope) C(white) Fz($sm) Mb($lg)">
            Reach us at:
            <a href="mailto:contact@morff.io" className="Td(n) C(white)">
              contact@morff.io
            </a>
          </div>
          <div>
            <a
              href="https://www.linkedin.com/company/morff-io"
              className="Pend($xxs)"
            >
              <BaseIcon icon="linkedin" width="32px" height="32px" />
            </a>
            <a href="https://www.instagram.com/morff.io/">
              <BaseIcon icon="instagram" width="32px" height="32px" />
            </a>
          </div>
          <div className="Ff($ffmanrope) Fz($sm) C(white) Mb($md) Mt($lg)">
            Officially recognised by DIIPT, India
          </div>
          <div className="Ff($ffmanrope) C($placeholderGrey) Fz($fzlabel)">
            © 2020 Morff
          </div>
        </div>
      </div>
    </>
  );
};

export default MobilePage;
