class NavbarModel {
  constructor() {}
  changeState(state) {
    return state == "login" ? "register" : "login";
  }
}

export { NavbarModel };
