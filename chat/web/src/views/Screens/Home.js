import { Modal } from "../Forms/ModalWindow.js";
import { SignUpForm } from "../Forms/SignUpForm.js";
import { SignInForm } from "../Forms/SignInForm.js";
import { Button } from "../Buttons/Button.js";

import { SignInController } from "../../controller/signInController.js";
import { SignUpModel } from "../../model/sIgnUpModel.js";
import { SignUpController } from "../../controller/signUpController.js";

class Home extends HTMLElement {
  constructor() {
    super();
    this.modalWindow = new Modal();
    this.SignUpForm = new SignUpForm();
    this.signUpModel = new SignUpModel();
    this.signUpController = new SignUpController(this.SignUpForm, this.signUpModel);
    this.signUpController = this.SignInForm = new SignInForm();
    this.changeStateButton = new Button("CAMBIO");
    this.modalWindow.setMessage("Hello, World!");
    this.modalWindow.setModalTitle("Modal Title");
    /* document.addEventListener("user-register", () => ); */
  }

  connectedCallback() {
    this.enabled();
    document.addEventListener("stateChange", (event) => {
      const newState = event.detail.newState;
      if (newState === "signin") {
        this.replaceChild(this.SignUpForm, this.SignInForm);
      }
      if (newState === "login") {
        this.replaceChild(this.SignInForm, this.SignUpForm);
      }
    });
  }

  disconnectedCallback() {
    this.disabled();
  }
  changeStateLogin() {}
  enabled() {
    /* this.appendChild(this.chat); */
    /* this.appendChild(this.SignUpForm); */

    /* this.appendChild(this.SignInForm); */
    this.appendChild(this.changeStateButton);
    this.addEventListener("accepted-modal-window-event", () => {
      this.removeChild(this.modalWindow);
    });
    this.addEventListener("declined-modal-window-event", () => {
      this.removeChild(this.modalWindow);
    });
  }

  disabled() {}
}

customElements.define("x-home", Home);

export { Home };
