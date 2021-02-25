import React, { useEffect } from 'react';
import ProjectDetails from 'templates/ProjectDetails/desktop';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { RESTART_ON_REMOUNT } from 'utils/constants';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectProjectPage } from './selectors';
import {
  getAllProjects,
  getProjectById,
  createProject,
  editProject,
  getAllTags,
} from './actions';
import { callbackRequest } from 'containers/LitePage/actions';
import reducer from './reducer';
import saga from './saga';

const ProjectPage = ({
  projectPage,
  match,
  getProjects,
  getProjectById,
  getProjectTags,
  create,
  edit,
  projectCallbackRequest,
}) => {
  useInjectReducer({ key: 'projectPage', reducer });
  useInjectSaga({ key: 'projectPage', saga, mode: RESTART_ON_REMOUNT });
  useEffect(() => {
    getProjects();
    getProjectTags();
  }, []);
  // const { projects, skillsList } = projectPage;
  console.log(projectCallbackRequest, 'IS HERE');
  return (
    <ProjectDetails
      {...projectPage}
      createProject={create}
      callbackReq={projectCallbackRequest}
    />
  );
};

ProjectPage.propTypes = {
  responsiveData: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  projectPage: makeSelectProjectPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    getProjects: params => dispatch(getAllProjects(params)),
    getProjectById: params => dispatch(getProjectById(params)),
    create: params => dispatch(createProject(params)),
    edit: params => dispatch(editProject(params)),
    getProjectTags: () => dispatch(getAllTags()),
    projectCallbackRequest: params => dispatch(callbackRequest(params)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ProjectPage);
