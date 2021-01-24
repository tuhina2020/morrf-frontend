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
import { Link } from 'react-router-dom';
import LiteCard from 'components/molecules/LiteCard';
import Gradient from 'Assets/images/lite/Gradient_BG.png';
import HeadingBg from 'Assets/images/lite/heading.png';
import menuHeader from 'Assets/images/Header.png';
import BaseIcon from 'components/atoms/BaseIcon/index';
import Button from 'components/molecules/Button/index';
import Steps from './steps';
import Awesomeness from './awesomeness';
import NewHeader from 'components/NewHeader';
const DesktopPage = ({
  sendEmail,
  callbackReq,
  success,
  resetParentForm,
  allProfessionTypes,
  isDesktopOrLaptop,
}) => {
  const [callBackForm, setCallToggle] = useState(false);
  const secondPage = useRef(null);
  const [scrolled, setScrollStatus] = useState(false);
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

  const props = {
    isDesktopOrLaptop,
    setCallToggle,
    success,
    initName: name,
    setName,
    resetParentForm,
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
  const professionArr = allProfessionTypes.map(p => p.name);
  useEffect(() => {
    const visibleProfession =
      professionArr[Math.floor(Math.random() * professionArr.length)];
    const intro = setInterval(() => {
      setProfession(visibleProfession);
    }, 2000);
    return () => {
      clearInterval(intro);
    };
  });
  return (
    <>
      <NewHeader isDesktopOrLaptop={true} bgImg={HeadingBg} padding="Px(6%)" />
      <div
        className="Pos(r) T(71px) Bgr(nr)"
        style={{
          backgroundImage: `url(${Gradient})`,
          backgroundPosition: 'center top',
          backgroundSize: 'cover',
        }}
      >
        <div className="Ff($ffmanrope) D(f) Pt($5x) Fld(c) Ai(c) W($full) Jc(c) Mb($lg)">
          <div className="Fz($4xl) Ta(c) Mb($sm)">
            Looking for a freelance{' '}
            <ReactTextTransition
              text={profession}
              spring={presets.molasses}
              style={{ margin: '0 4px' }}
              direction="down"
              overflow
              inline
            />{' '}
            designer?
          </div>
          <div className="Fz($fzdesktopTitle)">
            Drop your details and we will find the best pick for you
          </div>
        </div>

        <div ref={formRef} className="Pb($xl)">
          {callBackForm ? (
            <CallBackForm callbackReq={callbackReq} {...props} />
          ) : (
            <RequestForm
              {...props}
              sendEmail={sendEmail}
              allProfessionTypes={allProfessionTypes}
            />
          )}
        </div>
      </div>
      <div className="Pos(r) T($5xl)">
        <div className="Bgc($navBarBg)">
          <div className="Ff($ffmanrope) D(f) Ai(c) Jc(c) Fz($xxl) Pt($2xl)">
            What makes us awesome!
          </div>
          <div className="Mt(2vw) D(f) Ai(c) Jc(c) Fld(c)">
            <div
              className={`Bdrs(2.5vw) Mx(a) Bxsh($bxshlightInset):h ${getTransitionClass(
                0.4,
              )} ${scrolled ? 'Op(0)' : ''}`}
            >
              <ShowMore width="2vw" height="2vw" onClick={onClickShowMore} />
            </div>
            <div
              className={`H(1vw) ${getTransitionClass(2)} Trsde(0.5s) ${
                scrolled ? 'Pos(r) B(3vw)' : 'Op(0)'
              }`}
            >
              <MovingDots margin="Mt(0)" />
            </div>
          </div>
          <Awesomeness />
          <div className="Bg($lite) Ff($ffmanrope) C(white) Py($xl) My($xl) Ta(c)">
            <div className="Fz($xxl)">Want to hire a freelance designer?</div>
            <div className="Fz($mmd)">Here’s a simple and efficient way</div>
          </div>
          <Steps />
          <div className="Mx(a) W(fc) Bgc(i) Mb($2xl)">
            <Button {...anotherReqButton}>Drop a project request</Button>
          </div>
          <div className="Bgc(white)">
            <div className="W(810px) Ta(c) M(a) D(f) Fld(c) Pt($lg)">
              <div className="Fw($fwmedium) Ff($ffmanrope) Ta(c) Fz($xxl) Mb($lg)">
                About Us
              </div>
              <div className="Fw($fwregular) Ff($ffopensans) Ta(c) Fz($mmd)">
                <div className="Mb($xl)">
                  We are a team that is passionate to change the way businesses
                  use design. Our mission is to make Design easy, reliable and
                  approachable.
                </div>
                <div className="Mb($xl)">
                  Our team consists of people at the top of their careers (read
                  as IIT and NID Alumni) working together to cater to a great
                  need. Morff is built out of our own experience in the design
                  and business world. Trying to make one small change at a time.
                </div>
                <div className="Mb($xl)">
                  We’re an enthusiastic bunch that likes having deep
                  conversations regarding design systems, psychology, social
                  behaviour, tech.. well, you get the gist! We are motivated by
                  the current changing times and the needs of the new world.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="Bgc($footer) C(white)">
          <div className="H($12xl) D(f) Jc(s) Ai(c) Mx($11xl) Ff($ffmanrope)">
            <div className="W($quarter)">
              <div className="Fz($fztitle)">Like to know more?</div>
              <div className="Fz($smd)">
                Reach us at :{' '}
                <a href="mailto:care@morff.io" className="Td(n) C(white)">
                  care@morff.io
                </a>
              </div>
            </div>
            <div className="Ta(c) W($full)">
              <Morff className="W($5x) H($xl)" />
              <div className="Fz($smd) C($placeholderGrey) Mb($lg)">
                A recognised startup by DPIIT, Govt. of India
              </div>
            </div>
            <div className="W($quarter)">
              <div className="Ta(end) D(f) Ai(c) Jc(fe)">
                <div
                  className="Pend($xxs) Cur(p)"
                  onClick={() =>
                    window.open('https://www.linkedin.com/company/morff-io')
                  }
                >
                  <BaseIcon icon="linkedin" width="32px" height="32px" />
                </div>
                <div
                  className="Pend($xxs) Cur(p)"
                  onClick={() =>
                    window.open('https://www.instagram.com/morff.io/')
                  }
                >
                  <BaseIcon icon="instagram" width="32px" height="32px" />
                </div>
              </div>
            </div>
          </div>
          <div className="D(f) Ai(c) Jc(c) Fz($md) Py($xs) Mx($10x) Bdt($bdsolidLightestGray) Ff($ffmanrope)">
            <div className="C($placeholderGrey)">© 2020 Morff</div>
            <a href="/privacy" className="Td(n) C(white) Mx($3xl)">
              Privacy Policy
            </a>
            <a href="/termsofuse" className="Td(n) C(white) Mx($lg)">
              Terms of Use
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default DesktopPage;
