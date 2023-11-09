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
      const userId = response.headers.get("x-user-id");
      localStorage.setItem("x-user-id", userId);
      const responseJson = await response.json();

      if (responseJson.error) {
        console.log(responseJson);
        console.log(responseJson?.message);
        throw new Error(responseJson?.message || "Something went wrong");
      }
      console.log(responseJson);
    } catch (e) {
      alert("Fallo la creacion del usuario");
    }
  }
}

export { SignUpModel };
