import React, { useEffect, useState } from "react";
import * as loginFetchs from "../../context/Users/loginRoutes";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../utils/jwt-helpers";

const Login = () => {
  const navigate = useNavigate();
  const [signUp, setSignUp] = useState(false);
  const initialValue = {
    name: "",
    email: "",
    password: "",
  };
  const [values, setValues] = useState(initialValue);

  useEffect(() => {
    const user = getToken();
    if (user) {
      return navigate("/dashboard");
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (signUp) {
      const dataMessage = await loginFetchs.signUp(
        values.name,
        values.email,
        values.password
      );
      if (dataMessage === 400) {
        return alert("Email already exists");
      }
    }
    const login = await loginFetchs.login(values.email, values.password);
    if (login.token) {
      return navigate("/dashboard");
    }
    if (login === 400) {
      return alert("Email or password incorrect");
    }
  };

  const handleSignUp = (event: React.FormEvent) => {
    event.preventDefault();
    setSignUp(!signUp);
    console.log(signUp);
  };

  return (
    <div>
      <div className="container">
        <div className="container__form">
          <form action="#" method="#" className="form login">
            {signUp && (
              <div className="form__field">
                <label htmlFor="login__name">
                  <svg className="icon">
                    <use xlinkHref="#icon-user"></use>
                  </svg>
                  <span className="hidden">name</span>
                </label>
                <input
                  autoComplete="name"
                  id="login__name"
                  type="text"
                  name="name"
                  className="form__input"
                  placeholder="name"
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <div className="form__field">
              <label htmlFor="login__username">
                <svg className="icon">
                  <use xlinkHref="#email-user"></use>
                </svg>
                <span className="hidden">Username</span>
              </label>
              <input
                autoComplete="email"
                id="login__email"
                type="text"
                name="email"
                className="form__input"
                placeholder="email"
                onChange={handleChange}
                required
              />
            </div>

            <div className="form__field">
              <label htmlFor="login__password">
                <svg className="icon">
                  <use xlinkHref="#icon-lock"></use>
                </svg>
                <span className="hidden">Password</span>
              </label>
              <input
                id="login__password"
                type="password"
                name="password"
                className="form__input"
                placeholder="Password"
                onChange={handleChange}
                required
              />
            </div>

            <div className="form__field">
              <input
                type="submit"
                onClick={handleSubmit}
                value={signUp ? "Sign In" : "Log In"}
              />
            </div>
          </form>
          <p className="text--center">
            {signUp ? (
              <>
                <svg className="icon">
                  <use xlinkHref="#icon-arrow-left"></use>
                </svg>
                <a href="#" onClick={handleSignUp}>
                  {" "}
                  return to login
                </a>
              </>
            ) : (
              <>
                <a href="#" onClick={handleSignUp}>
                  Sign in{" "}
                </a>
                <svg className="icon">
                  <use xlinkHref="#icon-arrow-right"></use>
                </svg>
              </>
            )}
          </p>
        </div>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" className="icons">
        <symbol id="icon-arrow-right" viewBox="0 0 28 28">
          <path d="M23 15c0 0.531-0.203 1.047-0.578 1.422l-10.172 10.172c-0.375 0.359-0.891 0.578-1.422 0.578s-1.031-0.219-1.406-0.578l-1.172-1.172c-0.375-0.375-0.594-0.891-0.594-1.422s0.219-1.047 0.594-1.422l4.578-4.578h-11c-1.125 0-1.828-0.938-1.828-2v-2c0-1.062 0.703-2 1.828-2h11l-4.578-4.594c-0.375-0.359-0.594-0.875-0.594-1.406s0.219-1.047 0.594-1.406l1.172-1.172c0.375-0.375 0.875-0.594 1.406-0.594s1.047 0.219 1.422 0.594l10.172 10.172c0.375 0.359 0.578 0.875 0.578 1.406z"></path>
        </symbol>
        <symbol id="icon-arrow-left" viewBox="0 0 28 28">
          <path d="M24 14v2c0 1.062-0.703 2-1.828 2h-11l4.578 4.594c0.375 0.359 0.594 0.875 0.594 1.406s-0.219 1.047-0.594 1.406l-1.172 1.188c-0.359 0.359-0.875 0.578-1.406 0.578s-1.047-0.219-1.422-0.578l-10.172-10.187c-0.359-0.359-0.578-0.875-0.578-1.406s0.219-1.047 0.578-1.422l10.172-10.156c0.375-0.375 0.891-0.594 1.422-0.594s1.031 0.219 1.406 0.594l1.172 1.156c0.375 0.375 0.594 0.891 0.594 1.422s-0.219 1.047-0.594 1.422l-4.578 4.578h11c1.125 0 1.828 0.938 1.828 2z"></path>
        </symbol>

        <symbol id="icon-lock" viewBox="0 0 1792 1792">
          <path d="M640 768h512V576q0-106-75-181t-181-75-181 75-75 181v192zm832 96v576q0 40-28 68t-68 28H416q-40 0-68-28t-28-68V864q0-40 28-68t68-28h32V576q0-184 132-316t316-132 316 132 132 316v192h32q40 0 68 28t28 68z" />
        </symbol>
        <symbol id="icon-user" viewBox="0 0 1792 1792">
          <path d="M1600 1405q0 120-73 189.5t-194 69.5H459q-121 0-194-69.5T192 1405q0-53 3.5-103.5t14-109T236 1084t43-97.5 62-81 85.5-53.5T538 832q9 0 42 21.5t74.5 48 108 48T896 971t133.5-21.5 108-48 74.5-48 42-21.5q61 0 111.5 20t85.5 53.5 62 81 43 97.5 26.5 108.5 14 109 3.5 103.5zm-320-893q0 159-112.5 271.5T896 896 624.5 783.5 512 512t112.5-271.5T896 128t271.5 112.5T1280 512z" />
        </symbol>
        <symbol id="email-user" viewBox="2 0 42 42 ">
          <path d="M0 38c0 2.21 1.79 4 4 4h40c2.21 0 4-1.79 4-4l-0-27c0-2.21-1.79-4-4-4l-40 0c-2.21 0-4 1.79-4 4v27zM14.72 24.53l-9.15-9.21c-0.759-0.76-0.759-1.99 0-2.75 0.761-0.76 1.991-0.76 2.75 0l14.6 14.619c0.59 0.58 1.561 0.58 2.141 0l14.619-14.619c0.76-0.76 1.99-0.76 2.75 0s0.76 1.99 0 2.75l-9.16 9.21 9.16 9.149c0.76 0.76 0.76 1.99 0 2.75s-1.99 0.76-2.75 0l-9.15-9.14c0 0-2.859 2.91-3.379 3.43-0.811 0.791-1.931 1.281-3.151 1.281-1.24 0-2.36-0.5-3.17-1.311-0.53-0.52-3.37-3.399-3.37-3.399l-9.141 9.14c-0.759 0.76-1.989 0.76-2.75 0-0.759-0.76-0.759-1.99 0-2.75l9.151-9.15z" />
        </symbol>
      </svg>
    </div>
  );
};

export default Login;
