import React from "react";
import axios from "axios";
import makeToast from "../Toaster";

const RegisterPage = (props) => {
  const nameRef = React.createRef();
  const emailRef = React.createRef();
  const passwordRef = React.createRef();

  const registerUser = () => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    axios
      .post("http://localhost:8000/user/register", { name, email, password })
      .then((response) => {
        // console.log(response.data);
        makeToast("success", response.data.message);
        props.history.push("/login");
      })
      .catch((err) => {
        // console.log(err.response.data);
        makeToast("error", err.response.data.message);
      });
  };

  return (
    <div className="card">
      <div className="cardHeader">Registration</div>
      <div className="cardBody">
        <div className="inputGroup">
          <label htmlFor="name">FullName</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your FullName"
            ref={nameRef}
          />
        </div>
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
        <button onClick={registerUser}>Register</button>
      </div>
    </div>
  );
};

export default RegisterPage;
