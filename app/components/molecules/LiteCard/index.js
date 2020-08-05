import React from 'react';

const getDesktopCard = (title, description, image) => {
  return (
    <div
      className="W(417px) Mw($417px) Px($sm) Bgc($navBarBg) Ta(c) Pb($lg)"
    >
      <div
        className="W($full) Bgc(white) Mb($sm) H($24xl)"
      />
      <div
        className="Ff($ffmanrope) Fw($fwregular) W($full) Mb($md) Fz($fztitle) Lh(28px)"
        
      >
        {title}
      </div>
      <div
        className="Ff($ffmanrope) Fw($fwregular) W($full) Fz($fzmessage) Lh($input)"
        
      >
        {description}
      </div>
    </div>
  );
};


const getMobileCard = (title, description, image) => {
  return (
    <div
      className="W(417px) Mw($417px) Px($sm) Bgc($navBarBg) Ta(c) Pb($lg)"
    >
      <div
        className="W($full) Bgc(white) Mb($sm) H($24xl)"
      />
      <div
        className="Ff($ffmanrope) Fw($fwregular) W($full) Mb($md) Fz($smx) Lh(28px)"
        
      >
        {title}
      </div>
      <div
        className="Ff($ffmanrope) Fw($fwregular) W($full) Fz($fzbutton) Lh($input)"
        
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
