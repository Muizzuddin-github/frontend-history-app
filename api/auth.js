import instAxios from "./insAxios";

class Auth {
  static login(data) {
    return instAxios.post("/login", data);
  }
  static logout() {
    return instAxios.post("/logout");
  }
}

export default Auth;
