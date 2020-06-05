export function scrollIt(element) {
  element.scrollIntoView({ behavior: 'smooth' });
}

export function scrollTo({ top = 0, left = 0 }) {
  window.scrollTo({
    top,
    left,
    behavior: 'smooth',
  });
}

export function validateEmail({ data }) {
  const lastAtPos = data.lastIndexOf('@');
  const lastDotPos = data.lastIndexOf('.');
  if (data.length === 0) return false;
  if (
    !(
      lastAtPos < lastDotPos &&
      lastAtPos > 0 &&
      data.indexOf('@@') === -1 &&
      lastDotPos > 2 &&
      data.length - lastDotPos > 2
    )
  ) {
    return false;
  }
  return true;
}

export function validateAlphabets({ data }) {
  return !!(data && data.length && new RegExp(/^[A-Za-z]+$/).test(data));
}

const primitive = ({ data, type }) => typeof data === type;

export function validateData({ data, type = 'string', ...params }) {
  const LOOKUP = {
    string: primitive,
    number: primitive,
    boolean: primitive,
    emailRegex: validateEmail,
    alphabetRegex: validateAlphabets,
    minLength: ({ data, size }) =>
      primitive({ data, type: 'string' }) && data.length >= size,
    default: () => {
      console.log('PLEASE ADD VALIDATION');
      return false;
    },
  };

  return LOOKUP[type]
    ? LOOKUP[type]({ data, type, ...params })
    : LOOKUP.default();
}

export function bulkValidation({ validationObj, data }) {
  const validObj = {};
  let allValid = true;
  Object.keys(validationObj).forEach(validation => {
    const params = validationObj[validation];
    const valid = validateData({ ...params, data, type: validation });
    console.log('VALIDATING ', data, validation, params);
    validObj[validation] = valid
      ? { valid }
      : {
          errorMsg: params.errorMsg || 'Incorrect Value Entered',
          priority: params.priority || 1,
          valid,
        };
    allValid = allValid && valid;
  });
  validObj.valid = allValid;
  return validObj;
}
