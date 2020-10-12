import React from 'react';
import Tag from 'components/molecules/Tag';
const Row = ({ row, headers, totalWidth }) => {
  const RowTypes = {
    progressPercentage: content => {
      return (
        <div className="D(f) Ai(c)">
          <div
            className="Bgc($iconBlue) H($3xs)"
            style={{ width: content * 100 + '%' }}
          />
          <div
            className="Bgc($lightestGray2) H($3xs)"
            style={{ width: (1 - content) * 100 + '%' }}
          />
          <div className="W($2xl) Mstart($mmd)">{content * 100 + '%'}</div>
        </div>
      );
    },
    tag: content => {
      return (
        <div className="W(fc)">
          <Tag disabled={false}>{content}</Tag>
        </div>
      );
    },
    tagArray: content => {
      return (
        <div className="D(f) Ai(c) Jc(s)">
          {content.map(tag => (
            <div className="W(fc) Mend($xxs)" key={tag.id}>
              <Tag disabled={false}>{tag.value}</Tag>
            </div>
          ))}
        </div>
      );
    },
    currency: content => <div>Rs. {content}</div>,
    dateString: content => (
      <div>{new Date(content).toDateString().slice(4)}</div>
    ),
    default: content => <div>{content}</div>,
  };
  return headers.map((headerObj, index) => {
    const width = (headerObj.width * 100) / totalWidth + '%';
    return (
      <div
        key={headerObj.key}
        style={{ width }}
        className={'Fz($smd) Mx($xxs)'}
      >
        {headerObj.type && RowTypes[headerObj.type]
          ? RowTypes[headerObj.type](row[headerObj.key])
          : RowTypes.default(row[headerObj.key])}
        {/* {row[headerObj.key]} */}
      </div>
    );
  });
};

export default Row;
