import React, { useRef, useState } from 'react';
// import { Businesses, Designers } from 'Assets/images';
import { FLEX_CENTER_END, FLEX_CENTER_CENTER } from 'utils/css';
import {
  check as Check,
  businesses as Businesses,
  designer as Designers,
  projectplanningicon as ProjectPlanning,
  clock as Clock,
  contracts as Contracts,
  rightdesigner as RightDesigner,
  paymentprotection as PaymentProtection,
  dedicatedconsultant as DedicatedConsultant,
  pmicon as ProjectManagement,
  connection as Connection,
} from 'Assets/svg-comp';
import { getTransitionClass } from 'utils/helper';

const Desktop = ({ scrolled }) => (
  <div className="D(f) Ai(c) Jc(c)">
    <Designers
      width="25vw"
      className={`${getTransitionClass(3)} Trsde(2s) Pos(r) ${
        scrolled ? '' : 'B(7vw)'
      }`}
    />
    <div className="Ta(start) Mx(3vw) ">
      <div className="Fz($fzsubheading) Fw($fwmedium) My(3.6vw) Ta(c) C($subheadingDarkGrey)">
        For Designers
      </div>
      <div className="Ff($ffopensans) C($bodyGrey) Fz($fzbody) Fw($fwregular)">
        <div className={`${FLEX_CENTER_END} Mb(4vw)`}>
          <div className={FLEX_CENTER_END}>
            <div>
              <Connection width="1.5vw" />
            </div>
            <div className="Mstart(1vw) W(18vw)">Project Connections</div>
          </div>
          <div className={FLEX_CENTER_END}>
            <div className={FLEX_CENTER_END}>
              <div>
                <PaymentProtection width="1.5vw" />
              </div>
              <div className="Mstart(1vw) W(10vw)">Payment Protection</div>
            </div>
          </div>
        </div>
        <div className={`${FLEX_CENTER_END} Mb(4vw)`}>
          <div className={FLEX_CENTER_END}>
            <div>
              <ProjectPlanning width="1.5vw" />
            </div>
            <div className="Mstart(1vw) W(18vw)">
              Intuitive Project Planning
            </div>
          </div>
          <div className={FLEX_CENTER_END}>
            <div className={FLEX_CENTER_END}>
              <div>
                <Contracts width="1.5vw" />
              </div>
              <div className="Mstart(1vw) W(10vw)">Contracts</div>
            </div>
          </div>
        </div>
      </div>
      <div className="Fz($fzsubheading) Fw($fwmedium) Py(3.6vw) Ta(c) Bdt($bdsolidLightestGray) C($subheadingDarkGrey)">
        For Businesses
      </div>
      <div className="Ff($ffopensans) C($bodyGrey) Fz($fzbody) Fw($fwregular)">
        <div className={`${FLEX_CENTER_END} Mb(4vw)`}>
          <div className={FLEX_CENTER_END}>
            <div>
              <DedicatedConsultant width="1.5vw" />
            </div>
            <div className="Mstart(1vw) W(18vw)">Dedicated Consultant</div>
          </div>
          <div className={FLEX_CENTER_END}>
            <div className={FLEX_CENTER_END}>
              <div>
                <Clock width="1.5vw" />
              </div>
              <div className="Mstart(1vw)">Timely Deliverables</div>
            </div>
          </div>
        </div>
        <div className={`${FLEX_CENTER_END} Mb(4vw) End(1vw) Pos(r)`}>
          <div className={FLEX_CENTER_END}>
            <div>
              <RightDesigner width="3vw" />
            </div>
            <div className="Mstart(0.4vw) W(18vw)">Find the right Designer</div>
          </div>
          <div className={FLEX_CENTER_END}>
            <div className={FLEX_CENTER_END}>
              <div>
                <ProjectManagement width="1.5vw" />
              </div>
              <div className="Mstart(1vw) W(15vw)">
                Complete Project Management
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Businesses
      width="25vw"
      className={`${getTransitionClass(3)} Trsde(2s) Pos(r) ${
        scrolled ? '' : 'T(7vw)'
      }`}
    />
  </div>
);

const Mobile = () => (
  <>
    <div>
      <Designers width="80vw" className="M(10vw)" />
    </div>
    <div className="Fz(6vw) Fw($fwmedium) Mb(8vw) Ta(c) C($subheadingDarkGrey)">
      For Designers
    </div>
    <div className="Ff($ffopensans) C($bodyGrey) Fz($fzlarge) Fw($fwregular)">
      <div className={`${FLEX_CENTER_CENTER} Mb(8.3vw)`}>
        <div>
          <Connection width="4vw" />
        </div>
        <div className="Mstart(4vw)">Project Connections</div>
      </div>
      <div className={`${FLEX_CENTER_CENTER} Mb(8.3vw)`}>
        <div>
          <PaymentProtection width="4vw" />
        </div>
        <div className="Mstart(4vw)">Payment Protection</div>
      </div>

      <div className={`${FLEX_CENTER_CENTER} Mb(8.3vw)`}>
        <div>
          <ProjectPlanning width="4vw" />
        </div>
        <div className="Mstart(4vw)">Intuitive Project Planning</div>
      </div>
      <div className={`${FLEX_CENTER_CENTER} Mb(8.3vw)`}>
        <div>
          <Contracts width="4vw" />
        </div>
        <div className="Mstart(4vw)">Contracts</div>
      </div>
    </div>
    <div>
      <Businesses width="80vw" className="M(10vw)" />
    </div>

    <div className="Fz(6vw) Fw($fwmedium) Mb(8vw) Ta(c) C($subheadingDarkGrey)">
      For Businesses
    </div>
    <div className="Ff($ffopensans) C($bodyGrey) Fz($fzlarge) Fw($fwregular)">
      <div className={`${FLEX_CENTER_CENTER} Mb(8.3vw)`}>
        <div>
          <DedicatedConsultant width="4vw" />
        </div>
        <div className="Mstart(4vw)">Dedicated Consultant</div>
      </div>
      <div className={`${FLEX_CENTER_CENTER} Mb(8.3vw)`}>
        <div>
          <Clock width="4vw" />
        </div>
        <div className="Mstart(4vw)">Timely Deliverables</div>
      </div>

      <div className={`${FLEX_CENTER_CENTER} Mb(8.3vw)`}>
        <div>
          <RightDesigner width="10vw" />
        </div>
        <div className="Mstart(3vw)">Find the right Designer</div>
      </div>
      <div className={`${FLEX_CENTER_CENTER} Mb(8.3vw)`}>
        <div>
          <ProjectManagement width="4vw" />
        </div>
        <div className="Mstart(4vw)">Complete Project Management</div>
      </div>
    </div>
  </>
);

export default function ValueInformation({ isDesktopOrLaptop }) {
  return isDesktopOrLaptop ? <Desktop /> : <Mobile />;
}
