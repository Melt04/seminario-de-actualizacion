class SignUpModel {
  async signUpUser({ name, lastName, password, email }) {
    try {
      const body = {
        name,
        lastName,
        password,
        email,
      };
      const jsonBody = JSON.stringify(body);
      const response = await fetch("http://localhost:8000/users", { method: "POST", body: jsonBody });
      const userId = response.headers.get("x-session-token");
      localStorage.setItem("x-session-token", userId);
      const responseJson = await response.json();
      if (responseJson.error) {
        console.log(responseJson);
        console.log(responseJson?.message);
        throw new Error(responseJson?.message || "Something went wrong");
      }
      return true;
    } catch (e) {
      alert("Fallo la creacion del usuario");
      return false;
    }
  }
}

export { SignUpModel };
