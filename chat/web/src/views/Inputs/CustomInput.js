class CustomInput extends HTMLElement {
  constructor(labelName, required, placeholder = "escribe algo", type = "text") {
    super();
    this.classList.add("coolinput");
    this.label = document.createElement("label");
    this.input = document.createElement("input");
    this.input.placeholder = placeholder;
    this.input.required = required;
    this.input.type = type;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.appendChild(this.label);
    this.appendChild(this.input);
    let style = document.createElement("style");
    /* style.innerText = `@import './style/Input.css';`; */
    this.appendChild(style);
  }

  getValue() {
    return this.input.value;
  }

  setValue(value) {
    this.input.value = value;
  }

  setReadonly(value) {
    if (value === true) {
      this.input.setAttribute("readonly", "readonly");
    } else {
      this.input.removeAttribute("readonly");
    }
  }
}

customElements.define("x-ccustominput", CustomInput);

export { CustomInput };
