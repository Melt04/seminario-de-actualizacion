class UserCard extends HTMLElement {
  constructor({ name, last_name, id }) {
    super();
    const userCardContainer = document.createElement("div");
    userCardContainer.classList.add("user-card");
    const slot = document.createElement("slot");
    userCardContainer.appendChild(slot);

    this.name = name || "Nombre";
    this.lastName = last_name || "Apellido";
    this.id = id || "0";
    const nameParagraph = document.createElement("p");
    nameParagraph.innerHTML = `<strong>Nombre:</strong> ${this.name}`;
    userCardContainer.appendChild(nameParagraph);

    const lastnameParagraph = document.createElement("p");
    lastnameParagraph.innerHTML = `<strong>Apellido:</strong> ${this.lastName}`;
    userCardContainer.appendChild(lastnameParagraph);

    this.appendChild(userCardContainer);
  }
}

customElements.define("user-card", UserCard);
export { UserCard };
