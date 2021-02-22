import {
  GET_ALL_PROJECTS,
  SET_LOCAL_PROJECTS,
  GET_PROJECT_BY_ID,
  SET_LOCAL_ACTIVE_PROJECT,
  CREATE_PROJECT,
  EDIT_PROJECT,
  GET_ALL_TAGS,
  SET_LOCAL_TAGS,
  SET_ALL_PROJECTS,
} from './constants';
  
export function setAllProjects(payload) {
  return {
    type: SET_ALL_PROJECTS,
    payload,
  };
}
  
export function getAllProjects(payload) {
  return {
    type: GET_ALL_PROJECTS,
    payload,
  };
}
  
export function setLocalProjects(payload) {
  return {
    type: SET_LOCAL_PROJECTS,
    payload,
  };
}
  
export function getProjectById(payload) {
  return {
    type: GET_PROJECT_BY_ID,
    payload,
  };
}
  
export function setLocalActiveProject(payload) {
  return {
    type: SET_LOCAL_ACTIVE_PROJECT,
    payload,
  };
}
  
export function createProject(payload) {
  return {
    type: CREATE_PROJECT,
    payload,
  };
}
  
export function editProject(payload) {
  return {
    type: EDIT_PROJECT,
    payload,
  };
}
  
export function getAllTags() {
  return {
    type: GET_ALL_TAGS,
  };
}
  
export function setLocalProjectTags(payload) {
  return {
    type: SET_LOCAL_TAGS,
    payload,
  };
}
  