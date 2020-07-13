import React from 'react';
import PropTypes from 'prop-types';
import BaseIcon from 'components/atoms/BaseIcon';

const LoginHeader = ({
  subheading,
  back,
  heading,
  topBannerStyle,
  threeDots,
}) => (
  <div>
    <div className={topBannerStyle}>
      {back && (
        <BaseIcon
          width="40px"
          icon="arrowback"
          iconClasses="Bdrs($mmd) Bgc($navBarBg):h Mstart($lg) Mend($mmd)"
          onClick={back}
        />
      )}
      <div
        className={`W($full) D(f) Jc(c) Ai(c) ${
          back ? 'Pend($5xl)' : 'Px($5xl)'
        }`}
      >
        <BaseIcon icon="morff" iconClasses="W($3xxl)" />
      </div>
    </div>
    {heading && (
      <div className="C($headingDarkGrey) Fz($fzdesktopTitle) Mt($lg) Mb($xs)">
        {heading}
      </div>
    )}
    {subheading && (
      <div className="C($headingDarkGrey) Fz($fzbutton)">{subheading}</div>
    )}
    {threeDots && (
      <div className="D(f) Ai(c) Jc(c) My($lg)">
        <div className="W($xxs) H($xxs) Bgc($primary) Bdrs($half)" />
        <div className="Mx($2xl) W($xxs) H($xxs) Bgc($primary) Bdrs($half)" />
        <div className="W($xxs) H($xxs) Bgc($primary) Bdrs($half)" />
      </div>
    )}
  </div>
);

LoginHeader.propTypes = {
  subheading: PropTypes.string,
  back: PropTypes.func,
  heading: PropTypes.string.isRequired,
  topBannerStyle: PropTypes.string,
  threeDots: PropTypes.bool,
};

LoginHeader.defaultProps = {
  topBannerStyle: 'Ta(start) D(f) Ai(c) Jc(s)',
  threeDots: true,
};

export default LoginHeader;
