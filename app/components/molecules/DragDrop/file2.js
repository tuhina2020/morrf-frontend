import FilePreview from './preview';
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { classnames } from 'utils/helper';
import { cloneDeep } from 'lodash';
const uploadFileToServer = file => {
  const delay = file.size / 100;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
};

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
  // uploadFileToServer = uploadFileToServer,
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
    handleDragOver(e);
    const files = e.target.files || e.dataTransfer.files;
    const fileListTemp = [
      ...fileList,
      ...Object.keys(files).map(file => files[file]),
    ];
    setFiles(fileListTemp);
    const dataListTemp = [
      ...dataList,
      ...Object.keys(files).map(file => files[file]),
    ];
    if (dataListTemp.length < maxSize) {
      setDataList(dataListTemp);
      onChange(dataListTemp);
    }
  };

  const removeItem = index => {
    const fileListTemp = [...fileList];
    const dataListTemp = [...dataList];
    fileListTemp.splice(index, 1);
    dataListTemp.splice(index, 1);
    console.log('REMOVE FILE', index);
    setFiles(fileListTemp);
    setDataList(dataListTemp);
    onChange(dataListTemp);
  };
  // const uploadFile = file => {
  //   return new Promise((resolve, reject) => {
  //     const fileListTemp = [...fileList];
  //     const index = fileListTemp.indexOf(file);
  //     fileListTemp[index].loading = true;
  //     console.log(fileListTemp);
  //     setFiles(fileListTemp);
  //     if (typeof file === 'file' || !('size' in file)) {
  //       return reject(new Error('No file size'));
  //     }
  //     onUpload(file).then(data => {
  //       resolve(data);
  //     });
  //   });
  // };

  const previews = () => {
    if (!showPreview) return null;
    return fileList.map((file, index) => {
      const removeItemCurrent = () => {
        removeItem(index);
      };
      return (
        <div key={file.name}>
          <FilePreview
            data={file}
            onRemove={removeItemCurrent}
            onload={params => {
              let tempDataList = [...dataList];
              if (index >= 0 && index < dataList.length) {
                tempDataList[index] = params;
              } else if (index === dataList.length) {
                tempDataList.push(params);
              }
              console.log('SETTING DATA ');
              if (tempDataList.length < maxSize) {
                setDataList(tempDataList);
                onChange(tempDataList);
              }
            }}
          />
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
      <input
        type="hidden"
        name={`${name}:maxSize`}
        value={maxSize}
        className="D(n)"
      />
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
                multiple={multiple}
                onChange={handleFileSelect}
              />
              <div className="Ff($ffmanrope) Mx(a) My($lmg) W(fc) Ta(c)">
                <div onClick={selectFile} className="C($iconBlue) Fz($smd)">
                  {heading}
                </div>
                <div className="C($inputGrey) Fz($sm)">{subheading}</div>
              </div>
            </div>
          </div>
        </label>
        <div className="D(f) Flw(w)">{previews()}</div>
      </div>
    </>
  );
};

FileUpload2.defaultProps = {
  heading: 'Drag and drop files here or click',
  subheading: 'Max of 10 files. Only .Jpeg .png and .pdf accepted',
  filesExisting: [],
  onChange: (data, i) => {
    console.log('setting upsteam', i);
  },
  showPreview: false,
};

export default FileUpload2;
