import React from 'react';

const getDesktopCard = (title, description, image) => {
  return (
    <div
      style={{
        width: '417px',
        paddingLeft: '12px',
        minWidth: '417px',
        paddingRight: '12px',
        backgroundColor: '#F5F5F5',
        textAlign: 'center',
        paddingBottom: '24px',
      }}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          width: '100%',
          height: '236px',
          marginBottom: '11px',
        }}
      />
      <div
        className="Ff($ffmanrope) Fw($fwregular)"
        style={{
          width: '100%',
          marginBottom: '16px',
          fontSize: '20px',
          lineHeight: '28px',
        }}
      >
        {title}
      </div>
      <div
        className="Ff($ffmanrope) Fw($fwregular)"
        style={{ width: '100%', fontSize: '16px', lineHeight: '24px' }}
      >
        {description}
      </div>
    </div>
  );
};

const getMobileCard = (title, description, image) => {
  return (
    <div
      style={{
        width: '417px',
        paddingLeft: '12px',
        minWidth: '417px',
        paddingRight: '12px',
        backgroundColor: '#F5F5F5',
        textAlign: 'center',
        paddingBottom: '24px',
      }}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          width: '100%',
          height: '236px',
          marginBottom: '11px',
        }}
      />
      <div
        className="Ff($ffmanrope) Fw($fwregular)"
        style={{
          width: '100%',
          marginBottom: '16px',
          fontSize: '20px',
          lineHeight: '28px',
        }}
      >
        {title}
      </div>
      <div
        className="Ff($ffmanrope) Fw($fwregular)"
        style={{ width: '100%', fontSize: '16px', lineHeight: '24px' }}
      >
        {description}
      </div>
    </div>
  );
};

const LiteCard = props => {
  const { title, description, image, isDesktopOrLaptop } = props;
  return isDesktopOrLaptop
    ? getDesktopCard(title, description, image)
    : getMobileCard(title, description, image);
};

export default LiteCard;
