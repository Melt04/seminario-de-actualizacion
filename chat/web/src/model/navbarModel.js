class NavbarModel {
  constructor() {
    this.appState = "logoff";
    this.buttonState = "login";
  }
  changeButtonState() {
    if (this.appState == "logoff") {
      this.buttonState = this.buttonState == "login" ? "register" : "login";
    }
  }
  changeAppState(newState) {
    this.appState = newState;
  }
  getAppState() {
    return this.appState;
  }
  getButtonState() {
    return this.buttonState;
  }
}

export { NavbarModel };
