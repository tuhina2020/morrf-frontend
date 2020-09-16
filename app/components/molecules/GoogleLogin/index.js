import React from 'react';
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

    useScript('https://apis.google.com/js/platform.js', () => {
      gapi.load('auth2', () => {
        if (!gapi.auth2.getAuthInstance()) {
          gapi.auth2.init({
            client_id:
              '347844392363-bj2s360ni6d7tud7fhagh2rdd4mk5rhh.apps.googleusercontent.com',
            fetch_basic_profile: true,
            scope: 'profile',
          });
        }
      });
    });

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

const desktopSignIn = ({ signInApi }) => {
  const auth2 = gapi.auth2.getAuthInstance();
  auth2
    .grantOfflineAccess()
    .then(authResult => {
      console.log(authResult);
      if (auth2.isSignedIn.get()) {
        var profile = auth2.currentUser.get().getBasicProfile();
        const email = profile.getEmail();
        const firstName = profile.getGivenName();
        const lastName = profile.getFamilyName();
        // console.log('ID: ' + profile.getId());
        // console.log('Full Name: ' + profile.getName());
        // console.log('Given Name: ' + profile.getGivenName());
        // console.log('Family Name: ' + profile.getFamilyName());
        // console.log('Image URL: ' + profile.getImageUrl());
        // console.log('Email: ' + email);
        console.log({
          email,
          firstName,
          lastName,
        });
        signInApi({
          email,
          firstName,
          lastName,
          ...authResult,
        });
      }
    })
    .catch(error => {
      console.log(error);
    });
};

const firebaseSignin = ({ signInApi, checkUser }) => {
  const auth2 = gapi.auth2.getAuthInstance();
  // const options = {
  //   // prompt: 'Are you sure?',
  // };
  // auth2.signIn(options).then(googleUser => {
  //   var profile = googleUser.getBasicProfile();
  //   console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  //   console.log('Name: ' + profile.getName());
  //   console.log('Image URL: ' + profile.getImageUrl());
  //   console.log('Email: ' + profile.getEmail());
  // });
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('profile');
  provider.addScope('email');
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
      const refreshToken = user.refreshToken;
      console.log(user);
      // debugger;
      const email = user.email;
      // const { given_name: firstName, family_name: lastName } = user;
      checkUser({ email, refreshToken });
    })
    .catch(function(error) {
      checkUser({ error });
    });
};

const setUpGapi = ({ ref }) => {
  useScript('https://apis.google.com/js/platform.js', () => {
    gapi.load('auth2', () => {
      if (!gapi.auth2.getAuthInstance()) {
        gapi.auth2.init({
          client_id:
            '347844392363-bj2s360ni6d7tud7fhagh2rdd4mk5rhh.apps.googleusercontent.com',
          fetch_basic_profile: true,
          scope: 'profile',
        });
      }
    });
  });
};

const GoogleLogin = ({ size, tabIndex, text, signInApi, checkUser }) => {
  const buttonProps = {
    iconDescription: 'sign in with google',
    alignContent: 'center',
    kind: 'secondary',
    size,
    tabIndex,
    prependIcon: 'google',
    // 'data-onsuccess': desktopSignIn,
    onClick: () => firebaseSignin({ signInApi, checkUser }),
  };
  setUpFirebase();

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
  signInApi: PropTypes.func,
};

GoogleLogin.defaultProps = {
  text: 'Login with your Google account',
  tabIndex: 3,
  size: 'full',
  signInApi: () => {},
};

export default GoogleLogin;
