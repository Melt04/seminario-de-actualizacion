import { UserCard } from "../views/Cards/UserCard.js";
class UserListController {
  constructor(view, model) {
    this.view = view;
    this.model = model;

    document.addEventListener("update-user-list", ({ detail }) => {
      this.setUsers(detail.users);
    });
  }

  setUsers(users) {
    this.view.innerHTML = "";
    this.view.userListContainer = document.createElement("div");
    this.view.userListContainer.classList.add("user-list");
    users.forEach((user) => {
      const userCard = new UserCard(user);
      this.view.userListContainer.appendChild(userCard);
      userCard.addEventListener("click", () => {
        this.model.startProposal(user.id);
      });
    });

    this.view.appendChild(this.view.userListContainer);
  }
}

export { UserListController };
