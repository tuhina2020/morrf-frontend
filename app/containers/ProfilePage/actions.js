import {
  SET_LOCAL_PERSONAL_DATA,
  SET_REMOTE_PERSONAL_DATA,
  SET_EMAIL,
  SET_PHONE,
  SET_LOCAL_PORTFOLIO,
  SET_REMOTE_PORTFOLIO,
  SET_LOCAL_EXPERIENCE,
  SET_REMOTE_EXPERIENCE,
  SET_LOCAL_SKILLS,
  SET_AVAILABLE_SKILLS,
  SET_LOCAL_ABOUT_ME,
  SET_REMOTE_ABOUT_ME,
  GET_AVAILABLE_SKILLS,
  SEND_VERIFICATION,
  VERIFY_PHONE,
  SET_REMOTE_SKILLS,
} from './constants';

export function setLocalPersonalData(payload) {
  return {
    type: SET_LOCAL_PERSONAL_DATA,
    payload,
  };
}

export function setRemotePersonalData(payload) {
  return {
    type: SET_REMOTE_PERSONAL_DATA,
    payload,
  };
}

export function setEmail(payload) {
  return {
    type: SET_EMAIL,
    payload,
  };
}

export function setLocalAboutMe(payload) {
  return {
    type: SET_LOCAL_ABOUT_ME,
    payload,
  };
}

export function setRemoteAboutMe(payload) {
  return {
    type: SET_REMOTE_ABOUT_ME,
    payload,
  };
}

export function setPhone(payload) {
  return {
    type: SET_PHONE,
    payload,
  };
}

export function verifyPhone(payload) {
  return {
    type: VERIFY_PHONE,
    payload,
  };
}

export function setLocalPortfolio(payload) {
  return {
    type: SET_LOCAL_PORTFOLIO,
    payload,
  };
}

export function setRemotePortfolio(payload) {
  return {
    type: SET_REMOTE_PORTFOLIO,
    payload,
  };
}

export function setLocalExperience(payload) {
  return {
    type: SET_LOCAL_EXPERIENCE,
    payload,
  };
}

export function setRemoteExperience(payload) {
  return {
    type: SET_REMOTE_EXPERIENCE,
    payload,
  };
}

export function setLocalSkills(payload) {
  return {
    type: SET_LOCAL_SKILLS,
    payload,
  };
}

export function setRemoteSkills(payload) {
  return {
    type: SET_REMOTE_SKILLS,
    payload,
  };
}

export function getSkills(payload) {
  return {
    type: GET_AVAILABLE_SKILLS,
    payload,
  };
}

export function setLocalSkillsList(payload) {
  return {
    type: SET_AVAILABLE_SKILLS,
    payload,
  };
}

export function sendVerificationCode(payload) {
  return {
    type: SEND_VERIFICATION,
    payload,
  };
}
