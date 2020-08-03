import React, { useState, useEffect, useRef } from 'react';
import {
  morrflogo as MorrfLogo,
  showmore as ShowMore,
  curve as Curve,
} from 'Assets/svg-comp';

import { scrollTo, getTransitionClass, scrollToElement } from 'utils/helper';
import MovingDots from 'components/MovingDots';
import CallBackForm from '../../components/organisms/LiteForms/CallBackForm/index';
import RequestForm from '../../components/organisms/LiteForms/RequestForm/index';
import Button from '../../components/molecules/Button';

import LiteCard from '../../components/molecules/LiteCard';

const LitePage = ({ responsiveData }) => {
  const { isDesktopOrLaptop } = responsiveData;
  const secondPage = useRef(null);
  const [callBackForm, setCallBackForm] = useState(false);
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
    setTimeout(() => { }, 500);
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

  const getDesktopPage = () => {
    return (
      <div>
        <div
          style={{
            width: '100%',
            height: '72px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingLeft: '7.2vw',
            paddingRight: '1.1vw',
            alignItems: 'center',
          }}
        >
          <div className="D(f) Ai(c)">
            <MorrfLogo width="172px" height={null} />
            <div
              className={`Bdend($bdlightGrey) ${'Pt(2.5vw)'}`}
              style={{
                paddingLeft: '24px',
                marginRight: '24px',
              }}
            />
            <div
              className={`Ff($ffmanrope) Fw($fwregular)`}
              style={{
                fontSize: '20px',
              }}
            >
              Design Made Easy
            </div>
          </div>
          <Button style={{ width: '96px' }} kind="tertiary">
            {' '}
            <div className={`Ff($ffmanrope) Fw($fwregular) ${'Fz(14px)'}`}>
              FAQ
            </div>
          </Button>
        </div>
        <div
          className="Ff($ffmanrope)"
          style={{
            display: 'flex',
            marginTop: '50px',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'center',
            marginBottom: '24px',
          }}
        >
          <div
            style={{
              fontSize: '64px',
              marginBottom: '12px',
            }}
          >
            Looking for a freelance designer?
          </div>
          <div
            style={{
              fontSize: '24px',
            }}
          >
            Drop your details and we will find the best pick for you
          </div>
        </div>

        <div
          style={{
            paddingBottom: '48px',
          }}
        >
          {callBackForm ? (
            <CallBackForm
              isDesktopOrLaptop={isDesktopOrLaptop}
              setCallBackForm={setCallBackForm}
            />
          ) : (
              <RequestForm
                isDesktopOrLaptop={isDesktopOrLaptop}
                setCallBackForm={setCallBackForm}
              />
            )}
        </div>

        <div
          style={{
            backgroundColor: '#f5f5f5',
            paddingBottom: '72px',
          }}
        >
          <div
            className="Ff($ffmanrope)"
            style={{
              display: 'flex',
              alignContent: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              paddingTop: '48px',
            }}
          >
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
              <div
                style={{
                  display: 'flex',
                  alignItems: 'start',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                }}
              >
                <LiteCard
                  isDesktopOrLaptop={isDesktopOrLaptop}
                  title="Ease of finding reliable freelance"
                  description="With Morff you can be assured that the designers are well qualified and have a good work experience in their own professional domains."
                />
                <LiteCard
                  isDesktopOrLaptop={isDesktopOrLaptop}
                  title="Get help in preparing contracts"
                  description="Once you finalise on the designer you want to work with, it’s as easy as getting started with project as we will take care of your legal work such a drafting contracts etc."
                />

                <LiteCard
                  isDesktopOrLaptop={isDesktopOrLaptop}
                  title="Payment management"
                  description="We assure you payment protection through a govt. approved escrow service. Your payments will only go through if the project is fruitful."
                />

                <LiteCard
                  isDesktopOrLaptop={isDesktopOrLaptop}
                  title="Project management assistance"
                  description="We understand that design projects are a handful to manage, that is why we offer you a continuous handholding and support you through out your project."
                />
              </div>
              <div
                style={{
                  border: '1px solid #555555',
                  opacity: '1',
                  marginTop: '24px',
                  marginBottom: '24px',
                }}
              />
              <div
                style={{
                  width: '810px',
                  textAlign: 'center',
                  margin: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  paddingTop: '24px',
                }}
              >
                <div
                  className="Fw($fwmedium) Ff($ffmanrope)"
                  style={{
                    textAlign: 'center',
                    fontSize: '32px',
                    lineHeight: '44px',
                    marginBottom: '33px',
                  }}
                >
                  About Us
                </div>
                <div
                  className="Fw($fwregular) Ff($ffopensans)"
                  style={{
                    textAlign: 'center',
                    fontSize: '16px',
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                  mollis turpis augue, nec ultrices ipsum maximus a. Quisque leo
                  metus, lobortis ac mattis sed, cursus ut nisl. Nulla ut eros
                  quam. Curabitur quis nisi erat. Phasellus vel pharetra tellus.
                  Nam et nulla viverra, commodo velit pellentesque, consequat
                  nulla. Integer iaculis, ipsum quis tincidunt commodo, urna
                  nisi sollicitudin ipsum, ut euismod risus erat non tortor.
                  Aenean posuere tincidunt sapien a maximus. Fusce tempor
                  egestas volutpat. Proin dictum risus nec mi luctus, sit amet
                  elementum sapien sollicitudin. Morbi interdum tincidunt
                  blandit. Phasellus vel varius justo. Maecenas elit dolor,
                  tempus at neque lacinia, lobortis molestie augue. Phasellus
                  pulvinar, ex vitae dapibus vulputate, metus eros aliquet
                  velit, vel ultrices mauris ante hendrerit tellus. Proin a
                  luctus ex. Quisque quis.
                </div>
              </div>
            </div>
          ) : null}
        </div>
        <div
          style={{
            height: '128px',
            backgroundColor: '#555555',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ marginLeft: '15vw' }}>
            <div style={{ fontSize: '20px', color: '#FFFFFF' }}>
              Like to know more?
            </div>
            <div
              className="Ff($ffmanrope)"
              style={{ color: '#FFFFFF', fontSize: '15px' }}
            >
              Reach us at: contact@morff.io
            </div>
            <div
              className="Ff($ffmanrope)"
              style={{ fontSize: '15px', color: '#888888' }}
            >
              © 2020 Morff
            </div>
          </div>
          <div
            className="Ff($ffmanrope)"
            style={{ color: '#FFFFFF', fontSize: '20px' }}
          >
            Officially recognised by DIIPT, India
          </div>
        </div>
      </div>
    );
  };
  const getMobilePage = () => { };

  return isDesktopOrLaptop ? getDesktopPage() : getMobilePage();
};

export default LitePage;
