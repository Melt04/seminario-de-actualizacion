import { SignUpForm } from "../Forms/SignUpForm.js";
import { SignInForm } from "../Forms/SignInForm.js";
import { SignUpModel } from "../../model/sIgnUpModel.js";
import { SignUpController } from "../../controller/signUpController.js";
import { LoginController } from "../../controller/loginController.js";
import { LoginModel } from "../../model/loginModel.js";

class Home extends HTMLElement {
  constructor() {
    super();
    this.SignUpForm = new SignUpForm();
    this.signUpModel = new SignUpModel();
    this.signUpController = new SignUpController(this.SignUpForm, this.signUpModel);
    this.signInForm = new SignInForm();
    this.signInModel = new LoginModel();
    this.signInController = new LoginController(this.signInForm, this.signInModel);
    this.signInController.getInputValues();
  }
  connectedCallback() {
    console.log("connected");
    this.enabled();
  }

  disconnectedCallback() {
    this.disabled();
    this.childNodes.forEach((n) => {
      this.removeChild(n);
    });
  }
  changeState(state) {
    if (state == "login") {
      this.replaceChild(this.SignUpForm, this.signInForm);
    } else if (state == "register") {
      this.replaceChild(this.signInForm, this.SignUpForm);
    }
  }
  enabled() {
    this.appendChild(this.SignUpForm);
  }

  disabled() {}
}

customElements.define("x-home", Home);

export { Home };
