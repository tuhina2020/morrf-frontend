import React from 'react';
import PropTypes from 'prop-types';
import BaseIcon from 'components/atoms/BaseIcon';

const EmptyDisplayCard = () => {};

const ChildDisplayCardWrapper = ({
  children,
  childPadding,
  lastChildPadding,
}) => {
  const number = React.Children.count(children);
  if (number === 0) return <EmptyDisplayCard />;
  return React.Children.map(children, (child, i) => (
    <div
      className={`${
        i === number - 1 ? (lastChildPadding ? childPadding : '') : childPadding
      } ${number === 1 || i === number - 1 ? '' : 'Bdb($bdcardGrey)'}`}
      key={new Date().toString()}
    >
      {child}
    </div>
  ));
};

const DisplayCard = React.forwardRef((props, ref) => {
  const {
    heading,
    children,
    topRightIcon,
    color,
    childPadding,
    lastChildPadding,
    onClickIcon,
  } = props;

  return (
    <div className="Bdrs($xs) M($lg) Bgc(white) H($fc) Maw($60xl)">
      {heading ? (
        topRightIcon ? (
          <div className="D(f) Ai(c) Jc(sb) Fz($mmd) Lh(1) Px($lg) Py($xss) Bdb($bdcardGrey) Ff($ffmanrope) H($2xl)">
            <div>{heading}</div>
            <BaseIcon
              icon={topRightIcon}
              width="28px"
              height="28px"
              iconClasses="Bdrs($half) Bgc($navBarBg):h P($xxs)"
              fill={color}
              onClick={onClickIcon}
            />
          </div>
        ) : (
          <div className="Fz($mmd) Lh(1) Px($lg) Py($sm) Bdb($bdcardGrey) Ff($ffmanrope) H($2xl)">
            <div>{heading}</div>
          </div>
        )
      ) : topRightIcon ? (
        <BaseIcon
          icon={topRightIcon}
          width="28px"
          height="28px"
          iconClasses="Bdrs($half) Bgc($navBarBg):h P($xxs)"
          fill={color}
          onClick={onClickIcon}
        />
      ) : null}
      <ChildDisplayCardWrapper
        childPadding={childPadding}
        lastChildPadding={lastChildPadding}
      >
        {children}
      </ChildDisplayCardWrapper>
    </div>
  );
});

DisplayCard.propTypes = {
  children: PropTypes.node,
  heading: PropTypes.string,
  topRightIcon: PropTypes.string,
  color: PropTypes.string,
  childPadding: PropTypes.string,
  lastChildPadding: PropTypes.bool,
  onClickIcon: PropTypes.func,
};

DisplayCard.defaultProps = {
  color: '#0847f4',
  childPadding: 'Px($lg) Py($sm)',
  lastChildPadding: true,
  onClickIcon: () => {},
};

export default DisplayCard;
