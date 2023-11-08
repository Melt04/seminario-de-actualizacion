import { Button } from "../Buttons/Button.js";
import { createElement } from "../../utils/index.js";

class Modal extends HTMLElement {
  constructor(acceptEventName, declineEventName) {
    super();
    this.modalTitle = document.createElement("h3");
    createElement("h2", { class: "modal-window-title" });
    this.message = createElement("p", { class: "modal-window-message" });
    this.declinedButton = new Button("Decline", "modal-decline-bttn");
    this.acceptedButton = new Button("Accept", "modal-accept-bttn");
    this.setAcceptEventName(acceptEventName);
    this.setDeclineEventName(declineEventName);
  }

  setModalTitle(title) {
    this.modalTitle.textContent = title;
  }

  setMessage(message) {
    this.message.textContent = message;
  }

  setAcceptEventName(acceptEventName) {
    this.acceptEventName = acceptEventName;
  }

  setDeclineEventName(declineEventName) {
    this.declineEventName = declineEventName;
  }

  connectedCallback() {
    this.render();
    this.setCallbacks();
  }

  disconnectedCallback() {
    this.unSetCallbacks();
  }

  acceptedCallback() {
    this.parentElement.dispatchEvent(new CustomEvent(this.acceptEventName));
  }

  declinedCallback() {
    this.parentElement.dispatchEvent(new CustomEvent(this.declineEventName));
  }

  setCallbacks() {
    this.acceptedButton.addEventListener("click", () => {
      this.acceptedCallback();
    });
    this.declinedButton.addEventListener("click", () => {
      this.declinedCallback();
    });
  }

  unSetCallbacks() {
    this.acceptedButton.addEventListener("click", null);
    this.declinedButton.addEventListener("click", null);
  }

  render() {
    this.appendChild(this.modalTitle);
    this.appendChild(this.message);
    this.appendChild(this.declinedButton);
    this.appendChild(this.acceptedButton);

    let style = createElement("style");
    style.innerText = `@import "./style/ModalWindow.css"`;
    this.appendChild(style);
  }
}

customElements.define("x-modal-window", Modal);

export { Modal };
