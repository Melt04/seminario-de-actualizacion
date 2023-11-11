import { HomeModel } from "./model/homeModel.js";
import { Button } from "./views/Buttons/Button.js";
import { Home } from "./views/Screens/Home.js";
import { HomeController } from "./controller/homeController.js";

import { ChatContainer } from "./views/Screens/ChatScreen.js";
import { ChatContainerController } from "./controller/chatContainerController.js";
import { ChatContainerModel } from "./model/chatContainerModel.js";
import { NavbarComponent } from "./views/Navbar/navbar.js";
import { NavbarController } from "./controller/navbarController.js";
import { NavbarModel } from "./model/navbarModel.js";

class Application extends HTMLElement {
  constructor() {
    super();
    this.state = "logout";
    this.classList.add("app");
    this.navbar = new NavbarComponent();
    this.navbarModel = new NavbarModel();
    this.navbarController = new NavbarController(this.navbar, this.navbarModel);
    this.home = new Home();
    this.homeController = new HomeController(this.home, new HomeModel());
    this.chatContainer = new ChatContainer();
    this.chatContainerModel = new ChatContainerModel();
    this.chatContainerController = new ChatContainerController(this.chatContainer, this.chatContainerModel);
    document.addEventListener("user-register", () => {
      this.state = "logged";
      this.onChangeRegister();
      this.chatContainerController.init();
    });

    document.addEventListener("send-message", async (d) => {
      console.log("doc");
    });
    document.addEventListener("user-loged", () => {
      this.state = "logged";
      this.onChangeRegister();
      this.chatContainerController.init();
    });
    document.addEventListener("log-out", () => {
      this.state = "logout";
      localStorage.clear("x-session-token");
      this.replaceChild(this.home, this.chatContainer);
    });
  }

  connectedCallback() {
    this.append(this.navbar);
    this.append(this.home);
  }
  onChangeRegister() {
    this.replaceChild(this.chatContainer, this.home);
  }
  onChangeState(state) {
    if (state == "login") {
      this.replaceChild(this.si);
    }
  }
}

customElements.define("x-application", Application);

export { Application };
