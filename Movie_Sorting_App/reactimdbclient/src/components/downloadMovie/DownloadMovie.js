import React, { useState, useEffect } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import "./../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./../moviecard/moviecard.css";
import { Download } from "react-bootstrap-icons";
import { useParams } from "react-router-dom";
import DMovCard from "./DMovCard";
import { useCookies } from "react-cookie";
import Fab from "@material-ui/core/Fab";
import  {API_HOST, CLIENT_HOST, FILE_SERVER_HOST} from "../../constants/HOSTS_CONSTANT";
require("es6-promise").polyfill();
require("isomorphic-fetch");

function DownloadMovie() {
  const [data, setData] = useState([null]);
  const [files, setFiles] = useState([]);
  const [tokenExpired, setTokenExpired] = useState(false);
  // const [reqId, setId] = useState("");
  const [x, setX] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["userlogin"]);

  let { id } = useParams();

  // setId(id);

  useEffect(() => {
    fetchItems();
  }, []);

  console.log(id);

  var url = API_HOST+"/movies/" + id;

  var imgurl = API_HOST+"/image/" + data.imdb_id;

  var encoded = encodeURI(data.local_title);
  var filesUrl =
  FILE_SERVER_HOST+"/services/files/list/" + encoded + "/";

  const fetchItems = async () => {
    const data = await fetch(url);
    const items = await data.json();
    console.log(items);
    setData(items);
  };

  const fetchFiles = async () => {
    const fileData = await fetch(filesUrl);
    const fileItems = await fileData.json().then(setX(true));
    setFiles(fileItems);
  };

  if (data.local_title) {
    if (!x) {
      fetchFiles();
    }
  }

  const FilesInfo = (files) => {
    var fileslist = [];
    if (files.files.path) {
      fileslist = files.files.fileInfo;
      console.log(files);

      return (
        <>
          <div className="downloadWrapper">
            {fileslist.map((filesdetails, idx) => {
              var size = filesdetails.size / 1048576;
              size = Math.round(size);
              return (
                <>
                  <p className="" key={idx}>
                    {filesdetails.filePath} - {size}MB{"   "}
                    <Button
                      onClick={(e) =>
                        createToken(files.files.path, filesdetails.filePath)
                      }
                    >
                      Download &nbsp;&nbsp;
                      <Download size="26" />
                    </Button>
                    <div className="clearfix"></div>
                  </p>
                </>
              );
            })}
          </div>
        </>
      );
    } else {
      return <></>;
    }
  };

  if (data === null) {
    return <p>Loading data...</p>;
  }

  const createToken = (basePath, path) => {
    var filePath = path;
    // console.log(filePath);

    if(!cookies.userlogin)
    {
      alert("You need to LOGIN first to download");
    }

    var post_data = JSON.stringify({
      basePath: basePath,
      path: filePath,
      session: cookies.userlogin,
    });

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(post_data),
      },
      body: post_data,
    };
    fetch(API_HOST+"/createtoken", requestOptions)
      .then((response) => response.json())
      .then((data) => downloadFile(JSON.parse(data)));
    // downloadFile(JSON.parse(data));
  };

  const downloadFile = (data) => {
    console.log("download file");
    // console.log(data);

    if (data.status) {
      console.log(data);
      var filePath = encodeURI(data.path);

      var url =
      FILE_SERVER_HOST+"/services/files/download/" +
        filePath +
        "?token=" +
        data.token;
      const newWindow = window.open(url, "_blank", "noopener,noreferrer");
      if (newWindow) newWindow.opener = null;
      window.location.reload();
    } else {
      alert("Download Request Denied");
      if (data.token == "TOKEN_EXPIRED") {
        setTokenExpired(true);
      }
    }
  };

  const expireDialog = () => {
    setTokenExpired(false);
  };

  return (
    <>
      <Col sm="12">
        <Container className="">
          <Row>
            <Col>{files ? <FilesInfo files={files} /> : ""}</Col>
          </Row>

          {data ? (
            <DMovCard
              imgurl={imgurl}
              title={data.title}
              rating={data.rating}
              published={data.date_published}
              genres={data.genre}
              summary={data.summary}
              stars={data.actors}
              type={data.type}
            />
          ) : (
            ""
          )}
        </Container>

        <div className="movSpace"></div>
      </Col>
      {tokenExpired ? (
        <>
          <div className="loginContainer">
            <div className="loginOverlay" onClick={(e) => expireDialog()}></div>
            <div className="loginWrapper">
              <h5>Download time expired. </h5>

              <br />

              <Fab
                variant="extended"
                color="default"
                type="submit"
                onClick={(e) => expireDialog()}
              >
                Close
              </Fab>
              <div className="clearFix"></div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default DownloadMovie;
