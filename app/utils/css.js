export const COMING_SOON_INPUT_BOX_STYLES = {
  labelStyle: 'C($themeColor) Fz(0.6vw)',
  placeholderStyle: {
    active: 'C($themeColor):ph',
    inactive: 'C($lightGrey)::ph',
    common: 'Ff($ffmont)::ph Fz($fzcaption)::ph',
  },
  inputClass:
    'Bd(n) W(100%) Pb(0.2vw) Ff($ffmont) Fz($fzcaption) C($themeColor):h::ph Op(1)::ph',
  submitStyle: {
    inactive: 'Bd($bdprimaryDarkGrey) C($primaryDarkGrey) Bgc(white)',
    active:
      'Bd($bdthemeColor) C($primaryDarkGrey) Bd($bdthemeColor):h C($themeColor):h Bgc(white)',
    clicked: 'C(white) Bgc($themeColor) Bd(n)',
    common: 'Bdrs(0.2vw) W(5vw) H(2vw) Ff($ffmont) Fz($fzcaption)',
    success: 'Bdrs(0.2vw) Px(1vw) Py(0.5vw) Ff($ffmont) Fz($fzcaption)',
  },
};

export const INPUT_FIELD_DETAILS = [
  {
    key: 'name',
    stateKey: 'name',
    type: 'name',
    fieldType: 'name',
    validationObj: {
      alphabetRegex: {
        errorMsg: 'Numbers not allowed in name',
        priority: 2,
      },
      minLength: {
        size: 6,
        priority: 1,
        errorMsg: 'Enter atleast six letters.',
      },
    },
    style: 'W(30%)',
    placeholder: 'Name',
  },
  {
    key: 'email',
    type: 'email',
    stateKey: 'email',
    validationObj: {
      emailRegex: {
        errorMsg: 'Invalid Email Id',
        priority: 1,
      },
      minLength: {
        size: 0,
        priority: 2,
        errorMsg: 'Enter atleast one letter.',
      },
    },
    fieldType: 'email',
    dataType: 'email',
    style: 'W(70%)',
    placeholder: 'Email address',
  },
];
