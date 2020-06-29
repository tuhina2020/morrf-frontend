import React, { useEffect } from 'react';
import Button from 'components/molecules/Button';
import PropTypes from 'prop-types';
import { useScript } from 'utils/hooks';
import { FIREBASE_CONFIG } from 'utils/constants';

const setUpFirebase = () => {
  try {
    if (firebase && firebase.apps.length > 0) return;
  } catch (error) {
    const cbInit = () => {
      firebase.initializeApp(FIREBASE_CONFIG.default);
    };

    const cbAuth = () => {
      // firebase
      //   .auth()
      //   .getRedirectResult()
      //   .then(function(result) {
      //     console.log(result);
      //   })
      //   .catch(function(error) {
      //     console.log(error);
      //   });
    };

    useScript(
      'https://www.gstatic.com/firebasejs/7.15.4/firebase-app.js',
      cbInit,
    );

    useScript(
      'https://www.gstatic.com/firebasejs/7.15.4/firebase-auth.js',
      cbAuth,
    );
  }
};

const desktopSignIn = () => {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
      console.log(JSON.stringify(result));
    })
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
      // ...
    });
};

const GoogleLogin = ({ size, tabIndex, text }) => {
  setUpFirebase();

  const buttonProps = {
    iconDescription: 'sign in with google',
    alignContent: 'center',
    kind: 'secondary',
    size,
    tabIndex,
    renderIcon: 'google',
    onClick: desktopSignIn,
  };

  return (
    <Button {...buttonProps}>
      <div>{text}</div>
    </Button>
  );
};

GoogleLogin.propTypes = {
  text: PropTypes.string.isRequired,
  tabIndex: PropTypes.number.isRequired,
  size: PropTypes.string.isRequired,
};

GoogleLogin.defaultProps = {
  text: 'Login with your Google account',
  tabIndex: 3,
  size: 'full',
};

export default GoogleLogin;
