import React from 'react';
const CounterContent = [
  {
    image:
      'https://morff-commingsoon.s3-ap-southeast-1.amazonaws.com/right-designer.png',
    headerText: 'Find the right designer, in a snap!',
    bodyText:
      'Get domain expert freelance designers handpicked for your project. With verified profiles, you can choose based on qualification and past experience to find a reliable professional match!',
    number: 1,
  },
  {
    image:
      'https://morff-commingsoon.s3-ap-southeast-1.amazonaws.com/security.png',
    number: 2,
    headerText: 'Payment Security',
    bodyText:
      'Somebody ran away with your money? Never again! We will protect your payments until after you receive project deliverables to ensure that you receive all that was promised.',
  },
  {
    image:
      'https://morff-commingsoon.s3-ap-southeast-1.amazonaws.com/communication.png',
    number: 3,
    headerText: 'Project management assistance',
    bodyText:
      'Running a business is hard. Don’t let design add to your troubles. You have us by your side. We will offer continuous support and handholding throughout the project to help achieve your goals effortlessly.',
  },
  {
    image:
      'https://morff-commingsoon.s3-ap-southeast-1.amazonaws.com/contract.png',
    number: 4,
    headerText: 'Clear Contract Agreements',
    bodyText:
      'Project process and timeline commitments cannot be written in stone, but they can be written in a contract! We will help you get your project running in no time with our contract template and help you complete your project as envisioned.',
  },
];

const CounterCard = ({ image, headerText, bodyText, number }) => {
  const odd = number % 2 === 1;
  const Body = () => (
    <div className={`Maw(56%) ${odd ? 'Mend(8%)' : 'Mstart(8%)'}`}>
      <div className="Fz($lmg) Mb($lg)">{headerText}</div>
      <div className="Fz($mmd) Ff($ffopensans)">{bodyText}</div>
    </div>
  );
  return (
    <div className="Ff($ffmanrope) D(f) Ai(c) Jc(c) My(5%)" key={number}>
      {odd && <Body />}
      <div className="W(21vw)">
        <img src={image} className="W($full)" />
      </div>
      {!odd && <Body />}
    </div>
  );
};

const MobileCounterCard = ({ image, headerText, bodyText, number }) => {
  const odd = number % 2 === 1;
  return (
    <div className="Ff($ffmanrope) Ta(c) Mb($xl) Mx(a)" key={number}>
      <div className="My($lg)">
        <img src={image} className="W($full)" />
      </div>
      <div className="Maw($50xl)">
        <div className="Fz($smx) Mb($md)">{headerText}</div>
        <div className="Fz($smd) Ff($ffopensans)">{bodyText}</div>
      </div>
    </div>
  );
};

const Awesomeness = ({ mobile }) => {
  return (
    <div className={mobile ? 'Py($mmd) Px(10vw)' : 'Mx(21vw)'}>
      {CounterContent.map((obj, index) =>
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
  );
};

export default Awesomeness;
