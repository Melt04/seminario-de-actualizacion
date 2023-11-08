class Button extends HTMLElement {
  constructor(text, htmlClass) {
    super();
    this.classList.add("bttn");
    this.innerText = text;
  }

  render() {}

  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {}
}

customElements.define("x-button", Button);

export { Button };
