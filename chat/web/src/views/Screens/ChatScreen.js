import { ChatApp } from "./Chat.js";
import { UserList } from "../UserList/userList.js";
import { Button } from "../Buttons/Button.js";

class ChatContainer extends HTMLElement {
  constructor() {
    super();
    this.chat = new ChatApp();
    this.userList = new UserList();
    this.classList.add("chat-screen");
    this.button = new Button("test");
  }

  connectedCallback() {
    this.append(this.chat);
    this.append(this.userList);
    document.addEventListener("update-user-list", (event) => {
      const users = event.detail.users;
      console.log(users);
      this.userList.setUsers(users);
    });
  }
}

customElements.define("chat-container", ChatContainer);

export { ChatContainer };
