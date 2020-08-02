export const NAME_VALIDATION_OBJ = [
  {
    size: 0,
    priority: 1,
    type: 'minLength',
    errorMsg: 'This field cannot be blank',
  },
  {
    regex: new RegExp(/^([^0-9]*)$/),
    priority: 2,
    type: 'genericRegex',
    errorMsg: 'No numbers allowed',
  },
];
