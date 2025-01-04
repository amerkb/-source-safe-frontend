import React, { useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import Field from "../UI/Form/Input/Field";
import Submit from "../UI/Form/Submit/Submit";
import LoginFiled from "../UI/Alert/LoginFailed";
import { useDispatch, useSelector } from "react-redux";
import { setFiledLogin } from "../Redux/AlertReducer";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      email: formData.get("Email"),
      password: formData.get("Password"),
    };
    console.log(data);
    axios
      .post(`${window.host}/loginAdmin`, data)
      .then((response) => {
        localStorage.setItem("token", response.data.access_token);
        console.log(response.data);
        navigate("/dashboard");
        dispatch(setFiledLogin(false));
      })
      .catch((error) => {
        console.error(error);
        dispatch(setFiledLogin(true));
      });
  };

  return (
    <div
      class="ms-auth-container"
      className="flex h-screen bg-cover bg-[#F3F6F9]"
    >
      
      <img alt="Logo" src="https://booksmm.com/addsnmin/assets/media/logos/logo-1.svg" class="h-10"></img>
      <form
        class="needs-validation p-10 bg-white m-auto h-1/2  lg:w-[40%]"
        novalidate=""

        onSubmit={handleSubmit}
      >
        <h3 className="text-[30px] font-semibold mb-2">Login to Account</h3>
        <p className="mb-[15px]">Please enter your email and password</p>
        <div class="mb-3" className="mb-4 text-left">
          <div class="input-group" className="w-full flex relative">
            <Field
              label="Email"
              placeholder="Email"
              name="Email"
              type="email"
              value=""
            />

          </div>
        </div>
        <div class="mb-3" className="mb-4 text-left">
          <div class="input-group" className="w-full flex relative">
            <Field
              label="Password"
              type="password"
              placeholder="Password"
              name="Password"
              value=""
            />
            {/* <div class="invalid-feedback">
                  Please provide a valid email.
                </div> */}
          </div>
        </div>
        <Submit value="Login" />
      </form>
    </div>

  );
}

export default Login;
