export const EMAIL_VALIDATION_OBJ = [
  {
    errorMsg: 'Invalid Email Id',
    priority: 2,
    type: 'emailRegex',
  },
  {
    type: 'minLength',
    size: 0,
    priority: 1,
    errorMsg: 'Enter atleast one letter.',
  },
];

export const PASSWORD_VALIDATION_OBJ = [
  {
    size: 7,
    priority: 1,
    type: 'minLength',
    errorMsg: 'Password must be 8 characters long',
  },
  {
    regex: new RegExp(/[A-Z]/),
    priority: 2,
    type: 'genericRegex',
    errorMsg: 'Password must have atleast one capital letter',
  },
  {
    regex: new RegExp(/[a-z]/),
    priority: 3,
    type: 'genericRegex',
    errorMsg: 'Password must have atleast one small letter',
  },
  {
    regex: new RegExp(/[0-9]/),
    priority: 4,
    type: 'genericRegex',
    errorMsg: 'Password must have atleast one digit',
  },
  {
    size: 17,
    priority: 5,
    type: 'maxLength',
    errorMsg: 'Password must be less than 16 characters',
  },
];

export const EMAIL_LOGIN_STATES = {
  ENTER_EMAIL: 'ENTER_EMAIL',
  EXISTING_ENTER_PASSWORD: 'EXISTING_ENTER_PASSWORD',
  RESET_PASSWORD: 'RESET_PASSWORD',
  FORGOT_PASSWORD_MESSAGE: 'FORGOT_PASSWORD_MESSAGE',
  NEW_ENTER_PASSWORD: 'NEW_ENTER_PASSWORD',
  CREATE_ACCOUNT_MESSAGE: 'CREATE_ACCOUNT_MESSAGE',
  CONGRATULATIONS: 'CONGRATULATIONS',
};

export const EMAIL_LOGIN_FLOW = {
  EXISTING: ['ENTER_EMAIL', 'EXISTING_ENTER_PASSWORD'],
  NEW_USER: [
    'ENTER_EMAIL',
    'CREATE_ACCOUNT_MESSAGE',
    'NEW_ENTER_PASSWORD',
    'CONGRATULATIONS',
  ],
  FORGOT_PASSWORD: [
    'FORGOT_PASSWORD_MESSAGE',
    'RESET_PASSWORD',
    'EXISTING_ENTER_PASSWORD',
  ],
};
