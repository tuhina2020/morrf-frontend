import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker, { CalendarContainer, subDays } from 'react-datepicker';
import FormikInput from 'components/molecules/FormikInput';
import 'react-datepicker/dist/react-datepicker.css';
import { datesAreOnSameDay } from 'utils/helper';
const CalendarInput = ({
  label,
  name,
  id,
  dimensionClasses,
  onChange,
  error,
  setUpstreamDate,
  value,
}) => {
  const [startDate, setStartDate] = useState(value || undefined);
  const ExampleCustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <FormikInput
      label={label}
      name={name}
      id={id}
      value={value}
      error={error}
      ref={ref}
      dimensionClasses={dimensionClasses}
      onClick={onClick}
      onChange={onChange}
    />
  ));
  const renderDayContents = (day, date) => {
    const sameDay = datesAreOnSameDay(date) ? 'Bgc(black) C(white)' : '';
    const selected =
      startDate && datesAreOnSameDay(date, startDate)
        ? 'Bgc($iconBlue) C(white)'
        : '';
    return (
      <div
        className={sameDay + ' W($xxl) H($xxl) Bgc($hoverInput):h Fz(0.875rem)'}
      >
        {day}
      </div>
    );
  };

  const MyContainer = ({ className, children }) => {
    return (
      <CalendarContainer className="W($full) H(0) Pb($full) Ff($ffmanrope)">
        <div className="W($full) Bgc($navBarBg) Bxsh($bxshcalendar) Bdrs($xxs)">
          {children}
        </div>
      </CalendarContainer>
    );
  };
  return (
    <DatePicker
      selected={startDate}
      dateFormat="dd/MM/yyyy"
      onChange={date => {
        const newDate = new Date(date.setHours(date.getHours() + 7));
        setStartDate(newDate);
        setUpstreamDate(newDate);
      }}
      calendarContainer={MyContainer}
      customInput={<ExampleCustomInput />}
      minDate={new Date()}
      // renderDayContents={renderDayContents}
      dayClassName={date => {
        const today = datesAreOnSameDay(date)
          ? 'C($iconBlue)! Fw($fwbold)! Bgc($navBarBg)!'
          : '';
        const selected =
          startDate && datesAreOnSameDay(date, startDate)
            ? 'Bgc($iconBlue)! C(white)!'
            : '';
        return `Bgc($hoverInput):h Bdrs(0)! Fz(0.875rem) ${today} ${selected}`;
      }}
    />
  );
};
CalendarInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  dimensionClasses: PropTypes.string,
  onChange: PropTypes.func,
};
export default CalendarInput;
