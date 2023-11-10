import { CustomInput } from "../Inputs/CustomInput.js";
import { Button } from "../Buttons/Button.js";
/* import { MessageLabel } from "../MessageLabel/MessageLabel.js"; */

class SignUpForm extends HTMLElement {
  constructor() {
    console.log("aa");
    super();
    this.classList.add("form-box");
    this.containerForm = document.createElement("div");
    this.lastNameInput = new CustomInput("Last Name", true, "ingrese apellido", "text");
    this.nameInput = new CustomInput("Name", true, "ingrese nombre", "text");
    this.emailInput = new CustomInput("Email", true, "ingrese email", "text");
    this.passwordInput = new CustomInput("Password", true, "ingrese password", "password");

    this.registerButton = new Button("register", "bttn");

    this.containerForm.appendChild(this.nameInput);
    this.containerForm.appendChild(this.lastNameInput);
    this.containerForm.appendChild(this.emailInput);
    this.containerForm.appendChild(this.passwordInput);
    this.containerForm.appendChild(this.registerButton);
  }

  getInputUserNameValue() {
    return this.usernameInput.getInputValue();
  }

  getInputPasswordValue() {
    return this.passwordInput.getInputValue();
  }

  getInputNameValue() {
    return this.nameInput.getInputValue();
  }

  getInputSurnameValue() {
    return this.surnameInput.getInputValue();
  }

  getInputDniValue() {
    return this.dniInput.getInputValue();
  }

  getInputGenderValue() {
    return this.genderInput.getInputValue();
  }

  getInputTelephoneValue() {
    return this.telephoneInput.getInputValue();
  }

  getMessageLabelReference() {
    return this.messageLabel.message;
  }

  setValueMessageLabel(value) {
    this.messageLabel.setMessage(value);
  }

  render() {
    this.appendChild(this.containerForm);
    let style = document.createElement("style");
    style.innerText = `@import './style/Form.css'`;
    this.appendChild(style);
  }

  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {
    console.log("signup disconect");
    this.registerButton.disconnectedCallback();
  }
}

customElements.define("x-signupform", SignUpForm);

export { SignUpForm };
