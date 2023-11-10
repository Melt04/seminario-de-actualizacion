class LoginModel {
  async loginUser(email, password) {
    try {
      const body = JSON.stringify({ email, password });
      const response = await fetch("http://localhost:8000/login", { method: "POST", body });
      const token = response.headers.get("x-session-token");
      const jsonResponse = await response.json();
      if (token) {
        return { token, error: false };
      }
      return { token: null, error: true };
    } catch (e) {
      console.log(e);
      return {
        token: null,
        error: true,
      };
    }
  }
}

export { LoginModel };
