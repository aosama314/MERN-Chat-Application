import React from "react";
import axios from "axios";
import makeToast from "../Toaster";

const LoginPage = (props) => {
  const emailRef = React.createRef();
  const passwordRef = React.createRef();

  const loginUser = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    axios
      .post("http://localhost:8000/user/login", { email, password })
      .then((response) => {
        // console.log(response.data);
        makeToast("success", response.data.message);
        localStorage.setItem("CC_Token", response.data.token);
        props.history.push("/dashboard");
      })
      .catch((err) => {
        // console.log(err);
        makeToast("error", err.response.data.message);
      });
  };

  return (
    <div className="card">
      <div className="cardHeader">Login</div>
      <div className="cardBody">
        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="abc@domain.com"
            ref={emailRef}
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="passsword">Passsword</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Your Password"
            ref={passwordRef}
          />
        </div>
        <button onClick={loginUser}>Login</button>
      </div>
    </div>
  );
};

export default LoginPage;
