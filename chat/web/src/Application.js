import { HomeModel } from "./model/homeModel.js";
import { Button } from "./views/Buttons/Button.js";
import { Home } from "./views/Screens/Home.js";
import { HomeController } from "./controller/homeController.js";

import { ChatContainer } from "./views/Screens/ChatScreen.js";
import { ChatContainerController } from "./controller/chatContainerController.js";
import { ChatContainerModel } from "./model/chatContainerModel.js";

class Application extends HTMLElement {
  constructor() {
    super();
    this.classList.add("app");
    this.Button = new Button("pepe");
    this.home = new Home();
    this.homeController = new HomeController(this.home, new HomeModel());
    this.chatContainer = new ChatContainer();
    this.chatContainerModel = new ChatContainerModel();
    this.chatContainerController = new ChatContainerController(this.chatContainer, this.chatContainerModel);
    document.addEventListener("user-register", () => this.onChangeRegister());
  }

  connectedCallback() {
    /* this.append(this.home); */
    /* this.append(this.chatContainer);
    this.chatContainerController.init(); */
    /* setTimeout(() => {
      this.removeChild(loader);
      this.unlogedNavBarController.enable();
      this.appendChild(this.unlogedNavBar);
      this.setCallbacks();
    }, 2500); */
    this.append(this.chatContainer);
    this.chatContainerController.init();
  }
  onChangeRegister() {
    this.replaceChild(this.chatContainer, this.home);
  }

  /*   setCallbacks() {
    window.addEventListener("home-button-navbar-event", () => {
      this.onViewChangeHome();
    });
    window.addEventListener("login-button-navbar-event", () => {
      this.onViewChangeLogin();
    });
    window.addEventListener("register-button-navbar-event", () => {
      this.onViewChangeRegister();
    });
    window.addEventListener("register-button-signIn-event", () => {
      this.onViewChangeRegister();
    });
    window.addEventListener("logged-event", () => {
      this.onViewChangeLoggedHome();
    });
  } */

  /* onViewChangeHome() {
    if (this.viewReference) {
      this.removeChild(this.viewReference);
    }
    this.viewReference = new Home();
    this.appendChild(this.viewReference);
  }

  onViewChangeLogin() {
    if (this.viewReference) {
      this.removeChild(this.viewReference);
    }
    this.viewReference = ne
    w Login();
    this.appendChild(this.viewReference);
  }

  onViewChangeRegister() {
    if (this.viewReference) {
      this.removeChild(this.viewReference);
    }
    this.viewReference = new Register();
    this.appendChild(this.viewReference);
  }

  onViewChangeLoggedHome() {
    if (this.viewReference) {
      this.removeChild(this.viewReference);
      this.removeChild(this.unlogedNavBar);
    }
    this.viewReference = new UserHome();
    this.appendChild(this.viewReference);
  } */
}

customElements.define("x-application", Application);

export { Application };
