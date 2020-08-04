import React, { useState, useEffect, useRef } from 'react';
import { scrollTo, scrollToElement } from 'utils/helper';
import MobilePage from 'components/organisms/LitePage/mobile';
import DesktopPage from 'components/organisms/LitePage/desktop';

const LitePage = ({ responsiveData }) => {
  const { isDesktopOrLaptop } = responsiveData;
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

  const specialistList = [
    {
      id: '1',
      name: '1',
    },
    {
      id: '3',
      name: '3',
    },
    {
      id: '2',
      name: '2',
    },
  ];

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

  const props = {
    specialistList,
    scrolled,
    onClickShowMore,
    secondPage,
  };

  return isDesktopOrLaptop ? (
    <DesktopPage {...props} />
  ) : (
    <MobilePage {...props} />
  );
};

export default LitePage;
