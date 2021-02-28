import React from 'react';
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Tabs, TabLink, TabContent } from 'react-tabs-redux';
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
  const [color, setColor] = React.useState('');
  const styles = {
    tabLink: {
      display: 'inline-block',
      height: '40px',
      paddingRight: '50px',
      paddingLeft: '50px',
      fontSize: '16px',
      border: 'none',
      borderBottom: '2px solid #c6c6c6',
      background: 'transparent',
      outline: 'none',
      color: color,
      '&:hover': {
        background: 'blue',
      },
    },
    activeLinkStyle: {
      display: 'inline-block',
      cursor: 'pointer',
      borderBottom: '2px solid blue',
      background: 'transparent',
      border: 'none',
      outline: 'none',
      boxShadow: 'none',
      inline: 'none',
      color: 'blue',
    },
  };
  const buttonProps = {
    iconDescription: 'sign in with google',
    alignContent: 'center',
    kind: 'tertiary',
    size: '10x',
  };
  return (
    <div className="Bgc($navBarBg) Mih(100vh)">
      <Tabs activeLinkStyle={styles.activeLinkStyle}>
        <div>
          <div className="D(f) Flb(f) F(o)  Miw($60xl) P(1vw) Bdb($bddarkGrey)">
            <div className=" Pt(2.5vw) Pstart($lg) Mend($lg)" />
            <Morff width="50px" height="48px" />
            <div className="Bdend($bdlightGrey) Pt(2.5vw) Pstart($lg) Mend($lg)" />
            <div className="Fw($fwregular) Ff($ffmanrope) Fz($lg)">
              Designer
            </div>
            <div className="D(f) Ff($ffmanrope) Fz($md) C($iconBlue)  Py($xs) Px($lg)  Mstart($10x)">
              <TabLink
                to="tab1"
                style={styles.tabLink}
                onMouseEnter={() => setColor('grey')}
                onMouseLeave={() => setColor('')}
                default
              >
                Profile Details
              </TabLink>
              <TabLink
                to="tab2"
                style={styles.tabLink}
                onMouseEnter={() => setColor('grey')}
                onMouseLeave={() => setColor('')}
              >
                KYC Details
              </TabLink>
            </div>
            <div className="Pos(a) End(10px)">
              <Button onClick={logout} {...buttonProps}>
                Logout
              </Button>
            </div>
          </div>
        </div>
        <TabContent for="tab1">
          <ProfilePage />
        </TabContent>
        <TabContent for="tab2">
          {' '}
          <KYCPage />
        </TabContent>
      </Tabs>
    </div>
    /*
    <div className="Bgc($navBarBg) Mih(100vh)">
      <Tabs activeLinkStyle={styles.activeLinkStyle}>
        <div>
          <div className="D(f) Flb(f) F(o) Mend($lg) Miw($60xl) P(1vw)">
            <div className=" Pt(2.5vw) Pstart($lg) Mend($lg)" />
            <Morff width="50px" height="48px" />
            <div className="Bdend($bdlightGrey) Pt(2.5vw) Pstart($lg) Mend($lg)" />
            <div className="Fw($fwregular) Ff($ffmanrope) Fz($lg)">
              Designer
            </div>
            <div className="D(f) Bdb($bdtabBlue) Ff($ffmanrope) Fz($md) C($iconBlue)  Py($xs) Px($lg)  Mstart($10x)">
              <TabLink to="Profile Details" style={styles.tabLink}>
                Profile Details
              </TabLink>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <TabLink to="KYC Details" style={styles.tabLink}>
                KYC Details
              </TabLink>
            </div>
            <div className="Pos(a) End(10px)">
              <Button onClick={logout} {...buttonProps}>
                Logout
              </Button>
            </div>
          </div>
        </div>
        <div style={styles.content}>
          <TabContent for="Profile Details">
            <ProfilePage />
          </TabContent>
          <TabContent for="KYC Details">
            <KYCPage />
          </TabContent>
        </div>
      </Tabs>
    </div>
    */
  );
};
TabsDetails.propTypes = {
  viewOnly: PropTypes.bool,
};

TabsDetails.defaultProps = {
  viewOnly: false,
};
export default TabsDetails;
