import React from 'react';
import { Businesses, Designers } from 'Assets/images';

export default function ValueInformation() {
  return (
    <div className="D(f) Mx(14.6vw) Ai(c) Jc(sb)">
      <div className="D(f) Ai(c) Jc(fs)">
        <img src={Designers} className="H(13vw)" alt="Designers" />
        <div className="Ta(start) W(20vw) Mstart(5.5vw)">
          <div className="Fz($fzsubheading) Fw($fwsemibold) Pb(1vw)">
            For Designers
          </div>
          <div className="Fz($fzbody) Fw($fwregular)">
            <div className="Ff($ffopensans) C($mediumGrey)">
              <div className="My(1.2vw)">Project Connections</div>
              <div className="My(1.2vw)">Intuitive Project Planning</div>
              <div className="My(1.2vw)">Payment Protection</div>
            </div>
          </div>
        </div>
      </div>
      <div className="D(f) Ai(c) Jc(fe)">
        <div className="Ta(end) W(20vw) Mend(5.5vw)">
          <div className="Fz($fzsubheading) Fw($fwsemibold) Pb(1vw)">
            For Businesses
          </div>
          <div className="Fz($fzbody) Fw($fwregular)">
            <div className="Ff($ffopensans) C($mediumGrey)">
              <div className="My(1.2vw)">Find the right designer</div>
              <div className="My(1.2vw)">Dedicated Consultant</div>
              <div className="My(1.2vw)">Complete Project Management</div>
            </div>
          </div>
        </div>
        <img src={Businesses} className="H(13vw)" alt="Businesses" />
      </div>
    </div>
  );
}
