import React, { useRef } from 'react';
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

    // useScript(
    //   'https://www.gstatic.com/firebasejs/7.15.4/firebase-app.js',
    //   cbInit,
    // );

    // useScript(
    //   'https://www.gstatic.com/firebasejs/7.15.4/firebase-auth.js',
    //   cbAuth,
    // );
  }
};

const desktopSignIn = ({ signInApi }) => {
  const auth2 = gapi.auth2.getAuthInstance();
  auth2
    .grantOfflineAccess()
    .then(authResult => {
      console.log(authResult);
      signInApi(authResult);
    })
    .catch(error => {
      console.log(error);
    });
};

//   const options = {
//     // prompt: 'Are you sure?',
//   };
//   auth2.signIn(options).then(googleUser => {
//     var profile = googleUser.getBasicProfile();
//     console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
//     console.log('Name: ' + profile.getName());
//     console.log('Image URL: ' + profile.getImageUrl());
//     console.log('Email: ' + profile.getEmail());
//   });
//   var provider = new firebase.auth.GoogleAuthProvider();
//   provider.addScope(‘profile’);
//   provider.addScope(‘email’);
//   firebase
//     .auth()
//     .signInWithPopup(provider)
//     .then(function(result) {
//       var token = result.credential.accessToken;
//       var user = result.user;
//       console.log(JSON.stringify(result));
//     })
//     .catch(function(error) {
//       var errorCode = error.code;
//       var errorMessage = error.message;
//       var email = error.email;
//       var credential = error.credential;
//       // ...
//     });
// };

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

const GoogleLogin = ({ size, tabIndex, text, signInApi }) => {
  const buttonProps = {
    iconDescription: 'sign in with google',
    alignContent: 'center',
    kind: 'secondary',
    size,
    tabIndex,
    prependIcon: 'google',
    // 'data-onsuccess': desktopSignIn,
    onClick: () => desktopSignIn({ signInApi }),
  };
  const ref = useRef(null);

  setUpGapi({ ref });

  return (
    <Button {...buttonProps} ref={ref}>
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
