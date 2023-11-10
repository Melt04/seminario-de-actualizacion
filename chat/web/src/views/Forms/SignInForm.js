import { CustomInput } from "../Inputs/CustomInput.js";
import { Button } from "../Buttons/Button.js";
/* import { MessageLabel } from "../MessageLabel/MessageLabel.js"; */

class SignInForm extends HTMLElement {
  constructor() {
    super();
    this.classList.add("form-box");
    this.containerForm = document.createElement("div");
    this.usernameInput = new CustomInput("Username", true, "Ingrese tu usuario...", "text");
    this.passwordInput = new CustomInput("Password", true, "Ingresa tu contrasenia...", "password");
    this.containerForm.appendChild(this.usernameInput);
    this.containerForm.appendChild(this.passwordInput);
    this.loginButton = new Button("sign in", "bttn");
    this.registerButton = new Button("sign up", "bttn");
    /* this.messageLabel = new MessageLabel(); */
  }
  render() {
    this.containerForm.appendChild(this.loginButton);
    this.containerForm.appendChild(this.registerButton);
    /* this.containerForm.appendChild(this.messageLabel); */
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
  disconnectedCallback() {}
}

customElements.define("x-signinform", SignInForm);

export { SignInForm };
