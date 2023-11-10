import { CustomInput } from "../Inputs/CustomInput.js";
import { Button } from "../Buttons/Button.js";
/* import { MessageLabel } from "../MessageLabel/MessageLabel.js"; */

class SignInForm extends HTMLElement {
  constructor() {
    super();
    this.classList.add("form-box");
    this.containerForm = document.createElement("div");
    this.emailInput = new CustomInput("Username", true, "Ingrese tu email...", "text");
    this.passwordInput = new CustomInput("Password", true, "Ingresa tu contrasenia...", "password");
    this.containerForm.appendChild(this.emailInput);
    this.containerForm.appendChild(this.passwordInput);
    this.loginButton = new Button("Log In", "bttn");
  }
  render() {
    this.containerForm.appendChild(this.loginButton);
    this.appendChild(this.containerForm);
    let style = document.createElement("style");
    style.innerText = `@import './style/Form.css'`;
    this.appendChild(style);
  }
  connectedCallback() {
    this.render();
  }
  getInputUserNameValue() {
    return this.usernameInput.getInputValue();
  }

  getInputPasswordValue() {
    return this.passwordInput.getInputValue();
  }
  disconnectedCallback() {
    console.log("signup disconect");
  }
}

customElements.define("x-signinform", SignInForm);

export { SignInForm };
