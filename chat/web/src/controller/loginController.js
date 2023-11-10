class LoginController {
  constructor(view, model) {
    this.view = view;
    this.model = model;
    this.view.loginButton.addEventListener("click", async () => {
      await this.loginUser();
    });
  }
  getInputValues() {
    const email = this.view.emailInput.getValue();
    const password = this.view.passwordInput.getValue();
    return {
      email,
      password,
    };
  }
  async loginUser() {
    const { email, password } = this.getInputValues();

    const loginResponse = await this.model.loginUser(email, password);
    if (loginResponse.error || loginResponse.token == null) {
      alert("Se ha producido un error al ingresar");
    } else {
      localStorage.setItem("x-session-token", loginResponse.token);
      document.dispatchEvent(new CustomEvent("user-loged"));
    }
  }
}

export { LoginController };
