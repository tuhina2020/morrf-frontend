import React from 'react';
import { Businesses, Designers } from 'Assets/images';

export default function ValueInformation() {
  return (
    <div className="D(f) Mb(4vw) Mx(8vw) Ai(c) Jc(sb)">
      <div className="D(f) Ai(c) Jc(fs)">
        <img src={Designers} className="H(13vw)" />
        <div className="Ta(c) W(20vw) Mstart(2vw)">
          <div className="Fz($fzsubheading) Fw($fwsemibold) Pb(0.5vw)  Bdb($bdGrey)">
            For Designers
          </div>
          <div className="Fz($fztext) Fw($fwregular)">
            <div className="Ff($ffopensans)">
              <div className="My(0.5vw)">Project Connections</div>
              <div className="My(0.5vw)">Intuitive Project Planning</div>
              <div className="My(0.5vw)">Payment Protection</div>
            </div>
          </div>
        </div>
      </div>
      <div className="D(f) Ai(c) Jc(fe)">
        <div className="Ta(c) W(20vw) Mend(2vw)">
          <div className="Fz($fzsubheading) Fw($fwsemibold) Pb(0.5vw) Bdb($bdGrey)">
            For Businesses
          </div>
          <div className="Fz($fztext) Fw($fwregular)">
            <div className="Ff($ffopensans)">
              <div className="My(0.5vw)">Find the right designer</div>
              <div className="My(0.5vw)">Dedicated Consultant</div>
              <div className="My(0.5vw)">Complete Project Management</div>
            </div>
          </div>
        </div>
        <img src={Businesses} className="H(13vw)" />
      </div>
    </div>
  );
}
