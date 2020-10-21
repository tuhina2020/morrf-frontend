import React from 'react';
const CounterContent = [
  {
    number: 1,
    headerText: 'Drop a project request',
    bodyText: 'Tell us your requirement and leave the rest to us.',
  },
  {
    number: 2,
    headerText: 'Pick from a wide range of freelancers perfect for your job',
    bodyText:
      'Request proposals from recommended profiles best suited for your project based on skill and experience of the designer.',
  },
  {
    number: 3,
    headerText: 'Receive proposals and finalize your freelancer',
    bodyText:
      'Hear what various designers have in mind for your project, discuss with them and then have your pick.',
  },
  {
    number: 4,
    headerText: 'Get started!',
    bodyText:
      'Make an initial payment and get started. Have review sessions and iteration meetings to know how your project is shaping up.',
  },
  {
    number: 5,
    headerText: 'Approve and receive your designs.',
    bodyText:
      'After you are happy with the output, approve and receive all final files and deliverables. Only after your approval, payment will be processed to the designer.',
  },
  {
    number: 6,
    headerText: 'Tell us how it was!',
    bodyText:
      'Key to progress is to understand the smallest problems and fix them. Tell us about your experience and help us build a better product.',
  },
];

const CounterCard = ({ number, headerText, bodyText }) => {
  return (
    <div className="Ff($ffmanrope) D(f) Ai(e) Jc(c) M($lg)" key={number}>
      <div className="Fz($8xl) C($hoverInput) Fw($fwmedium) Mend($smx) W(70px) Lh(1)">
        {number}
      </div>
      <div className="Maw($45x)">
        <div className="Fz($xlg) Fw($fwmedium) Mb($sm)">{headerText}</div>
        <div className="Fz($mmd) Ff($ffopensans)">{bodyText}</div>
      </div>
    </div>
  );
};

const MobileCounterCard = ({ number, headerText, bodyText }) => {
  return (
    <div
      className="Ff($ffmanrope) D(f) Ai(s) Jc(c) Mstart($xl) Mend($lg) My($lg)"
      key={number}
    >
      <div className="Fz($8xl) C($hoverInput) Fw($fwmedium) Mend($lmg) W(70px) Ta(start) Lh(1)">
        {number}
      </div>
      <div className="Maw($24xl)">
        <div className="Fz($md) Fw($fwmedium) Mb($xs)">{headerText}</div>
        <div className="Fz($smd) Ff($ffopensans)">{bodyText}</div>
      </div>
    </div>
  );
};

const Steps = ({ mobile }) => {
  return (
    <>
      <div className={mobile ? '' : 'D(f) Ai(s) Jc(c) Mb($xxl) Mx(6%)'}>
        {CounterContent.slice(0, 3).map((obj, index) =>
          mobile ? (
            <div key={index}>
              <MobileCounterCard {...obj} />
            </div>
          ) : (
            <div key={index}>
              <CounterCard {...obj} />
            </div>
          ),
        )}
      </div>
      <div className={mobile ? 'Pb(1px)' : 'D(f) Ai(s) Jc(c) Mx($14xl)'}>
        {CounterContent.slice(3).map((obj, index) =>
          mobile ? (
            <div key={index}>
              <MobileCounterCard {...obj} />
            </div>
          ) : (
            <div key={index}>
              <CounterCard {...obj} />
            </div>
          ),
        )}
      </div>
    </>
  );
};

export default Steps;
