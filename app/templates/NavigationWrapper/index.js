import React from 'react';
export const EmptyWrapper = ({ children }) => children;

export const NavigationWrapper = ({ children }) => (
  <div className="Bgc($navBarBg) Mih(100vh)">
    {/* <div>THIS IS NAVIGATION WRAPPER</div> */}
    <div>{children}</div>
  </div>
);
