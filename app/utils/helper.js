import { useMediaQuery } from 'react-responsive';
import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import isEmpty from 'lodash/isEmpty';
import sortBy from 'lodash/sortBy';
import { toast } from 'react-toastify';

export const datesAreOnSameDay = (first = new Date(), second = new Date()) => {
  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  );
};

export const wordCount = word => {
  return word
    .trim()
    .replace(/\s+/gi, ' ')
    .split(' ').length;
};

export const setToast = ({ message }) => {
  if (isEmpty(message)) return;
  toast(message);
};

export const getDefaultState = (key, DEFAULT = '') => {
  if (!key) return DEFAULT;
  let value = localStorage.getItem(key);
  if (!value || value === 'undefined') return DEFAULT;
  try {
    value = JSON.parse(value);
  } catch (error) {
    return value;
  }
  return value;
};

export const isLoggedIn = () => {
  const role = localStorage.getItem('role');
  const token = localStorage.getItem('token');
  const valid = l => !isEmpty(l) && l !== 'undefined';
  return valid(role) && valid(token);
};

export const deviceScreenInfo = () => {
  const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 });
  const isTabletOrMobile = useMediaQuery({ maxDeviceWidth: 1224 });

  return {
    isDesktopOrLaptop,
    isTabletOrMobile,
  };
};

export function checkPosition({ elements = [] }) {
  const windowHeight = window.innerHeight;
  for (let i = 0; i < elements.length; i += 1) {
    const element = elements[i];
    const positionFromTop = elements[i].getBoundingClientRect().top;

    if (positionFromTop - windowHeight <= 0) {
      element.classList.add('fade-in-element');
      element.classList.remove('hidden');
    }
  }
}

export function scrollIt({ element, offset = 0 }) {
  const top = element.getBoundingClientRect().top - offset;
  window.scrollTo({
    top,
    left: 0,
    behavior: 'smooth',
  });
}

export function scrollToElement({ duration = 1000, element, offset = 0 }) {
  // cancel if already on top
  const totalScrollDistance = element.getBoundingClientRect().top - offset;
  let scrollY = 0;
  let oldTimestamp = null;

  function step(newTimestamp) {
    if (oldTimestamp !== null) {
      // if duration is 0 scrollY will be -Infinity
      scrollY +=
        (totalScrollDistance * (newTimestamp - oldTimestamp)) / duration;
      if (scrollY >= totalScrollDistance)
        return (document.scrollingElement.scrollTop = totalScrollDistance);
      document.scrollingElement.scrollTop = scrollY;
    }
    oldTimestamp = newTimestamp;
    window.requestAnimationFrame(step);
  }
  window.requestAnimationFrame(step);
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
  return !!(data && data.length && new RegExp(/^[A-Za-z ]+$/).test(data));
}

const primitive = ({ data, type }) => typeof data === type;

const LOOKUP = {
  string: primitive,
  number: primitive,
  boolean: primitive,
  emailRegex: validateEmail,
  alphabetRegex: validateAlphabets,
  minLength: ({ data, size }) =>
    primitive({ data, type: 'string' }) && data.trim().length > size,
  maxAllowedLength: ({ data, size }) =>
    primitive({ data, type: 'string' }) && data.trim().length < size,
  genericRegex: ({ data, regex }) =>
    primitive({ data, type: 'string' }) && regex.test(data),
  default: () => {
    console.log('PLEASE ADD VALIDATION');
    return false;
  },
};

export function validateData({ data, type = 'string', ...params }) {
  return LOOKUP[type]
    ? LOOKUP[type]({ data, type, ...params })
    : LOOKUP.default();
}

export function bulkValidation({ validationObj, data }) {
  const validObj = {};
  let allValid = true;
  Object.keys(validationObj).forEach(validation => {
    const params = validationObj[validation];
    const valid = validateData({
      ...params,
      data,
      type: params.rule || validation,
    });
    validObj[validation] = valid
      ? { valid }
      : {
          errorMsg: params.errorMsg || 'Incorrect Value Entered',
          priority: params.priority || 1,
          valid,
        };
    validObj.errorMsg =
      params.priority === 1
        ? params.errorMsg || 'Incorrect Value Entered'
        : validObj.errorMsg;
    allValid = allValid && valid;
  });
  validObj.valid = allValid;
  return validObj;
}

export function bulkValidationList({ validationList, data }) {
  const validObj = {};
  let allValid = true;
  let errorMsg = '';
  sortBy(validationList, 'priority').forEach(params => {
    const valid = validateData({
      ...params,
      data,
    });
    if (valid) {
      validObj[`${params.type}_${params.priority}`] = { valid };
    } else {
      validObj[`${params.type}_${params.priority}`] = {
        errorMsg: params.errorMsg || 'Incorrect Value Entered',
        priority: params.priority,
        valid,
      };
      if ((errorMsg && errorMsg.length === 0) || !errorMsg)
        errorMsg = params.errorMsg || 'Incorrect Value Entered';
    }
    allValid = allValid && valid;
  });
  validObj.errorMsg = errorMsg;
  validObj.valid = allValid;
  return validObj;
}

export function getTransitionClass(duration = 0.4, property = 'a') {
  return `Trsdu(${duration}s) Trsp(${property}) Trstf(e)`;
}

export function classnames(classObj) {
  if (isEmpty(classObj)) return '';
  if (isString(classObj)) return classObj;
  let classList = [];
  if (isArray(classObj)) {
    classList = [...classObj];
  } else {
    Object.keys(classObj).forEach(classKey => {
      if (classObj[classKey]) classList.push(classKey);
    });
  }
  return classList.join(' ');
}
