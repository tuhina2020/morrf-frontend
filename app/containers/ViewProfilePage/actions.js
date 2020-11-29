import {
  SET_LOCAL_PERSONAL_DATA,
  SET_EMAIL,
  SET_PHONE,
  SET_LOCAL_PORTFOLIO,
  SET_LOCAL_EXPERIENCE,
  SET_LOCAL_SKILLS,
  SET_LOCAL_ABOUT_ME,
  GET_USER,
  SET_ID,
  SET_PORTFOLIO_IMAGES,
  SET_LOADING_STATE,
} from './constants';

export function getUser(payload) {
  return { type: GET_USER, payload };
}
export function setLocalPersonalData(payload) {
  return { type: SET_LOCAL_PERSONAL_DATA, payload };
}

export function setEmail(payload) {
  return { type: SET_EMAIL, payload };
}
export function setLocalAboutMe(payload) {
  return { type: SET_LOCAL_ABOUT_ME, payload };
}

export function setLocalPhone(payload) {
  return { type: SET_PHONE, payload };
}

export function verifyPhone(payload) {
  return { type: VERIFY_PHONE, payload };
}
export function setLocalPortfolio(payload) {
  return { type: SET_LOCAL_PORTFOLIO, payload };
}
export function setRemotePortfolio(payload) {
  return { type: SET_REMOTE_PORTFOLIO, payload };
}
export function setLocalExperience(payload) {
  return { type: SET_LOCAL_EXPERIENCE, payload };
}
export function setRemoteExperience(payload) {
  return { type: SET_REMOTE_EXPERIENCE, payload };
}
export function setLocalSkills(payload) {
  return { type: SET_LOCAL_SKILLS, payload };
}

export function setId(payload) {
  return {
    type: SET_ID,
    payload,
  };
}

export function setLoading(payload) {
  return {
    type: SET_LOADING_STATE,
    payload,
  };
}

export function setPortfolioImages(payload) {
  return {
    type: SET_PORTFOLIO_IMAGES,
    payload,
  };
}
