import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker, { CalendarContainer } from 'react-datepicker';
import FormikInput from 'components/molecules/FormikInput';
import CustomHeader from './customHeader';
import 'react-datepicker/dist/react-datepicker.css';
import { datesAreOnSameDay } from 'utils/helper';
import isEmpty from 'lodash/isEmpty';
import { date } from 'yup';
const CalendarInput = ({
  label,
  name,
  id,
  dimensionClasses,
  onChange,
  error,
  setUpstreamDate,
  value,
  minDate,
  dateFormat,
  selectYear,
  maxDate,
}) => {
  const [startDate, setStartDate] = useState(value ? new Date(value) : '');

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
      readOnly={true}
    />
  ));
  const renderDayContents = (day, date) => {
    const sameDay = datesAreOnSameDay(date) ? 'Bgc(black) C($iconBlue)' : '';
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

  const datePickerProps = {
    selected: startDate,
    dateFormat,
    onChange: date => {
      const newDate = new Date(date.setHours(date.getHours() + 7));
      setStartDate(newDate);
      setUpstreamDate(newDate);
    },
    calendarContainer: MyContainer,
    customInput: <ExampleCustomInput />,
    minDate,
    maxDate,
    renderCustomHeader: selectYear ? CustomHeader : undefined,
    // renderDayContents={renderDayContents}
    dayClassName: date => {
      const today = datesAreOnSameDay(date)
        ? 'C($iconBlue)! Fw($fwbold)! Bgc($navBarBg)!'
        : '';
      const selected =
        startDate && datesAreOnSameDay(date, startDate)
          ? 'Bgc($iconBlue)! C(white)!'
          : '';
      return `Bgc($hoverInput):h Bdrs(0)! Fz(0.875rem) ${today} ${selected}`;
    },
  };
  return <DatePicker {...datePickerProps} />;
};

CalendarInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  dimensionClasses: PropTypes.string,
  onChange: PropTypes.func,
};

CalendarInput.defaultProps = {
  minDate: new Date(),
  onChange: () => {},
  dateFormat: 'dd/MM/yyyy',
  selectYear: false,
};
export default CalendarInput;
