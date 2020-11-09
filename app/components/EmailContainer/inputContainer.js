import React from 'react';
import PropTypes from 'prop-types';
import sortBy from 'lodash/sortBy';
import { warning as Warning } from 'Assets/svg-comp';
import { getTransitionClass } from 'utils/helper';
import { HIDDEN_STYLE } from 'utils/css';

class InputContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
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
        active: false,
      });
    }
  }

  handleFieldChange(e) {
    const { value } = e.target;
    const { changeHandler, styleChangesHandler, stateKey } = this.props;
    this.setState({
      inputValue: value,
    });
    changeHandler({ key: stateKey, value });
    styleChangesHandler();
  }

  onFocusBlur(focus = true) {
    const { styleChangesHandler } = this.props;
    const { inputValue } = this.state;

    this.setState({
      active: focus || inputValue.length > 0,
    });

    styleChangesHandler();
  }

  currentError({ validObject }) {
    const newValidObj = { ...validObject };
    delete newValidObj.valid;
    return sortBy(Object.values(newValidObj), 'priority')[0];
  }

  render() {
    const { inputValue, active } = this.state;

    const {
      containerClass,
      type,
      name,
      validObject,
      placeholder,
      INPUT_BOX_STYLES: { inputClass, labelStyle },
      isDesktopOrLaptop,
    } = this.props;

    const currentError = this.currentError({ validObject });
    return (
      <div className={isDesktopOrLaptop ? '' : 'H(19vw)'}>
        <label className="W($full)" htmlFor={name}>
          <div
            className={`Pos(r) ${
              active
                ? `${labelStyle.active} T(0vw)`
                : labelStyle.inactive +
                  (isDesktopOrLaptop ? ' T(1.1vw)' : ' T(5vw)')
            } ${getTransitionClass(0.5)}`}
          >
            {placeholder}
          </div>
          <div className={isDesktopOrLaptop ? 'Mend(1vw)' : 'Mb(1vw)'}>
            <div
              className={`D(f) ${
                isDesktopOrLaptop ? 'Bdb($bdnewGrey)' : 'Bdb($bdnewGrey)'
              }`}
            >
              <input
                type={type}
                name={name}
                autoComplete="off"
                placeholder=""
                className={`${getTransitionClass(1)} ${inputClass}`}
                value={inputValue}
                onChange={this.handleFieldChange}
                onFocus={this.onFocusBlur}
                onBlur={() => this.onFocusBlur(false)}
              />
              <Warning
                width={isDesktopOrLaptop ? '1vw' : '6vw'}
                className={`C($primary) ${
                  isDesktopOrLaptop ? 'Mstart(0.5vw)' : 'Mb(1vw)'
                }  ${getTransitionClass()} ${
                  !validObject.valid ? 'Op(1)' : HIDDEN_STYLE.NO_HEIGHT
                }`}
              />
            </div>
          </div>
        </label>
        <div
          className={`${getTransitionClass()} Ta(e) Mend(1vw) ${
            labelStyle.active
          } ${
            currentError && currentError.errorMsg
              ? 'Op(1)'
              : HIDDEN_STYLE.NO_HEIGHT
          }`}
        >
          {(currentError && currentError.errorMsg) || ''}
        </div>
      </div>
    );
  }
}

InputContainer.propTypes = {
  inputClass: PropTypes.string,
  containerClass: PropTypes.string,
  changeHandler: PropTypes.func,
  resetForm: PropTypes.bool,
  resetFormHandler: PropTypes.func,
  blurHandler: PropTypes.func,
  focusHandler: PropTypes.func,
  labelStyle: PropTypes.object,
};

InputContainer.defaultProps = {
  containerClass: 'W(20%) Mend(2vw)',
  inputClass: 'Bd(n) Bdb($bdnewGrey) W($full)',
  changeHandler: () => {},
  blurHandler: () => {},
  focusHandler: () => {},
};
export default InputContainer;
