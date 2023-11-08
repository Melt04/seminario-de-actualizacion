class HomeModel {
  constructor(state = "signin") {
    this.state = state;
  }
  getState() {
    return this.state;
  }
  changeState(state) {
    this.state = state;
  }
}

export { HomeModel };
