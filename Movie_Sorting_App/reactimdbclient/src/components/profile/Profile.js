import React from "react";
import { Button } from "react-bootstrap";
import "./../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./profile.css";
import { useCookies } from "react-cookie";
import { PersonCircle, Power, PlusCircleFill } from "react-bootstrap-icons";
import Fab from "@material-ui/core/Fab";
import TextField from "@material-ui/core/TextField";

import { useState, useEffect } from "react";

function Profile(session) {
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const [isprofilePop, setIsProfilePop] = useState(false);
  const [profileData, setProfileData] = useState();
  const [isTopup, setIsTopup] = useState(false);
  const [istopupError, setIsTopupError] = useState(false);

  session = session.session;
  //   console.log(session);
  useEffect(() => {
    if (!profileData) {
      getProfileData();
    }
  });
  const profilePop = () => {
    setIsProfilePop(true);
  };
  const closeProfilePop = () => {
    setIsProfilePop(false);
  };

  const getProfileData = () => {
    var post_data = JSON.stringify({ session: session });
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(post_data),
        Host: "http://169.254.212.69:3000/",
      },
      body: post_data,
    };
    fetch("http://169.254.212.69:3001/authprofile", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          // setLoginError("Username or Password is incorrect");
          //   removeCookie("userlogin");
        } else {
          //   console.log(data.status);
          //   console.log(data.data);
          setProfileData(data.data);
        }
      });
  };

  const logOut = () => {
    var post_data = JSON.stringify({ session: session });
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(post_data),
        Host: "http://169.254.212.69:3000/",
      },
      body: post_data,
    };
    fetch("http://169.254.212.69:3001/authlogout", requestOptions)
      .then(removeCookie("userlogin", { path: "/" }))
      .then(window.location.reload());

    // console.log(cookies.userlogin);
  };

  const ProfileDetails = () => {
    return (
      <>
        <p>
          Email: {profileData.email}
          <div className="clearfix"></div>
        </p>
        <hr></hr>
        <p>
          Balance: {profileData.balance}
          <div className="clearfix"></div>
        </p>
        <hr></hr>
        <Fab
          variant="extended"
          color="primary"
          size="small"
          onClick={(e) => topupShow()}
        >
          Topup
        </Fab>
        <hr></hr>
        <br></br>
        <Fab
          variant="extended"
          className="logoutButton"
          onClick={(e) => logOut()}
        >
          LOGOUT
        </Fab>
      </>
    );
  };

  const TopUp = () => {
    return (
      <>
        <div className="profileContainer">
          <div className="overlay" onClick={(e) => topupHide()}></div>
          <div className="loginWrapper">
            <h5>Topup</h5>
            <h6>Current Balance: {profileData.balance}</h6>
            <div className="clearFix"></div>
            {istopupError ? (
              <span className="loginError">{istopupError}</span>
            ) : (
              ""
            )}
            <br />
            <form onSubmit={(e) => topupSubmit(e)}>
              <TextField
                key="scratchCard"
                id="scratchCard"
                label="000 000 000"
                variant="outlined"
                required
                autoComplete="off"
              />
              <br />
              <br />
              <Fab variant="extended" color="default" type="submit">
                Topup &nbsp;
                <PlusCircleFill size="20" />
              </Fab>
            </form>
            <div className="clearFix"></div>
          </div>
        </div>
      </>
    );
  };

  const topupShow = () => {
    setIsTopup(true);
    closeProfilePop();
  };

  const topupHide = () => {
    setIsTopup(false);
  };

  const topupSubmit = (e) => {
    var scratchCard = document.getElementById("scratchCard");
    var userSession = cookies.userlogin;
    console.log("session: " + userSession);
    var post_data = JSON.stringify({
      scratchCard: scratchCard.value,
      session: userSession,
    });
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(post_data),
        Host: "http://169.254.212.69:3000/",
      },
      body: post_data,
    };
    fetch("http://169.254.212.69:3001/topup", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.status);
        if (data.status) {
          setIsTopupError("Wrong card number or Used card");
          // console.log(istopupError);
        } else {
          getProfileData();
        }
      });
    // .then(window.location.reload());

    e.preventDefault();
  };

  return (
    <>
      <div className="profileButton">
        <Fab variant="extended" onClick={(e) => profilePop()}>
          <PersonCircle size="20" />
        </Fab>
      </div>

      {isprofilePop ? (
        <div className="profileContainer">
          <div className="overlay" onClick={(e) => closeProfilePop()}></div>
          <div className="profileWrapper">
            {profileData ? <ProfileDetails /> : ""}
          </div>
        </div>
      ) : (
        ""
      )}

      {isTopup ? <TopUp /> : ""}
    </>
  );
}
export default Profile;
