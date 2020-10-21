import React from 'react';
import Button from 'components/molecules/Button';
import PropTypes from 'prop-types';
import { useScript } from 'utils/hooks';
import { FIREBASE_CONFIG } from 'utils/constants';
import isEmpty from 'lodash/isEmpty';

// const setUpFirebase = () => {
//   try {
//     if (firebase && firebase.apps.length > 0) return;
//   } catch (error) {
//     const cbInit = () => {
//       firebase.initializeApp(FIREBASE_CONFIG.default);
//     };

//     const cbAuth = () => {
//       // firebase
//       //   .auth()
//       //   .getRedirectResult()
//       //   .then(function(result) {
//       //     console.log(result);
//       //   })
//       //   .catch(function(error) {
//       //     console.log(error);
//       //   });
//     };

//     useScript('https://apis.google.com/js/platform.js', () => {
//       gapi.load('auth2', () => {
//         if (!gapi.auth2.getAuthInstance()) {
//           gapi.auth2.init({
//             client_id:
//               '347844392363-bj2s360ni6d7tud7fhagh2rdd4mk5rhh.apps.googleusercontent.com',
//             fetch_basic_profile: true,
//             scope: 'profile',
//           });
//         }
//       });
//     });

//     useScript(
//       'https://www.gstatic.com/firebasejs/7.15.4/firebase-app.js',
//       cbInit,
//     );

//     useScript(
//       'https://www.gstatic.com/firebasejs/7.15.4/firebase-auth.js',
//       cbAuth,
//     );
//   }
// };

// const desktopSignIn = ({ signInApi }) => {
//   const auth2 = gapi.auth2.getAuthInstance();
//   auth2
//     .grantOfflineAccess()
//     .then(authResult => {
//       console.log(authResult);
//       if (auth2.isSignedIn.get()) {
//         const profile = auth2.currentUser.get().getBasicProfile();
//         const email = profile.getEmail();
//         const firstName = profile.getGivenName();
//         const lastName = profile.getFamilyName();
//         // console.log('ID: ' + profile.getId());
//         // console.log('Full Name: ' + profile.getName());
//         // console.log('Given Name: ' + profile.getGivenName());
//         // console.log('Family Name: ' + profile.getFamilyName());
//         // console.log('Image URL: ' + profile.getImageUrl());
//         // console.log('Email: ' + email);
//         console.log({
//           email,
//           firstName,
//           lastName,
//         });
//         signInApi({
//           email,
//           firstName,
//           lastName,
//           ...authResult,
//         });
//       }
//     })
//     .catch(error => {
//       console.log(error);
//     });
// };

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
  const provider = new firebase.auth.GoogleAuthProvider();
  let refreshToken;
  provider.addScope('profile');
  provider.addScope('email');
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function(result) {
      const token = result.credential.accessToken;
      const { user } = result;
      refreshToken = user.refreshToken;
      const { email } = user;
      // const { given_name: firstName, family_name: lastName } = user;
      checkUser({ email, refreshToken });
    });
  // .then(signInApi);
};

const setUpGapi = () => {
  useScript('https://apis.google.com/js/platform.js', () => {
    gapi.load('auth2', () => {
      const GoogleAuth = gapi.auth2.getAuthInstance();
      if (GoogleAuth) {
        gapi.auth2.init({
          client_id:
            '347844392363-bj2s360ni6d7tud7fhagh2rdd4mk5rhh.apps.googleusercontent.com',
          fetch_basic_profile: true,
          scope: 'profile id_token permission',
        });
      }
    });
  });
};

const googleSignin = ({ responseType = 'code', handleSigninSuccess }) => {
  const options = {
    prompt: 'consent',
  };
  const GoogleAuth = gapi.auth2.getAuthInstance();
  if (!GoogleAuth) return;
  if (responseType === 'code') {
    GoogleAuth.grantOfflineAccess(options).then(
      res => {
        console.log(res);
        // debugger;
        handleSigninSuccess(res);
      },
      err => {
        console.log(err);
        // debugger;
        // onFailure(err)
      },
    );
    // gapi.auth2.authorize(
    //   {
    //     client_id:
    //       '347844392363-bj2s360ni6d7tud7fhagh2rdd4mk5rhh.apps.googleusercontent.com',
    //     scope: 'email profile openid',
    //     response_type: 'id_token permission code',
    //   },
    //   function(response) {
    //     if (response.error) {
    //       // An error happened!
    //       console.log(err);
    //       debugger;
    //       return;
    //     }
    //     // The user authorized the application for the scopes requested.
    //     var accessToken = response.access_token;
    //     var idToken = response.id_token;
    //     console.log(err);
    //     debugger;
    //     // You can also now use gapi.client to perform authenticated requests.
    //   },
    // );
  } else {
    GoogleAuth.signIn(options).then(
      res => {
        console.log(res);
        handleSigninSuccess(res);
      },
      err => {
        console.log(err);
        // onFailure(err)
      },
    );
  }
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
    // onClick: () => firebaseSignin({ signInApi, checkUser }),
    onClick: () => googleSignin({ handleSigninSuccess: checkUser }),
  };
  // setUpFirebase();
  setUpGapi();

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
