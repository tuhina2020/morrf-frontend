import React from 'react';
import PropTypes from 'prop-types';
import { check as Check } from 'Assets/svg-comp';
import {
  getInputBoxStyles,
  getInputFieldDetails,
  FLEX_CENTER_END,
  FLEX_CENTER_CENTER,
  HIDDEN_STYLE,
} from 'utils/css';
import { bulkValidation, getTransitionClass } from 'utils/helper';

import InputContainer from './inputContainer';

class EmailContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      filled: false,
      resetForm: false,
      validObject: {
        name: {
          valid: true,
        },
        email: {
          valid: true,
        },
      },
      INPUT_BOX_STYLES: getInputBoxStyles(props.isDesktopOrLaptop),
      inputDetails: getInputFieldDetails(props.isDesktopOrLaptop),
      dynamicSubmitStyle: getInputBoxStyles(props.isDesktopOrLaptop).submitStyle
        .inactive,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fieldStyleChanges = this.fieldStyleChanges.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.renderNew = this.renderNew.bind(this);
    this.updateState = this.updateState.bind(this);
    this.getNewForm = this.getNewForm.bind(this);
    this.validateFields = this.validateFields.bind(this);
  }

  validateFields(update = true) {
    const { inputDetails } = this.state;
    const validObject = {};
    inputDetails.forEach(inputDetail => {
      const { key, validationObj } = inputDetail;
      validObject[key] = bulkValidation({
        data: this.state[key],
        validationObj,
      });
    });
    if (update) this.setState({ validObject });
    return validObject;
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.filled) {
    } else {
      const validObject = this.validateFields();
      if (!validObject.name.valid || !validObject.email.valid) return;
      const { name, email, INPUT_BOX_STYLES } = this.state;
      this.props.onSubmitForm({ email, name });
      const {
        submitStyle: { clicked },
      } = INPUT_BOX_STYLES;
      this.setState({ dynamicSubmitStyle: clicked });
      setTimeout(() => {
        this.setState({ resetForm: true });
      }, 500);
    }
  }

  fieldStyleChanges() {
    const { email, name, INPUT_BOX_STYLES, filled } = this.state;
    const {
      submitStyle: { active, inactive },
    } = INPUT_BOX_STYLES;

    this.setState({
      dynamicSubmitStyle:
        (email.length > 0 || name.length > 0) && filled ? active : inactive,
    });
    // const validObject = this.validateFields();
  }

  renderNew() {
    const {
      INPUT_BOX_STYLES: {
        submitStyle: { success, active },
      },
      resetForm,
    } = this.state;

    const { isDesktopOrLaptop, submitSuccessStyle = '' } = this.props;

    return (
      <div
        className={`${resetForm ? submitSuccessStyle : HIDDEN_STYLE.NO_HEIGHT}
          ${FLEX_CENTER_END} Pos(r)  ${getTransitionClass(0.5)}`}
      >
        <div
          className={`${getTransitionClass(1)} ${
            isDesktopOrLaptop ? 'Mend(0.5vw)' : ''
          } Ff($ffmont) ${FLEX_CENTER_CENTER}`}
        >
          <div className={isDesktopOrLaptop ? 'Mend(0.5vw)' : 'Mend(3vw)'}>
            Successfully Submitted
          </div>
          <Check width={isDesktopOrLaptop ? '1.5vw' : '6vw'} fill="#ff0356" />
        </div>
        <form
          onSubmit={this.getNewForm}
          className={isDesktopOrLaptop ? 'Mstart(1vw)' : 'Mt(5vw)'}
        >
          <input
            type="submit"
            className={`${success} ${active}`}
            value="Submit another email id"
          />
        </form>
      </div>
    );
  }

  getNewForm(e) {
    e.preventDefault();
    const {
      INPUT_BOX_STYLES: {
        submitStyle: { inactive },
      },
    } = this.state;
    this.setState({ dynamicSubmitStyle: inactive, name: '', email: '' });
    setTimeout(() => {
      this.setState({ resetForm: false });
    }, 500);
  }

  updateState({ key, value }) {
    const { validObject } = this.state;
    if (!validObject[key].valid) {
      this.validateFields();
    }
    this.setState({
      [key]: value,
      filled: true,
    });
  }

  renderForm() {
    const {
      dynamicSubmitStyle,
      resetForm,
      inputDetails,
      validObject,
      INPUT_BOX_STYLES: {
        submitStyle: { common },
      },
    } = this.state;
    const { formClass, containerClass, isDesktopOrLaptop } = this.props;
    return (
      <div
        className={`${isDesktopOrLaptop ? 'Mt(3vw)' : ''} ${
          resetForm ? HIDDEN_STYLE.NO_HEIGHT : ''
        } ${getTransitionClass(0.5)}`}
      >
        <form className={formClass} onSubmit={this.handleSubmit} noValidate>
          <div
            className={
              containerClass + (resetForm ? ` ${HIDDEN_STYLE.NO_HEIGHT}` : '')
            }
          >
            {inputDetails.map(inputDetail => (
              <div key={inputDetail.key} className={inputDetail.style}>
                <InputContainer
                  containerClass={containerClass}
                  {...inputDetail}
                  resetForm={resetForm}
                  validObject={validObject[inputDetail.stateKey]}
                  changeHandler={this.updateState}
                  styleChangesHandler={this.fieldStyleChanges}
                  isDesktopOrLaptop={isDesktopOrLaptop}
                  INPUT_BOX_STYLES={this.state.INPUT_BOX_STYLES}
                />
              </div>
            ))}
          </div>
          {this.props.isDesktopOrLaptop}
          <input
            type="submit"
            className={`${getTransitionClass()} ${dynamicSubmitStyle} ${common}`}
            value="Submit"
          />
        </form>
      </div>
    );
  }

  render() {
    return (
      <>
        {this.renderForm()}
        {this.renderNew()}
      </>
    );
  }
}

EmailContainer.propTypes = {
  containerClass: PropTypes.string,
  formClass: PropTypes.string,
  onSubmitForm: PropTypes.func,
  isDesktopOrLaptop: PropTypes.bool,
  submitSuccessStyle: PropTypes.string,
  inputClass: PropTypes.string,
};

EmailContainer.defaultProps = {
  onSubmitForm: () => {},
};
export default EmailContainer;
