class SignInController {
  constructor(view, model) {
    this.view = view;
    this.model = model;
    this.view.loginButton.addEventListener("click", () => console.log("Adas"));
  }
}

export { SignInController };
