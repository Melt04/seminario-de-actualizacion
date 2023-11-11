import { ChatApp } from "./Chat.js";
import { UserList } from "../UserList/userList.js";
import { Button } from "../Buttons/Button.js";
import { UserListController } from "../../controller/userListController.js";
import { UserListModel } from "../../model/userListModel.js";
import { ChatContainerController } from "../../controller/chatContainerController.js";
import { ChatModel } from "../../model/chatModel.js";
import { ChatController } from "../../controller/chatController.js";

class ChatContainer extends HTMLElement {
  constructor() {
    super();
    this.chat = new ChatApp();
    this.chatModel = new ChatModel();
    this.chatController = new ChatController(this.chat, this.chatModel);
    this.userList = new UserList();
    this.userListModel = new UserListModel();
    this.userListController = new UserListController(this.userList, this.userListModel);
    this.classList.add("chat-screen");
    this.button = new Button("test");
  }

  connectedCallback() {
    this.append(this.chat);
    this.append(this.userList);
  }
  disconnectedCallback() {}
}

customElements.define("chat-container", ChatContainer);

export { ChatContainer };
