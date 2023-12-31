import { Input, Button } from "@nextui-org/react";
import { useState } from "react";
import Auth from "../../api/auth";
import Alert from "../components/Alert";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showHide, setShowHide] = useState("-translate-x-[105%]");
  const [txtRes, setTxtRes] = useState({});
  const [alertType, setAlertType] = useState("success");
  const [txtShowPassword, setTxtShowPassword] = useState("show password");
  const [typeInput, setTypeInput] = useState("password");
  const [btnDisable, setBtnDisable] = useState(false);
  const redirect = useNavigate();

  const sendLogin = async (e) => {
    try {
      e.preventDefault();
      setBtnDisable(true);

      const res = await Auth.login(
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );

      setTxtRes({
        info: "Login Success",
        msg: res.data.message,
      });
      setShowHide("");
      setAlertType("success");
      setTimeout(function () {
        setShowHide("-translate-x-[105%]");
        redirect("/dashboard");
      }, 2000);
    } catch (err) {
      setBtnDisable(false);
      setTxtRes({
        info: "Login Error",
        msg: err.response.data.errors.join(" "),
      });
      setShowHide("");
      setAlertType("error");
    }
  };

  const showPassword = () => {
    if (txtShowPassword === "show password") {
      setTxtShowPassword("hidden password");
      setTypeInput("text");
    } else {
      setTxtShowPassword("show password");
      setTypeInput("password");
    }
  };

  return (
    <div className="h-[100vh] flex justify-center items-center">
      <div className="p-5 -mt-24 w-1/2">
        <div className="p-2 h-20 w-2/3 overflow-hidden">
          <Alert txt={txtRes} showHide={showHide} type={alertType} />
        </div>
        <form
          className="w-full flex flex-col gap-4 items-start"
          onSubmit={sendLogin}
        >
          <h1 className="text-xl font-bold mb-2">Selamat datang di Bookmark</h1>
          <div className="flex gap-3 flex-col w-full">
            <Input
              type="email"
              label="Email"
              placeholder="masukkan email anda"
              onChange={(e) => setEmail(e.target.value)}
              isRequired
            />
            <Input
              type={typeInput}
              label="Password"
              placeholder="masukkan password anda"
              onChange={(e) => setPassword(e.target.value)}
              isRequired
            />
          </div>
          <div className="flex items-center gap-5">
            <Button color="primary" type="submit" disabled={btnDisable}>
              Login
            </Button>
            <p
              className="underline text-sm cursor-pointer"
              onClick={showPassword}
            >
              {txtShowPassword}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
