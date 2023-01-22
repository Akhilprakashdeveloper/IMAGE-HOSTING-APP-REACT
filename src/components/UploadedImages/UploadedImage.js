import React, { useEffect, useState } from "react";
import "./UploadedImage.css";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
const imgurl = "http://localhost:5005/uploadedimages/";

function UploadedImage() {
  const [image, setimage] = useState([]);

  useEffect(() => {
    let email = sessionStorage.getItem("userdata").split(",")[1];
    fetch(`${imgurl}${email}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setimage(data);
      });
  }, []);

  if (sessionStorage.getItem("userdata") && image == "") {
    return (
      <div>
        <Header />
        <div className="main">
          <div className="uploaded-images">
            <center style={{ fontSize: "100px", color: "red" }}>
              YOU DON'T HAVE ANY UPLOAD YET START UPLOADING YOUR PHOTOS
            </center>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Header />
        <div className="main">
          <Link to="/thumbnail">
            <button className="thumbnail-div">
              <i>Thumbnails created</i>
            </button>
          </Link>

          <div className="uploaded-images">
            {image.map((item) => {
              return (
                <div className="img-div">
                  <img
                    src={item.avatar}
                    alt=""
                    style={{ height: "100%", width: "100%" }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default UploadedImage;
