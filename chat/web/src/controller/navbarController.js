class NavbarController {
  constructor(view, model) {
    this.view = view;
    this.model = model;
    document.addEventListener("user-register", () => {
      this.model.changeAppState("loged");
      this.view.loginButton.textContent = "Log out";
    });
    document.addEventListener("user-loged", () => {
      this.model.changeAppState("loged");
      this.view.loginButton.textContent = "Log out";
    });

    this.view.loginButton.addEventListener("click", (event) => {
      this;
      if (this.model.appState !== "loged") {
        this.model.changeButtonState();
        const newState = this.model.getButtonState();
        const textArray = newState.split("");
        textArray[0] = textArray[0].toUpperCase();
        event.target.textContent = textArray.join("");
        event.target.setAttribute("state", newState);
        document.dispatchEvent(new CustomEvent("change-state", { detail: newState }));
      } else {
        document.dispatchEvent(new CustomEvent("log-out", { detail: this.model.getButtonState() }));
        this.model.changeAppState("logoff");
      }
    });
  }
}

export { NavbarController };
