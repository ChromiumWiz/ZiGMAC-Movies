import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import "./../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BoxArrowInRight, BoxArrowLeft } from "react-bootstrap-icons";
import Fab from "@material-ui/core/Fab";
import TextField from "@material-ui/core/TextField";
import "./login.css";
import { useCookies } from "react-cookie";
import Profile from "../profile/Profile";
import  {API_HOST, CLIENT_HOST} from "../../constants/HOSTS_CONSTANT";

// import { useState } from "react";

function Login() {
  const [data, setdata] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["userlogin"]);
  const [isShowing, setIsShowing] = useState(false);
  const [signPop, setSignPop] = useState(false);
  const [signupError, setSignupError] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [signupMessage, setSignupMessage] = useState(false);
  const [isLoggedin, setIsLoggedin] = useState(false);

  useEffect(() => {
    loginCheck();
  });

  const signupSubmit = (e) => {
    var user = document.getElementById("s_username");
    var pass = document.getElementById("s_password");
    var c_pass = document.getElementById("c_password");

    if (pass.value == c_pass.value) {
      setSignupError(false);
      var post_data = JSON.stringify({
        user: user.value,
        pass: pass.value,
      });

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(post_data),
        },
        body: post_data,
      };
      fetch(API_HOST+"/authregister", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.status) {
            setSignupError("User account with this email already exist");
          } else {
            toggleSignup();
            setSignupMessage(true);
          }
        });
    } else {
      // alert("Passwords does not match");
      setSignupError("Passwords doesn't match");
    }
    e.preventDefault();
  };
  const loginSubmit = (e) => {
    var user = document.getElementById("username");
    var pass = document.getElementById("passwod");

    var post_data = JSON.stringify({
      user: user.value,
      pass: pass.value,
    });

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(post_data),
      },
      body: post_data,
    };
    fetch(API_HOST+"/authlogin", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          setLoginError("Username or Password is incorrect");
        } else {
          setLoginError(false);
          lPopupHide();
          // setSignupMessage(true);
          // alert(data.data.session);
          // console.log(data.data.session);

          setCookie("userlogin", data.data.session, {
            path: "/",
          });
          loginCheck();
        }
      });

    e.preventDefault();
  };

  const loginCheck = () => {
    var session = null;
    session = cookies.userlogin;
    console.log("session" + session);
    if (session) {
      var post_data = JSON.stringify({
        session: session,
      });

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(post_data),
        },
        body: post_data,
      };
      fetch(API_HOST+"/authsession", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.status) {
            // setLoginError("Username or Password is incorrect");
            removeCookie("userlogin");
          } else {
            console.log(data.status);
            setLoginError(false);
            lPopupHide();
            setIsLoggedin(true);
          }
        })
        .then(setdata(true));
    } else {
      setdata(true);
    }
  };

  const LoginWrap = () => {
    return (
      <>
        <div className="loginContainer">
          <div className="loginOverlay" onClick={(e) => lPopupHide()}></div>
          <div className="loginWrapper">
            <h5>Login</h5>
            <div className="clearFix"></div>
            {loginError ? <span className="loginError">{loginError}</span> : ""}
            {signupMessage ? (
              <span className="signupMessage">
                User regitered, login using the credentials
              </span>
            ) : (
              ""
            )}
            <br />
            <form onSubmit={(e) => loginSubmit(e)}>
              <TextField
                key="username"
                id="username"
                label="Username"
                variant="outlined"
                required
              />
              <br />
              <br />
              <TextField
                key="password"
                id="passwod"
                label="Password"
                variant="outlined"
                type="password"
                required
              />
              <br />
              <br />
              <Fab variant="extended" color="primary" type="submit">
                Login <BoxArrowInRight size="20" />
              </Fab>
            </form>
            <div className="clearFix"></div>
            or
            <br />
            <span className="linkSpan" onClick={(e) => toggleSignup()}>
              Signup
            </span>
          </div>
        </div>
      </>
    );
  };

  const SignupWrap = () => {
    return (
      <>
        <div className="loginContainer">
          <div className="loginOverlay" onClick={(e) => lPopupHide()}></div>
          <div className="loginWrapper">
            <h5>Signup</h5>
            <div className="clearFix"></div>
            {signupError ? (
              <span className="loginError">{signupError}</span>
            ) : (
              ""
            )}
            <br />
            <form onSubmit={(e) => signupSubmit(e)}>
              <TextField
                id="s_username"
                label="Email"
                variant="outlined"
                type="email"
                required
              />
              <br />
              <br />
              <TextField
                id="s_password"
                label="Password"
                variant="outlined"
                type="password"
                required
              />
              <br />
              <br />
              <TextField
                id="c_password"
                label="Confirm Password"
                variant="outlined"
                type="password"
                required
              />
              <br />
              <br />
              <Fab
                type="submit"
                variant="extended"
                color="primary"
                //   onClick={(e) => signupSubmit()}
              >
                Signup <BoxArrowInRight size="20" />
              </Fab>
            </form>
            <div className="clearFix"></div>
            or
            <br />
            <span className="linkSpan" onClick={(e) => toggleSignup()}>
              Login
            </span>
          </div>
        </div>
      </>
    );
  };

  const toggleSignup = () => {
    if (signPop) {
      setSignPop(false);
    } else {
      setSignPop(true);
    }
  };

  const LoginPopup = () => {
    return (
      <>
        {signPop ? (
          <SignupWrap key="signWrap" />
        ) : (
          <LoginWrap key="loginWrap" />
        )}
      </>
    );
  };

  const lPopupShow = () => {
    setIsShowing(true);
  };

  const lPopupHide = () => {
    console.log(isShowing);
    setIsShowing(false);
  };

  const LoginButton = () => {
    return (
      <>
        <div className="loginButton">
          <Fab variant="extended" onClick={(e) => lPopupShow()}>
            <BoxArrowInRight size="20" />
          </Fab>
        </div>

        {isShowing ? <LoginPopup key="loginPop" /> : ""}
      </>
    );
  };

  return (
    <>
      {data ? (
        isLoggedin ? (
          <Profile session={cookies.userlogin} />
        ) : (
          <LoginButton />
        )
      ) : (
        ""
      )}
    </>
  );
}

export default Login;
