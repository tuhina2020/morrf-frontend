import React from 'react';
import PropTypes from 'prop-types';
import sortBy from 'lodash/sortBy';
import { erroroutline as ErrorOutline } from 'Assets/svg-comp';
import { COMING_SOON_INPUT_BOX_STYLES } from 'utils/css';

class InputContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      dynamicPlaceholderStyle:
        COMING_SOON_INPUT_BOX_STYLES.placeholderStyle.inactive,
      active: false,
      valid: props.validObject.valid,
    };
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.onFocusBlur = this.onFocusBlur.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.resetForm && !prevProps.resetForm) {
      /* eslint-disable react/no-did-update-set-state */
      this.setState({
        inputValue: '',
        dynamicPlaceholderStyle:
          COMING_SOON_INPUT_BOX_STYLES.placeholderStyle.inactive,
        active: false,
      });
      this.props.resetFormHandler();
    }
  }

  handleFieldChange(e) {
    const { value } = e.target;
    console.log('UPDATE TO ~~~ ', value);
    const { changeHandler, styleChangesHandler, stateKey } = this.props;
    this.setState({
      inputValue: value,
      active: value.length > 0,
    });
    changeHandler({ key: stateKey, value });
    styleChangesHandler();
  }

  onFocusBlur({ focus = true }) {
    const { styleChangesHandler } = this.props;
    const {
      placeholderStyle: { active, inactive },
    } = COMING_SOON_INPUT_BOX_STYLES;
    const { inputValue } = this.state;

    this.setState({
      dynamicPlaceholderStyle: focus ? active : inactive,
      active: inputValue.length > 0,
    });

    styleChangesHandler();
  }

  currentError({ validObject }) {
    console.log(validObject, 'FIND ERROR');
    const newValidObj = { ...validObject };
    delete newValidObj.valid;
    return sortBy(Object.values(newValidObj), 'priority')[0];
  }

  render() {
    const { inputValue, dynamicPlaceholderStyle, active } = this.state;

    const {
      placeholderStyle: { common },
      inputClass,
      labelStyle,
    } = COMING_SOON_INPUT_BOX_STYLES;
    const { containerClass, type, name, placeholder, validObject } = this.props;

    const currentError = this.currentError({ validObject });
    return (
      <div>
        <label className="W(100%)" htmlFor={name}>
          <div
            className={`${
              active ? '' : 'Op(0)'
            } Trsdu(0.4s) Trsp(a) Trstf(e) ${labelStyle}`}
          >
            {placeholder}
          </div>
          <div className="Mend(1vw)">
            <div className="D(f) Bdb($bdnewGrey)">
              <input
                type={type}
                name={name}
                autoComplete="off"
                placeholder={placeholder}
                className={`Trsdu(1s) Trsp(a) Trstf(e) ${dynamicPlaceholderStyle} ${inputClass} ${common}`}
                value={inputValue}
                onChange={this.handleFieldChange}
                onFocus={this.onFocusBlur}
                onBlur={() => this.onFocusBlur(false)}
              />
              <ErrorOutline
                width="1vw"
                className={`C($themeColor) Mstart(0.5vw) Trsdu(0.5s) Trsp(a) Trstf(e) ${
                  !validObject.valid ? 'Op(1)' : 'Op(0)'
                }`}
              />
            </div>
          </div>
        </label>
        <div
          className={`Trsdu(0.4s) Trsp(a) Trstf(e) Ta(e) Mend(1vw) ${labelStyle} ${
            currentError && currentError.errorMsg ? 'Op(1)' : 'Op(0)'
          }`}
        >
          {currentError && currentError.errorMsg}
        </div>
      </div>
    );
  }
}

InputContainer.propTypes = {
  inputClass: PropTypes.string,
  containerClass: PropTypes.string,
  placeholderStyle: PropTypes.object,
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
