class HomeController {
  constructor(view, model) {
    this.view = view;
    this.model = model;
    this.state = "register";
    document.addEventListener("change-state", ({ detail }) => {
      this.view.changeState(detail);
    });
  }

  changeState() {}
}

export { HomeController };
