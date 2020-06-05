import React from 'react';
import PropTypes from 'prop-types';
import uniq from 'lodash/uniq';
import { check as Check } from 'Assets/svg-comp';
import InputContainer from './inputContainer';
import { validateData } from 'utils/helper';
import { COMING_SOON_INPUT_BOX_STYLES, INPUT_FIELD_DETAILS } from 'utils/css';
import { bulkValidation } from '../../utils/helper';

class EmailContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      resetForm: false,
      validObject: {
        name: {
          valid: true,
        },
        email: {
          valid: true,
        },
      },
      inputDetails: [...INPUT_FIELD_DETAILS],
      dynamicSubmitStyle: COMING_SOON_INPUT_BOX_STYLES.submitStyle.inactive,
    };
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fieldStyleChanges = this.fieldStyleChanges.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.renderNew = this.renderNew.bind(this);
    this.updateState = this.updateState.bind(this);
    this.getNewForm = this.getNewForm.bind(this);
    this.successElement = React.createRef();
    this.resetForm = this.resetForm.bind(this);
    this.validateFields = this.validateFields.bind(this);
    this.fadeEmailForm = this.fadeEmailForm.bind(this);
  }

  handleFieldChange(e, { field }) {
    const { value } = e.target;
    const {
      submitStyle: { active, inactive },
    } = COMING_SOON_INPUT_BOX_STYLES;
    const { name, email } = this.state;
    this.setState({
      [field]: value,
      dynamicSubmitStyle:
        email.length > 0 || name.length > 0 || value.length > 0
          ? active
          : inactive,
    });
  }

  validateFields(update = true) {
    const { name, email, inputDetails } = this.state;
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
    const validObject = this.validateFields();
    if (!validObject.name.valid || !validObject.email.valid) return;
    const { name, email } = this.state;
    const {
      submitStyle: { clicked },
    } = COMING_SOON_INPUT_BOX_STYLES;
    this.props.onSubmitForm({ email, name });
    this.setState({ resetForm: true, dynamicSubmitStyle: clicked });
    setTimeout(this.fadeEmailForm, 100);
  }

  fadeEmailForm() {
    const successElement = this.successElement.current;
    const formElement = successElement.previousSibling;
    formElement.classList.add('Op(0)');
    formElement.classList.add('Z(-1)');
    setTimeout(() => {
      const {
        submitStyle: { inactive },
      } = COMING_SOON_INPUT_BOX_STYLES;
      successElement.classList.remove('Op(0)');
      successElement.classList.remove('Z(-1)');
      // this.setState({ dynamicSubmitStyle: inactive });
    }, 400);
  }

  fieldStyleChanges() {
    const {
      submitStyle: { active, inactive },
    } = COMING_SOON_INPUT_BOX_STYLES;
    const { email, name } = this.state;

    this.setState({
      dynamicSubmitStyle:
        email.length > 0 || name.length > 0 ? active : inactive,
    });
  }

  renderNew() {
    const {
      submitStyle: { success, active },
    } = COMING_SOON_INPUT_BOX_STYLES;
    return (
      <div
        className="D(f) Fz($fzsmall) Jc(e) Ai(c) Pos(r) T(-2vw) Trsdu(0.4s) Trsp(a) Trstf(e) Op(0) Z(-1)"
        ref={this.successElement}
      >
        <div className="D(f) Mend(2vw)">
          <div className="Mend(0.5vw) Ff($ffmont) Fz($fzcaption)">
            Successfully Submitted
          </div>
          <Check width="1vw" fill="#ff0356" />
        </div>
        <form onSubmit={this.getNewForm}>
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
    this.setState({ resetForm: false });
    const successElement = this.successElement.current;
    const formElement = successElement.previousSibling;
    successElement.classList.add('Op(0)');
    successElement.classList.add('Z(-1)');
    setTimeout(() => {
      formElement.classList.remove('Op(0)');
      formElement.classList.remove('Z(-1)');
    }, 400);
  }

  resetForm() {
    const {
      submitStyle: { inactive },
    } = COMING_SOON_INPUT_BOX_STYLES;
    this.setState({
      dynamicSubmitStyle: inactive,
      email: '',
      name: '',
    });
  }

  updateState({ key, value }) {
    const { validObject } = this.state;
    if (!validObject[key].valid) {
      this.validateFields();
    }
    this.setState({
      [key]: value,
    });
  }

  renderForm() {
    const {
      dynamicSubmitStyle,
      resetForm,
      inputDetails,
      validObject,
    } = this.state;
    const { formClass, containerClass } = this.props;
    const {
      submitStyle: { common },
    } = COMING_SOON_INPUT_BOX_STYLES;
    return (
      <form
        className={`${formClass} Trsdu(0.4s) Trsp(a) Trstf(e)`}
        onSubmit={this.handleSubmit}
        noValidate
      >
        <div className={containerClass}>
          {inputDetails.map(inputDetail => (
            <div key={inputDetail.key} className={inputDetail.style}>
              <InputContainer
                containerClass={containerClass}
                {...inputDetail}
                validObject={validObject[inputDetail.stateKey]}
                changeHandler={this.updateState}
                styleChangesHandler={this.fieldStyleChanges}
                resetFormHandler={this.resetForm}
                resetForm={resetForm}
              />
            </div>
          ))}
        </div>
        <input
          type="submit"
          className={`Trsdu(0.4s) Trsp(a) Trstf(e) ${dynamicSubmitStyle} ${common}`}
          value="Submit"
        />
      </form>
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
};

EmailContainer.defaultProps = {
  containerClass: 'W(20%) Mend(2vw)',
  inputClass: 'Bd(n) Bdb($bdnewGrey) W(100%)',
  onSubmitForm: () => {},
};
export default EmailContainer;
