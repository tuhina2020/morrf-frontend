import React, { useState } from 'react';
import MobilePage from 'components/organisms/LitePage/mobile';
import DesktopPage from 'components/organisms/LitePage/desktop';

const LitePage = ({ responsiveData }) => {
  const { isDesktopOrLaptop } = responsiveData;

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

  const props = {
    specialistList,
  };

  return isDesktopOrLaptop ? (
    <DesktopPage {...props} />
  ) : (
    <MobilePage {...props} />
  );
};

export default LitePage;
