import React from 'react';
import PropTypes from 'prop-types';
import { check as Check } from 'Assets/svg-comp';
import InputContainer from './inputContainer';

class EmailContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      resetForm: false,
      dynamicSubmitStyle: props.submitStyle.inactive,
      // labelStyle: 'C($primary) Trsdu(0.4s) Trsp(a) Trstf(e)',
    };
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.renderNew = this.renderNew.bind(this);
    this.updateState = this.updateState.bind(this);
    this.getNewForm = this.getNewForm.bind(this);
    this.successElement = React.createRef();
    this.resetForm = this.resetForm.bind(this);
  }

  handleFieldChange(e, { field }) {
    const { value } = e.target;
    const {
      submitStyle: { active, inactive },
    } = this.props;
    const { name, email } = this.state;
    this.setState({
      [field]: value,
      dynamicSubmitStyle:
        email.length > 0 && name.length > 0 && value.length > 0
          ? active
          : inactive,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, name } = this.state;
    this.setState({ resetForm: true });
    if (!email || email.length === 0 || !name || name.length === 0) return;
    this.props.onSubmitForm({ email, name });
    const successElement = this.successElement.current;
    const formElement = successElement.previousSibling;
    formElement.classList.add('Op(0)');
    formElement.classList.add('Z(-1)');
    setTimeout(() => {
      successElement.classList.remove('Op(0)');
      successElement.classList.remove('Z(-1)');
    }, 400);
  }

  onFocus() {
    const {
      submitStyle: { active },
    } = this.props;

    this.setState({
      dynamicSubmitStyle: active,
    });
  }

  onBlur() {
    const {
      submitStyle: { active, inactive },
    } = this.props;
    const { email, name } = this.state;
    this.setState({
      dynamicSubmitStyle:
        email.length > 0 && name.length > 0 ? active : inactive,
    });
  }

  renderNew() {
    const {
      submitStyle: { active, success },
    } = this.props;
    return (
      <div
        className="D(f) Fz($fzsmall) Jc(e) Ai(c) Pos(r) T(-2vw) Trsdu(0.4s) Trsp(a) Trstf(e) Op(0) Z(-1)"
        ref={this.successElement}
      >
        <div className="D(f) Mend(2vw)">
          <div className="Mend(0.5vw) Ff($ffmont) Fz(0.8vw)">
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
    } = this.props;
    this.setState({
      dynamicSubmitStyle: inactive,
      email: '',
      name: '',
    });
  }

  updateState({ key, value }) {
    const {
      submitStyle: { active, inactive },
    } = this.props;
    const { name, email } = this.state;
    this.setState({
      [key]: value,
      dynamicSubmitStyle:
        email.length > 0 || name.length > 0 ? active : inactive,
    });
  }

  renderForm() {
    const { dynamicSubmitStyle, resetForm } = this.state;
    const {
      formClass,
      inputClass,
      submitStyle,
      containerClass,
      placeholderStyle,
      inputDetails,
    } = this.props;
    return (
      <form
        className={`${formClass} Trsdu(0.4s) Trsp(a) Trstf(e)`}
        onSubmit={this.handleSubmit}
      >
        <div className={containerClass}>
          {/* <label htmlFor="email" className={labelStyle}>
            Email Address
          </label> */}
          {inputDetails.map(inputDetail => (
            <div key={inputDetail.key} className={inputDetail.widthStyle}>
              <InputContainer
                inputClass={inputClass}
                containerClass={containerClass}
                placeholderStyle={placeholderStyle}
                placeholder={inputDetail.placeholder}
                labelStyle={inputDetail.labelStyle}
                type={inputDetail.key}
                name={inputDetail.key}
                changeHandler={this.updateState}
                blurHandler={this.onBlur}
                focusHandler={this.onFocus}
                resetFormHandler={this.resetForm}
                resetForm={resetForm}
              />
            </div>
          ))}
        </div>
        <input
          type="submit"
          className={`Trsdu(0.4s) Trsp(a) Trstf(e) ${dynamicSubmitStyle} ${
            submitStyle.common
          }`}
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
  inputClass: PropTypes.string,
  submitStyle: PropTypes.object,
  formClass: PropTypes.string,
  onSubmitForm: PropTypes.func,
  placeholderStyle: PropTypes.object,
  inputDetails: PropTypes.array,
};

EmailContainer.defaultProps = {
  containerClass: 'W(20%) Mend(2vw)',
  inputClass: 'Bd(n) Bdb($bdnewGrey) W(100%)',
  formClass: 'D(f) Ai(fe) Jc(sb)',
  onSubmitForm: () => {},
  inputDetails: [],
};
export default EmailContainer;
