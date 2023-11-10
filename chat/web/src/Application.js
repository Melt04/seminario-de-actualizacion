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
    this.home = new Home();
    this.homeController = new HomeController(this.home, new HomeModel());
    this.chatContainer = new ChatContainer();
    this.chatContainerModel = new ChatContainerModel();
    this.chatContainerController = new ChatContainerController(this.chatContainer, this.chatContainerModel);
    document.addEventListener("user-register", () => this.onChangeRegister());
  }

  connectedCallback() {
    this.append(this.home);
  }
  onChangeRegister() {
    this.replaceChild(this.chatContainer, this.home);
  }
}

customElements.define("x-application", Application);

export { Application };
