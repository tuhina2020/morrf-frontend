import React, { useState } from 'react';
import { morrflogo as MorrfLogo, showmore as ShowMore } from 'Assets/svg-comp';

import { getTransitionClass } from 'utils/helper';
import MovingDots from 'components/MovingDots';
import CallBackForm from 'components/organisms/LiteForms/CallBackForm/index';
import RequestForm from 'components/organisms/LiteForms/RequestForm/index';
import Button from 'components/molecules/Button';
import { Link } from 'react-router-dom';
import LiteCard from 'components/molecules/LiteCard';
import Gradient from 'Assets/images/Gradient_BG.png';
import Splash from 'Assets/images/Splash_BG.png';
import menuHeader from 'Assets/images/Menu_Header.png';

const MobilePage = ({
  specialistList,
  scrolled,
  onClickShowMore,
  secondPage,
}) => {
  const [callBackForm, setCallBackForm] = useState(false);
  return (
    <div>
      <div className="W($full) H($5xl) D(f) Fld(r) Jc(sb) Pstart(7.2vw) Pend(1.8vw) Ai(c)">
        <div className="D(f) Ai(c)">
          <MorrfLogo className="W(172px)" />
          <div
            className={`Bdend($bdlightGrey) ${'Pt(2.5vw)'} Pstart($lg) Mend($lg)`}
          />
          <div className={`Ff($ffmanrope) Fw($fwregular) Fz($fztitle)`}>
            Design Made Easy
          </div>
        </div>
        <Button kind="tertiary" size="8xl">
          <div className="Ff($ffmanrope) W($8xl) Fw($fwregular) Fz($button)">
            FAQ
          </div>
        </Button>
      </div>
      <div className="Ff($ffmanrope) D(f) Mt($5x) Fld(c) Ai(c) W($full) Jc(c) Mb($lg)">
        <div className="Fz(64px) Mb($sm)">
          Looking for a freelance designer?
        </div>
        <div className="Fz($desktopTitle)">
          Drop your details and we will find the best pick for you
        </div>
      </div>

      <div className="Pb($2xl)">
        {callBackForm ? (
          <CallBackForm
            isDesktopOrLaptop={false}
            setCallBackForm={setCallBackForm}
          />
        ) : (
          <RequestForm
            isDesktopOrLaptop={false}
            setCallBackForm={setCallBackForm}
            specialistList={specialistList}
          />
        )}
      </div>

      <div className="Bgc($navBarBg) Pb($5xl)">
        <div className="Ff($ffmanrope) D(f) Ai(c) Jc(c) Fz($xl) Pt($2xl)">
          How is Morff different
        </div>
        {
          <div className="Mt(2vw) D(f) Ai(c) Jc(c) Fld(c)">
            <div
              className={`Bdrs(2.5vw) W(5vw) H(5vw) Mx(47.5%) Bxsh($bxshlightInset):h ${getTransitionClass(
                0.4,
              )} ${scrolled ? 'Op(0)' : ''}`}
            >
              <ShowMore width="5vw" height="5vw" onClick={onClickShowMore} />
            </div>
            <div
              className={`${getTransitionClass(2)} Trsde(0.5s) ${
                scrolled ? 'Pos(r) B(3vw)' : 'Op(0)'
              }`}
            >
              <MovingDots />
            </div>
          </div>
        }
        {scrolled ? (
          <div ref={secondPage}>
            <div className="D(f) Ai(s) Jc(c) Flw(w)">
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
            <div className="W(810px) Ta(c) M(a) D(f) Fld(c) Pt($lg)">
              <div className="Fw($fwmedium) Ff($ffmanrope) Ta(c) Fz($xl) Lh(44px) Mb($xl)">
                About Us
              </div>
              <div className="Fw($fwregular) Ff($ffopensans) Ta(c) Fz($fzmessage)">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                mollis turpis augue, nec ultrices ipsum maximus a. Quisque leo
                metus, lobortis ac mattis sed, cursus ut nisl. Nulla ut eros
                quam. Curabitur quis nisi erat. Phasellus vel pharetra tellus.
                Nam et nulla viverra, commodo velit pellentesque, consequat
                nulla. Integer iaculis, ipsum quis tincidunt commodo, urna nisi
                sollicitudin ipsum, ut euismod risus erat non tortor. Aenean
                posuere tincidunt sapien a maximus. Fusce tempor egestas
                volutpat. Proin dictum risus nec mi luctus, sit amet elementum
                sapien sollicitudin. Morbi interdum tincidunt blandit. Phasellus
                vel varius justo. Maecenas elit dolor, tempus at neque lacinia,
                lobortis molestie augue. Phasellus pulvinar, ex vitae dapibus
                vulputate, metus eros aliquet velit, vel ultrices mauris ante
                hendrerit tellus. Proin a luctus ex. Quisque quis.
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <div className="H($12xl) Bgc(#555555) D(f) Jc(sb) Ai(c) Pstart(15vw) Pend(7.5vw)">
        <div>
          <div className="Fz($fztitle) Ff($ffmanrope) C(white)">
            Like to know more?
          </div>
          <div className="Ff($ffmanrope) C(white) Fz(15px)">
            Reach us at:{' '}
            <Link to="mailto : contact@morff.io" className="Td(n) C(white)">
              contact@morff.io
            </Link>
          </div>
          <div className="Ff($ffmanrope) C($placeholderGrey) Fz(15px)">
            © 2020 Morff
          </div>
        </div>
        <div className="Ff($ffmanrope) Fz($fztitle) C(white)">
          Officially recognised by DIIPT, India
        </div>
      </div>
    </div>
  );
};

export default MobilePage;
