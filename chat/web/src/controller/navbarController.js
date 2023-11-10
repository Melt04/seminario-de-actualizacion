class NavbarController {
  constructor(view, model) {
    this.view = view;
    this.model = model;
    this.view.loginButton.addEventListener("click", (event) => {
      const state = event.target.getAttribute("state");
      const newState = this.model.changeState(state);
      const textArray = newState.split("");
      textArray[0] = textArray[0].toUpperCase();
      event.target.textContent = textArray.join("");
      event.target.setAttribute("state", newState);
      document.dispatchEvent(new CustomEvent("change-state", { detail: newState }));
    });
  }
}

export { NavbarController };
