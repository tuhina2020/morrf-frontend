import React from 'react';
export const EmptyWrapper = ({ children }) => children;

export const NavigationWrapper = ({ children }) => {
  return (
    <div className="Bgc($navBarBg)">
      <div>THIS IS WRAPPER</div>
      <div>{children}</div>
    </div>
  );
};
