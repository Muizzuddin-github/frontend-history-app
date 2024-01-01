import instAxios from "./insAxios";

class Auth {
  static login(data) {
    return instAxios.post("/login", data);
  }
  static logout() {
    return instAxios.post("/logout");
  }
  static isLogin() {
    return instAxios.get("/islogin");
  }
}

export default Auth;
