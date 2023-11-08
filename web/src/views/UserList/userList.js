import { UserCard } from "../Cards/UserCard.js";
class UserList extends HTMLElement {
  constructor() {
    super();
    const userListContainer = document.createElement("div");
    userListContainer.classList.add("user-list");
    this.appendChild(userListContainer);
  }
  setUsers(users) {
    this.innerHTML = "";
    const userListContainer = document.createElement("div");
    userListContainer.classList.add("user-list");
    users.forEach((user) => {
      const userCard = new UserCard(user);

      userListContainer.appendChild(userCard);
    });

    this.appendChild(userListContainer);
  }
}

customElements.define("user-list", UserList);
export { UserList };
