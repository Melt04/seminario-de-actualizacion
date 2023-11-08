class HomeController {
  constructor(view, model) {
    this.view = view;
    this.model = model;
    this.view.changeStateButton.addEventListener("click", () => {
      this.changeState();
    });
  }

  changeState() {
    const state = this.model.getState();
    if (state == "signin") {
      this.model.changeState("login");
      const stateChangeEvent = new CustomEvent("stateChange", {
        detail: { newState: "login" },
      });
      document.dispatchEvent(stateChangeEvent);
    } else {
      this.model.changeState("signin");
      const stateChangeEvent = new CustomEvent("stateChange", {
        detail: { newState: "signin" },
      });
      document.dispatchEvent(stateChangeEvent);
    }
  }
}

export { HomeController };
