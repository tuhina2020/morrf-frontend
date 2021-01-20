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

const Display = React.forwardRef((props, ref) => {
  const {
    heading,
    children,
    topRightIcon,
    color,
    childPadding,
    lastChildPadding,
    onClickIcon,
    wrapperClassName,
  } = props;

  return (
    <div
      className={'Bdrs($xs) Bgc(white) H($fc) Maw($60xl) ' + wrapperClassName}
    >
      {heading ? (
        topRightIcon ? (
          <div className="D(f) Ai(c) Jc(sb) Fz($mmd) Lh(1) Px($lg) Py($xss) Bdb($bdcardGrey) Ff($ffmanrope) H($2xl)">
            <div>{heading}</div>
            <div className="Fl(end) Fxd(r) Jc(fs)">Open</div>
            <div className="Pos(r) P($xxs) Bgc($navBarBg):h Bdrs($half) W($lmg) H($lmg)">
              <BaseIcon
                icon={topRightIcon}
                fill="none"
                onClick={onClickIcon}
                width="20px"
                height="20px"
                iconClasses="Pos(a) T($xxs) Start($xxs)"
                // iconClasses="Bxz(cb) W($lg) H($lg) Pos(a) T"
              />
            </div>
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

Display.propTypes = {
  children: PropTypes.node,
  heading: PropTypes.string,
  topRightIcon: PropTypes.string,
  color: PropTypes.string,
  childPadding: PropTypes.string,
  lastChildPadding: PropTypes.bool,
  onClickIcon: PropTypes.func,
  wrapperClassName: PropTypes.string,
};

Display.defaultProps = {
  color: '#555',
  childPadding: 'Px($lg) Py($sm)',
  lastChildPadding: true,
  onClickIcon: () => {},
  wrapperClassName: 'Mt($lg)',
};

export default Display;
