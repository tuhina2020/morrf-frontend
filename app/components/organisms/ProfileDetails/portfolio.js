import React from 'react';
import PropTypes from 'prop-types';
import DisplayCard from 'components/molecules/DisplayCard';
import isEmpty from 'lodash/isEmpty';
import BaseIcon from 'components/atoms/BaseIcon';

const PortfolioScroll = ({ onNext, onBack, images, current = false }) => {
  const remaining =
    images.length < 6 ? [...Array(6 - images.length).keys()] : [];
  return (
    <div className="D(f) Jc(fs) Ai(c) W(fc)">
      <BaseIcon
        icon="showmore"
        iconClasses={`W($xl) H($xl) Rotate(90deg) Bdrs($lg) ${
          current ? '' : 'Bgc($navBarBg):h'
        } Trsdu(0.4s) Trsp(a) Trstf(e)`}
        fill={current ? '#c6c6c6' : 'black'}
        onClick={onBack}
      />
      <div className="Ov(s) D(f) Ai(c) Jc(fs) Maw($60xl)">
        {images.map(({ link, id, data }) => (
          <div key={id} className="W($10x) H($10x) M($xxs) Bdrs($xxs)">
            <img src={link || data} className="W($full) Bdrs($xxs)" />
          </div>
        ))}
        {remaining.map(o => (
          <div
            key={o}
            className="W($10x) H($10x) M($xxs) Bdrs($xxs) Bgc($navBarBg)"
          />
        ))}
      </div>
      <BaseIcon
        icon="showmore"
        iconClasses={`W($xl) H($xl) Rotate(-90deg) Bdrs($lg) ${
          current ? '' : ''
        } Trsdu(0.4s) Trsp(a) Trstf(e)`}
        fill={current ? '#c6c6c6' : 'black'}
        onClick={onNext}
      />
    </div>
  );
};

const Portfolio = ({ portfolio, onEdit, onAdd }) => {
  if (isEmpty(portfolio)) return null;
  return (
    <DisplayCard
      heading="Portfolio"
      topRightIcon="simpleadd"
      onClickIcon={onAdd}
    >
      {portfolio.map(
        ({ project, from, duration, description, images, order }, i) => (
          <div
            className="Ff($ffopensans) Lh(1)"
            key={description.replace(/ /g, '')}
          >
            <div className="D(f) Ai(fs) Jc(s)">
              <div className="Fw($fwsemibold) Mend($md) Fz($smx) W(69%)">
                {project}
              </div>
              <div className="Fz($smd) W($quarter) Ta(e)">
                {from} {duration ? ', ' + duration + ' mon' : ''}
              </div>
              <BaseIcon
                icon="edit"
                width="28px"
                height="28px"
                iconClasses="Bdrs($half) Bgc($navBarBg):h P($xxs) C($inputGrey) Mstart($lg)"
                onClick={() => onEdit(i)}
              />
            </div>
            <div className="Mt($md) Mb($lg)">{description}</div>
            <PortfolioScroll
              images={images}
              onNext={() => {}}
              onBack={() => {}}
            />
          </div>
        ),
      )}
    </DisplayCard>
  );
};

Portfolio.propTypes = {
  portfolio: PropTypes.array,
  onEdit: PropTypes.func,
  onAdd: PropTypes.func,
};

export default Portfolio;
