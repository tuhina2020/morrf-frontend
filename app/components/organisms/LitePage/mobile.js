import React, { useState, useRef, useEffect } from 'react';
import ReactTextTransition, { presets } from 'react-text-transition';
import {
  morrflogo as MorrfLogo,
  showmore as ShowMore,
  morff as Morff,
} from 'Assets/svg-comp';

import { getTransitionClass, scrollTo, scrollToElement } from 'utils/helper';
import MovingDots from 'components/MovingDots';
import CallBackForm from 'components/organisms/LiteForms/CallBackForm/index';
import RequestForm from 'components/organisms/LiteForms/RequestForm/index';
import Button from 'components/molecules/Button';
import { Link } from 'react-router-dom';
import LiteCard from 'components/molecules/LiteCard';
import Gradient from 'Assets/images/lite/Gradient_BG.png';
import menuHeader from 'Assets/images/Header.png';
import BaseIcon from '../../atoms/BaseIcon/index';
import Steps from './steps';
import Awesomeness from './awesomeness';
import NewHeader from 'components/NewHeader';
import HeadingBg from 'Assets/images/lite/heading.png';
const MobilePage = ({
  allProfessionTypes,
  isDesktopOrLaptop,
  sendEmail,
  callbackReq,
  success,
}) => {
  const [callBackForm, setCallToggle] = useState(false);
  const secondPage = useRef(null);
  const [scrolled, setScrollStatus] = useState(false);
  const [headerShadow, setHeaderShadow] = useState(false);
  const [name, setName] = useState('');
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

  const formRef = useRef(null);
  const anotherReqButton = {
    iconDescription: 'again',
    alignContent: 'center',
    kind: 'secondary',
    type: 'button',
    onClick: () =>
      scrollToElement({
        element: formRef.current,
        offset: 0,
        duration: 500,
      }),
  };

  const [profession, setProfession] = useState('"Marketing"');
  const [index, setIndex] = useState(0);
  const professionArr = allProfessionTypes.map(p => p.name);
  useEffect(() => {
    const intro = setInterval(() => {
      let newIndex = Math.floor(Math.random() * professionArr.length);
      newIndex =
        newIndex === index ? (newIndex + 1) % professionArr.length : newIndex;
      const visibleProfession = professionArr[newIndex];
      setProfession(visibleProfession);
      setIndex(newIndex);
    }, 2000);
    return () => {
      clearInterval(intro);
    };
  });
  const buttonProps = {
    iconDescription: 'sign in with google',
    alignContent: 'center',
    kind: 'primary',
    size: '50x',
  };

  return (
    <>
      <NewHeader isDesktopOrLaptop={false} />
      {/* <img src={Splash} className="Pos(a) Z(-1) W($full) T(0)" /> */}
      <div
        className="Bgr(nr) Pos(r) T($5xl)"
        style={{
          backgroundImage: `url(${Gradient})`,
          backgroundPosition: 'center top',
          backgroundSize: 'cover',
        }}
      >
        <div className="Px($mmd) Ta(start) Ff($ffmanrope) Fw($fwmedium) D(f) Pt($lg) Fld(c) Ai(c) W($full) Jc(c) Mb($lg)">
          <div className="Pb($lg)">
            <Button
              {...buttonProps}
              onClick={() =>
                window.open('https://support.morff.io/freelancers')
              }
            >
              Join as a Freelancer
            </Button>
          </div>
          <div className="Fz($xl) Mb($md)">
            Looking for a freelance{' '}
            <ReactTextTransition
              text={profession}
              // spring={presets.molasses}
              direction="up"
            />
            designer?
          </div>
          <div className="Fz($smx)">
            Drop your details and we will find the best pick for you
          </div>
        </div>

        <div className="Pb($2xl)" ref={formRef}>
          {callBackForm ? (
            <CallBackForm
              isDesktopOrLaptop={isDesktopOrLaptop}
              setCallToggle={setCallToggle}
              callbackReq={callbackReq}
              success={success}
            />
          ) : (
            <RequestForm
              isDesktopOrLaptop={isDesktopOrLaptop}
              setCallToggle={setCallToggle}
              allProfessionTypes={allProfessionTypes}
              sendEmail={sendEmail}
              success={success}
              setName={setName}
            />
          )}
        </div>
      </div>
      <div className="Bgc($navBarBg) Pos(r) T($5xl)">
        <div className="Ff($ffmanrope) D(f) Fw($fwmedium) Ai(c) Jc(c) Fz($lmg) Pt($lg) Ta(c)">
          What makes us awesome!
        </div>
        <div className="Mt(2vw) D(f) Ai(c) Jc(c) Fld(c)">
          <div
            className={`Bdrs(2.5vw) W(5vw) H(5vw) Mx(47.5%) Bxsh($bxshlightInset):h ${getTransitionClass(
              0.4,
            )} ${scrolled ? 'Op(0)' : ''}`}
          >
            <ShowMore width="10vw" height="10vw" onClick={onClickShowMore} />
          </div>
          <div
            className={`${getTransitionClass(2)} Trsde(0.5s) ${
              scrolled ? 'Pos(r) B(3vw)' : 'Op(0)'
            }`}
          >
            <MovingDots />
          </div>
        </div>
        <Awesomeness mobile={true} />
        <div className="Bg($lite) Ff($ffmanrope) C(white) Py($xl) Ta(c)">
          <div className="Fz($lg)">Want to hire a freelance designer?</div>
          <div className="Fz($smd)">Here’s a simple and efficient way</div>
        </div>
        <Steps mobile={true} />
        <div className="Mx(a) W(fc) Bgc(i) Pb($2xl)">
          <Button {...anotherReqButton}>Drop a project request</Button>
        </div>
      </div>
      <div className="W($full) Ta(c) Mx(a) Bgc(white) Mt($xxl) Pos(r) T($5xl)">
        <div className="Fw($fwmedium) Ff($ffmanrope) Ta(c) Fz($lg)">
          About Us
        </div>
        <div className="Fw($fwregular) Ff($ffopensans) Ta(c) Fz($smd) P($mmd)">
          <div className="Mb($lg)">
            We are a team that is passionate to change the way businesses use
            design. Our mission is to make Design easy, reliable and
            approachable.
          </div>
          <div className="Mb($lg)">
            Our team consists of people at the top of their careers (read as IIT
            and NID Alumni) working together to cater to a great need. Morff is
            built out of our own experience in the design and business world.
            Trying to make one small change at a time.
          </div>
          <div className="Mb($lg)">
            We’re an enthusiastic bunch that likes having deep conversations
            regarding design systems, psychology, social behaviour, tech.. well,
            you get the gist! We are motivated by the current changing times and
            the needs of the new world.
          </div>
        </div>
      </div>
      <div className="Bgc($footer) Px($mmd) Py($sm)">
        <div className="Fz($mmd) Ff($ffmanrope) C(white)">
          Like to know more?
        </div>
        <div className="Ff($ffmanrope) C(white) Fz($smd) Mb($lg)">
          Reach us at:
          <a href="mailto:care@morff.io" className="Td(n) C(white)">
            care@morff.io
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
        <div className="Ta(c)">
          <Morff className="W($5x) H($xl)" />
          <div className="Fz($smd) C($placeholderGrey) Mb($lg) Ff($ffmanrope)">
            Officially recognised by DIIPT, India
          </div>
        </div>
        <div className="D(f) Ai(c) Jc(c) Fz($xss) Bdt($bdsolidLightestGray) Ff($ffmanrope) C(white) Py($xs)">
          <div className="C($placeholderGrey)">© 2020 Morff</div>
          <a href="/privacy" className="Td(n) C(white) Mx($lg)">
            Privacy Policy
          </a>
          <a href="/termsofuse" className="Td(n) C(white) Mx($lg)">
            Terms of Use
          </a>
        </div>
      </div>
    </>
  );
};

export default MobilePage;
