import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { classnames } from 'utils/helper';
import { cloneDeep } from 'lodash';
import FilePreview from './preview';

const FileUpload2 = ({
  heading,
  subheading,
  onUpload,
  maxSize,
  name,
  multiple,
  label,
  showPreview,
  filesExisting,
  onChange,
  onRemove,
}) => {
  const [fileList, setFiles] = useState(filesExisting);
  const [dataList, setDataList] = useState(filesExisting);
  const [uploadHover, setUploadHover] = useState(false);
  const handleDragOver = e => {
    if ('preventDefault' in e) {
      e.stopPropagation();
      e.preventDefault();
    }
    if (e.type === 'dragover') {
      console.log('dragover');
      setUploadHover(true);
    } else {
      setUploadHover(false);
    }
  };
  const handleFileSelect = e => {
    const files = e.target.files || e.dataTransfer.files;
    const fileListTemp = [...fileList, ...files];

    const dataListTemp = [...dataList, ...files];

    if (dataListTemp.length >= maxSize) {
      return;
    }
    setFiles(fileListTemp);

    handleDragOver(e);

    setDataList(dataListTemp);
    onChange(files);
  };

  const removeItem = index => {
    const fileListTemp = [...fileList];
    const dataListTemp = [...dataList];
    fileListTemp.splice(index, 1);
    dataListTemp.splice(index, 1);
    console.log('REMOVE FILE', index);
    setFiles(fileListTemp);
    setDataList(dataListTemp);
    onRemove(index);
  };

  const Previews = () => {
    if (!showPreview) return null;
    return fileList.map((file, index) => {
      const removeItemCurrent = () => {
        removeItem(index);
      };
      return (
        <div key={file.name + index}>
          <FilePreview data={file} onRemove={removeItemCurrent} />
        </div>
      );
    });
  };
  const inputRef = useRef();
  const selectFile = e => {
    e.preventDefault();
    inputRef.current.click(e);
  };

  const dragClasses = classnames({
    'Bgc($hoverInput)': uploadHover,
    'Bd($bdprimaryButton)': uploadHover,
    'Bgc($navBarBg)': !uploadHover,
    'Bd($bdfileUpload)': !uploadHover,
    'My($sm)': true,
    'Cur(d)': true,
    'Bgc($hoverInput):h': true,
    'Bdrs($bdrsbutton)': true,
    'Bxsh($checkbox)': uploadHover,
  });

  return (
    <>
      <div className="W($full) H($full)">
        <label>
          <div
            className={dragClasses}
            onDragOver={handleDragOver}
            onDragLeave={handleDragOver}
            onDrop={handleFileSelect}
          >
            <div>
              <input
                type="file"
                tabIndex={0}
                accept="image/jpeg,image/png"
                ref={inputRef}
                className="D(n)"
                name={name}
                id="your-file-input"
                multiple={true}
                onChange={handleFileSelect}
              />
              <div
                className="Ff($ffmanrope) Mx(a) My($lmg) W(fc) Ta(c)"
                onClick={selectFile}
              >
                <div className="C($iconBlue) Fz($smd)">{heading}</div>
                <div className="C($inputGrey) Fz($sm)">{subheading}</div>
              </div>
            </div>
          </div>
        </label>
        <div className="D(f) Flw(w)">
          <Previews />
        </div>
      </div>
    </>
  );
};

FileUpload2.defaultProps = {
  heading: 'Drag and drop files here or click',
  subheading: 'Max of 10 files. Only .Jpeg and .png accepted',
  filesExisting: [],
  onChange: (data, i) => {
    console.log('setting upsteam', i);
  },
  showPreview: false,
  onRemove: ({ index }) => {},
};

export default FileUpload2;
