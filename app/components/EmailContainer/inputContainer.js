import React from 'react';
import PropTypes from 'prop-types';
// import { check as Check, erroroutline as ErrorOutline } from 'Assets/svg-comp';

class InputContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      dynamicPlaceholderStyle: props.placeholderStyle.inactive,
      active: false,
      // labelStyle: 'C($primary) Trsdu(0.4s) Trsp(a) Trstf(e)',
    };
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }

  validEmail({ email }) {
    const lastAtPos = email.lastIndexOf('@');
    const lastDotPos = email.lastIndexOf('.');
    if (email.length === 0) return false;
    if (
      !(
        lastAtPos < lastDotPos &&
        lastAtPos > 0 &&
        email.indexOf('@@') === -1 &&
        lastDotPos > 2 &&
        email.length - lastDotPos > 2
      )
    ) {
      return false;
    }
    return true;
  }

  componentDidUpdate(prevProps) {
    if (this.props.resetForm && !prevProps.resetForm) {
      /* eslint-disable react/no-did-update-set-state */
      this.setState({
        inputValue: '',
        dynamicPlaceholderStyle: this.props.placeholderStyle.inactive,
        active: false,
        // labelStyle: 'C($primary) Trsdu(0.4s) Trsp(a) Trstf(e)',
      });
      this.props.resetFormHandler();
    }
  }

  handleFieldChange(e) {
    const { value } = e.target;
    const { name } = this.props;
    this.setState({
      inputValue: value,
      active: value.length > 0,
    });
    this.props.changeHandler({ key: name, value });
  }

  onFocus() {
    const { placeholderStyle, focusHandler } = this.props;
    const { inputValue } = this.state;

    this.setState({
      dynamicPlaceholderStyle: placeholderStyle.active,
      active: inputValue.length > 0,
    });

    focusHandler();
  }

  onBlur() {
    const { placeholderStyle, blurHandler } = this.props;
    const { inputValue } = this.state;
    this.setState({
      dynamicPlaceholderStyle: placeholderStyle.inactive,
      active: inputValue.length > 0,
    });

    blurHandler();
  }

  render() {
    const { inputValue, dynamicPlaceholderStyle, active } = this.state;
    const {
      inputClass,
      containerClass,
      placeholderStyle: { common },
      type,
      name,
      placeholder,
      labelStyle,
    } = this.props;
    return (
      <div className={containerClass}>
        <label className="W(100%)">
          <div
            className={`${
              active ? '' : 'Op(0)'
            } Trsdu(0.4s) Trsp(a) Trstf(e) ${labelStyle}`}
          >
            {placeholder}
          </div>
          <input
            type={type}
            name={name}
            autoComplete="off"
            placeholder={placeholder}
            className={`Trsdu(1s) Trsp(a) Trstf(e) ${dynamicPlaceholderStyle} ${inputClass} ${common}`}
            value={inputValue}
            onChange={this.handleFieldChange}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
          />
        </label>
      </div>
    );
  }
}

InputContainer.propTypes = {
  inputClass: PropTypes.string,
  containerClass: PropTypes.string,
  placeholderStyle: PropTypes.object,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  changeHandler: PropTypes.func,
  resetForm: PropTypes.bool,
  resetFormHandler: PropTypes.func,
  blurHandler: PropTypes.func,
  focusHandler: PropTypes.func,
  labelStyle: PropTypes.string,
};

InputContainer.defaultProps = {
  containerClass: 'W(20%) Mend(2vw)',
  inputClass: 'Bd(n) Bdb($bdnewGrey) W(100%)',
  changeHandler: () => {},
  blurHandler: () => {},
  focusHandler: () => {},
};
export default InputContainer;
