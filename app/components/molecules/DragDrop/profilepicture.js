import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/molecules/Button';
import { classnames } from 'utils/helper';
import { cloneDeep, get, isEmpty } from 'lodash';

const ProfilePic = () => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Profile pic');

  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };
  const inputRef = useRef();
  const selectFile = e => {
    e.preventDefault();
    inputRef.current.click(e);
  };

  return (
    <div className="D(f) Ai(c) Jc(c) ">
      <input
        type="file"
        accept="image/jpeg,image/png"
        ref={inputRef}
        id="your-file-input"
        onChange={onChange}
      />
    </div>
  );
};

export default ProfilePic;
