export const COMING_SOON_INPUT_BOX_STYLES = 1;

export const getInputBoxStyles = isDesktopOrLaptop => ({
  labelStyle: {
    inactive: `C($placeholderGrey) C($primary):h ${
      isDesktopOrLaptop ? 'H(1.5vw) Fz($fzbody)' : 'Fz($fzlarge) H(6vw)'
    }`,
    active: `C($primary) ${
      isDesktopOrLaptop
        ? 'H(1.5vw) Fz($fzcaption)'
        : 'Fz($fzmobilesubheading) H(6vw)'
    }`,
  },
  inputClass: `Bd(n) W(100%) Pb(0.2vw) Ff($ffmont) ${
    isDesktopOrLaptop ? 'Fz($fzcaption)' : 'Fz($fzlarge)'
  } C($primary):h::ph Op(1)::ph`,
  submitStyle: {
    inactive: `Bd($bddisabledGrey) C($disabledGrey) Bgc(white)`,
    active: isDesktopOrLaptop
      ? 'Bd($bdthemeColor) C($primary) Bgc(white) C($disabledGrey) Bd($bdthemeColor):h C($primary):h'
      : 'Bd($bdthemeColor) C($primary) Bgc(white) C($disabledGrey)',
    clicked: 'C(white) Bgc($primary) Bd($bdthemeColor) Mb(1vw)',
    common: isDesktopOrLaptop
      ? 'Fz($fzbody) Px(1vw) Py(0.5vw) Bdrs(0.2vw) Ff($ffmont) Mb(1vw)'
      : 'Fz($fzlarge) Mx(22vw) Mt(5vw) Py(4vw) Bdrs(1vw) Ff($ffmont)',
    success: `Ff($ffmont) ${
      isDesktopOrLaptop
        ? 'Fz($fzbody) Bdrs(0.2vw) Px(1vw) Py(0.5vw)'
        : 'Fz($fzlarge) Bdrs(1vw) Py(4vw) Px(8vw)'
    }`,
  },
});

export const getInputFieldDetails = isDesktopOrLaptop => [
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
        size: 3,
        priority: 1,
        errorMsg: 'Enter atleast three letters.',
      },
      maxAllowedLength: {
        size: 20,
        priority: 1,
        errorMsg: 'Atmost 20 letters are allowed',
      },
    },
    style: isDesktopOrLaptop ? 'W(30%)' : '',
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
    style: isDesktopOrLaptop ? 'W(70%)' : '',
    placeholder: 'Email address',
  },
];

export const FLEX_CENTER_CENTER = 'D(f) Ai(c) Jc(c)';
export const FLEX_CENTER_END = 'D(f) Ai(c) Jc(e)';
export const HIDDEN_STYLE = {
  NO_HEIGHT: 'Op(0) Z(-1) H(0)',
  WITH_HEIGHT: 'Op(0) Z(-1)',
};
export const DOTS_STYLE = desktop =>
  desktop
    ? 'W(0.5vw) H(0.5vw) Bdrs(50%) Bgc(black) Mx(0.5vw)'
    : 'W(2vw) H(2vw) Bdrs(50%) Bgc(black) Mx(6vw)';

export const buttonReset = `Bd(n) Va(bl) Cur(p)`;
