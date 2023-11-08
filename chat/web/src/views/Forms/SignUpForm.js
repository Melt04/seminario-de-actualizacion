import { CustomInput } from "../Inputs/CustomInput.js";
import { Button } from "../Buttons/Button.js";
/* import { MessageLabel } from "../MessageLabel/MessageLabel.js"; */

class SignUpForm extends HTMLElement {
  constructor() {
    super();
    this.classList.add("form-box");
    this.containerForm = document.createElement("div");
    this.usernameInput = new CustomInput("Username", true, "ingrese nombre", "text");
    this.passwordInput = new CustomInput("Password", true, "ingrese password", "password");
    this.nameInput = new CustomInput("Name", true, "ingrese nombre", "text");
    this.surnameInput = new CustomInput("Surname", true, "ingrese apellido", "text");
    this.dniInput = new CustomInput("Dni", true, "ingrese dni", "text");
    this.genderInput = new CustomInput("Gender", true, "ingrese genero", "text");
    this.telephoneInput = new CustomInput("Telephone", true, "ingrese telefono", "text");
    this.registerButton = new Button("register", "bttn");
    /* this.messageLabel = new MessageLabel(); */

    this.containerForm.appendChild(this.usernameInput);
    this.containerForm.appendChild(this.passwordInput);
    this.containerForm.appendChild(this.nameInput);
    this.containerForm.appendChild(this.surnameInput);
    this.containerForm.appendChild(this.dniInput);
    this.containerForm.appendChild(this.genderInput);
    this.containerForm.appendChild(this.telephoneInput);
    this.containerForm.appendChild(this.registerButton);
    /* this.containerForm.appendChild(this.messageLabel); */
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
    this.registerButton.disconnectedCallback();
  }
}

customElements.define("x-signupform", SignUpForm);

export { SignUpForm };
