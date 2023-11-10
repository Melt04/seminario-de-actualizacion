class NavbarComponent extends HTMLElement {
  constructor() {
    super();
    this.loginButton = document.createElement("button");
    this.loginButton.textContent = "Register";
    this.loginButton.id = "loginBtn";
    this.loginButton.setAttribute("state", "register");
  }
  connectedCallback() {
    this.render();
  }
  render() {
    const navbarContainer = document.createElement("div");
    navbarContainer.classList.add("navbar");
    const logo = document.createElement("div");
    logo.classList.add("logo");
    const logoText = document.createElement("h1");
    logoText.textContent = "ISTF";
    logo.appendChild(logoText);
    const navLinks = document.createElement("div");
    navLinks.classList.add("nav-links");
    const links = ["Inicio", "Acerca de", "Servicios", "Contacto"];
    links.forEach((linkText) => {
      const link = document.createElement("a");
      link.href = "#";
      link.textContent = linkText;
      navLinks.appendChild(link);
    });
    const login = document.createElement("div");
    login.classList.add("login");
    login.appendChild(this.loginButton);
    navbarContainer.appendChild(logo);
    navbarContainer.appendChild(navLinks);
    navbarContainer.appendChild(login);
    this.appendChild(navbarContainer);
  }
}

customElements.define("navbar-component", NavbarComponent);
export { NavbarComponent };
