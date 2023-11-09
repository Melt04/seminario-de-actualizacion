class SignUpController {
  constructor(view, model) {
    this.view = view;
    this.model = model;

    this.view.registerButton.addEventListener("click", async () => {
      const userData = this.getDataFromView();
      console.log(userData);
      await this.model.signUpUser({ ...userData });
      document.dispatchEvent(new CustomEvent("user-register"));
    });
  }
  getDataFromView() {
    const name = this.view.nameInput.getValue();
    console.log(this.view.lastNameInput);
    const lastName = this.view.lastNameInput.getValue();
    const email = this.view.emailInput.getValue();
    const password = this.view.passwordInput.getValue();
    return {
      name,
      lastName,
      email,
      password,
    };
  }
}

export { SignUpController };
