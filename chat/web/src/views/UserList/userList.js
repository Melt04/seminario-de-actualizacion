import { UserCard } from "../Cards/UserCard.js";
class UserList extends HTMLElement {
  constructor() {
    super();
    this.userListContainer = document.createElement("div");
    this.userListContainer.classList.add("user-list");
    this.appendChild(this.userListContainer);
  }
}

customElements.define("user-list", UserList);
export { UserList };
