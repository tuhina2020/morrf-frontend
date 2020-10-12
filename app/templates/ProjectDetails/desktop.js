import React, { useState } from 'react';
import AllProjects from 'components/organisms/ProjectDetails/AllProjects';
import CreateProjectModal from 'components/organisms/ProjectDetails/createProject';
import Modal from 'react-modal';
import Button from 'components/molecules/Button';
import isEmpty from 'lodash//isEmpty';
import CallBackForm from 'components/organisms/LiteForms/CallBackForm/index';
const ProjectDetails = props => {
  const [open, setOpen] = useState('');
  const [name, setName] = useState('');
  Modal.setAppElement('#app');
  const changeModal = params => () => {
    console.log('SETTING ', params);
    setOpen(params);
  };
  const { projects, createProject, skillsList, callbackReq } = props;
  const cbProps = {
    isDesktopOrLaptop: true,
    setCallToggle: changeModal('project'),
    callbackReq,
  };
  return (
    <div>
      <div className="Mx($2xl)">
        <div className="C($iconBlue) Ff($manrope) Fz($lg) Py($xl)">
          Projects
        </div>
        <div className="Fl(end)">
          <Button onClick={() => setOpen('project')}>Post new Project</Button>
        </div>
        <AllProjects projects={projects} />
      </div>
      <Modal
        isOpen={!isEmpty(open)}
        contentLabel="onRequestClose Example"
        onRequestClose={changeModal('')}
        className={`W($60xl) M(a) H($fc) Pos(r) T($10x) Bd(n) O(n)`}
        overlayClassName="Bgc($modal) Pos(f) T(0) Start(0) B(0) End(0)"
      >
        {open === 'project' && (
          <CreateProjectModal
            onCancel={changeModal('')}
            onCb={changeModal('callback')}
            onSave={createProject}
            skillsList={skillsList}
          />
        )}
        {open === 'callback' && <CallBackForm {...cbProps} />}
      </Modal>
    </div>
  );
};

export default ProjectDetails;
