import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import PropTypes from 'prop-types';
import KYCPage from 'containers/KYCPage/index.js';
import ProfilePage from 'containers/ProfilePage/index.js';
import KycDetails from 'templates/KycDetails/desktop';
import { morff as Morff } from 'Assets/svg-comp';
import isEmpty from 'lodash/isEmpty';
import Button from 'components/molecules/Button';
import { compose } from 'redux';
import { connect } from 'react-redux';

const TabsDetails = ({ viewOnly, onClick, logout }) => {
  // const logger = () => {return <KYCPage logoutAction />;};
  const buttonProps = {
    iconDescription: 'sign in with google',
    alignContent: 'center',
    kind: 'tertiary',
    size: '10x',
  };
  return (
    <div className="Bgc($navBarBg) Mih(100vh)">
      <Tabs>
        <TabList>
          <div>
            <div className="D(f) Flb(f) F(o) Mend($lg) Miw($60xl) P(1vw)">
              <div className=" Pt(2.5vw) Pstart($lg) Mend($lg)" />
              <Morff width="50px" height="48px" />
              <div className="Bdend($bdlightGrey) Pt(2.5vw) Pstart($lg) Mend($lg)" />
              <div className="Fw($fwregular) Ff($ffmanrope) Fz($lg)">
                Designer
              </div>
              <div className="D(f) Bdb($bdtabBlue) Ff($ffmanrope) Fz($md) C($iconBlue)  Py($xs) Px($lg)  Mstart($10x)">
                <Tab>Profile Details</Tab>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Tab>KYC Details</Tab>
              </div>
              <div className="Pos(a) End(10px)">
                <Button onClick={logout} {...buttonProps}>
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </TabList>

        <TabPanel>
          <ProfilePage />
        </TabPanel>
        <TabPanel>
          <KYCPage />
        </TabPanel>
      </Tabs>
    </div>
  );
};
TabsDetails.propTypes = {
  viewOnly: PropTypes.bool,
};

TabsDetails.defaultProps = {
  viewOnly: false,
};
export default TabsDetails;
