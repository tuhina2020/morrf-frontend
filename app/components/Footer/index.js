import { morrflogo as MorrfLogo } from 'Assets/svg-comp';
import React from 'react';
import { Link } from 'react-router-dom';
import EmailContainer from 'components/EmailContainer';

export default function Footer({ onSubmitForm }) {
  const emailPropsBottom = {
    placeholder: 'Email address',
    containerClass: 'Mend(2vw) W(25%)',
    inputClass:
      'Bd(n) Bdb($bdnewGrey) Bd(n):a Bgc(#ededed):a C($primary):a W(100%) Pt(8%) Pb(2%) Bgc(#ededed) Ff($ffmont) Fz(0.8vw) Ff($ffmont)::ph Fz(0.8vw)::ph C($primaryDarkGrey)::ph',
    submitClass:
      'Bdrs(0.2vw) W(5vw) H(2vw) Bd($bdnewGrey) Ff($ffmont) Fz(0.8vw) Bgc(#ededed)',
    formClass: 'D(f) Ai(b) Py(2vw)',
    inactiveButton: 'Bgc(#ededed)',
    onSubmitForm,
  };
  return (
    <div className="Bgc(#ededed) Pt(2vw) Pb(1vw) Px(8vw)">
      <div className="Fz($fzsubheading) Fw($fwmedium)">
        Get the update from us when we launch
      </div>
      <EmailContainer {...emailPropsBottom} />
      <div className="Fz($fzcaption)">&copy; 2020 Morff</div>
    </div>
  );
}
