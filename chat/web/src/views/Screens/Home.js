import { SignUpForm } from "../Forms/SignUpForm.js";
import { SignInForm } from "../Forms/SignInForm.js";
import { Button } from "../Buttons/Button.js";

import { SignInController } from "../../controller/signInController.js";
import { SignUpModel } from "../../model/sIgnUpModel.js";
import { SignUpController } from "../../controller/signUpController.js";

class Home extends HTMLElement {
  constructor() {
    super();

    this.SignUpForm = new SignUpForm();
    this.signUpModel = new SignUpModel();
    this.signUpController = new SignUpController(this.SignUpForm, this.signUpModel);
    this.SignInForm = new SignInForm();
  }
  connectedCallback() {
    this.enabled();
  }

  disconnectedCallback() {
    this.disabled();
  }
  changeState(state) {
    if (state == "login") {
      this.replaceChild(this.SignInForm, this.SignUpForm);
    }
    if (state == "register") {
      this.replaceChild(this.SignUpForm, this.SignInForm);
    }
  }
  enabled() {
    this.appendChild(this.SignUpForm);
  }

  disabled() {}
}

customElements.define("x-home", Home);

export { Home };
