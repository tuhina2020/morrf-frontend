import React from 'react';
import PropTypes from 'prop-types';

class EmailContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      submitButton: 'C($primaryDarkGrey) Bgc(white)',
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validEmail({ email }) {
    const lastAtPos = email.lastIndexOf('@');
    const lastDotPos = email.lastIndexOf('.');

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

  handleEmailChange(e) {
    const email = e.target.value;
    this.setState({
      email,
    });
    const valid = this.validEmail({ email });
    this.setState({
      submitButton: valid
        ? 'Bgc($themeColor) C(white) Fw($fwbold)'
        : 'C($primaryDarkGrey) Bgc(white)',
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email } = this.state;
    if (!email || email.length === 0) return;
    this.props.onSubmitForm({ email });
    this.state.email = '';
  }

  onFocus(e) {
    e.target.classList.add('C($primary)::ph');
    e.target.classList.remove('C($primaryDarkGrey)::ph');
  }

  onBlur(e) {
    e.target.classList.add('C($primaryDarkGrey)::ph');
    e.target.classList.remove('C($primary)::ph');
  }

  render() {
    return (
      <form className={this.props.formClass} onSubmit={this.handleSubmit}>
        <div className={this.props.containerClass}>
          <input
            type="email"
            name="email"
            autoComplete="off"
            placeholder={this.props.placeholder}
            className={`Trsdu(1s) Trsp(a) Trstf(e) ${this.props.inputClass}`}
            value={this.state.email}
            onChange={this.handleEmailChange}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
          />
        </div>
        <input
          type="submit"
          className={`Trsdu(0.4s) Trsp(a) Trstf(e) ${this.props.submitClass} ${
            this.state.submitButton
          }`}
          value="Submit"
        />
      </form>
    );
  }
}

EmailContainer.propTypes = {
  placeholder: PropTypes.string,
  containerClass: PropTypes.string,
  inputClass: PropTypes.string,
  submitClass: PropTypes.string,
  formClass: PropTypes.string,
  onSubmitForm: PropTypes.func,
};

EmailContainer.defaultProps = {
  placeholder: 'Email address',
  containerClass: 'W(20%) Mend(2vw)',
  inputClass: 'Bd(n) Bdb($bdnewGrey) W(100%)',
  submitClass: 'Bdrs(1vw) W(5vw) H(2vw) C($primaryDarkGrey) Bd($bdnewGrey)',
  formClass: 'D(f) Ai(b)',
  onSubmitForm: () => {},
};
export default EmailContainer;
