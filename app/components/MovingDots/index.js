import React from 'react';
import { DOTS_STYLE, FLEX_CENTER_CENTER } from 'utils/css';
import { getTransitionClass } from 'utils/helper';

export default function MovingDots({ isDesktop = true }) {
  return (
    <div className={`${FLEX_CENTER_CENTER}`}>
      {[1, 2, 3].map(i => (
        <div className={DOTS_STYLE(isDesktop)} key={i} />
      ))}
    </div>
  );
}
