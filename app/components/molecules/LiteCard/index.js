import React from 'react';

const LiteCard = props => {
  const { title, description, image } = props;
  return (
    <div
style={{
      width: '23vw',
      paddingLeft: "12px",
      minWidth:"393px",
      paddingRight: "12px",
      backgroundColor:"#F5F5F5",
        textAlign: 'center',
      paddingBottom: '24px',
      }}>
      <div style={{ backgroundColor:"#FFFFFF", width: "100%", height: "236px", marginBottom:"11px", }}></div>
      <div className="Ff($ffmanrope) Fw($fwregular)" style={{marginBottom: "16px", fontSize:"20px"}}>{title}</div>
      <div className="Ff($ffmanrope) Fw($fwregular)" style={{fontSize:"16px"}}>{description}</div>
    </div>
  );
};

export default LiteCard;
