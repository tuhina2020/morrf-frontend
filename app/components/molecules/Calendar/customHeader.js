import React from 'react';
import BaseIcon from 'components/atoms/BaseIcon';
const CustomHeader = ({
  date,
  changeYear,
  changeMonth,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}) => {
  const years = [];

  const currentYear = new Date().getFullYear();
  for (let i = currentYear - 30; i <= currentYear; i++) {
    years.push(i);
  }
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return (
    <div className="D(f) Jc(sb) M($sm)">
      <button
        type="button"
        onClick={decreaseMonth}
        disabled={prevMonthButtonDisabled}
        className="Bd(n) Bd(n):a"
      >
        <BaseIcon
          icon="showmore"
          iconClasses="W($lg) H($lg) Rotate(90deg) Bgc($hoverInput):h Bdrs($half)"
        />
      </button>
      <select
        value={date.getFullYear()}
        className="Ff($manrope) Bd(n) Bgc($calendarGrey) Fz($md) Bgc($hoverInput):h"
        onChange={({ target: { value } }) => changeYear(value)}
      >
        {years.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <select
        value={months[date.getMonth()]}
        className="Ff($manrope) Bd(n) Bgc($calendarGrey) Fz($md) Bgc($hoverInput):h"
        onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
      >
        {months.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <button
        type="button"
        onClick={increaseMonth}
        disabled={nextMonthButtonDisabled}
        className="Bd(n) Bd(n):a"
      >
        <BaseIcon
          icon="showmore"
          iconClasses="W($lg) H($lg) Rotate(-90deg) Bgc($hoverInput):h Bdrs($half)"
        />
      </button>
    </div>
  );
};

export default CustomHeader;
