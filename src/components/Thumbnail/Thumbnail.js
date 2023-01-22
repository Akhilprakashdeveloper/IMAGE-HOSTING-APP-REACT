import React, { useEffect, useState } from "react";
import "./Thumbnail.css";
import Header from "../Header/Header";
const ThumbUrl = "http://localhost:5005/uploadedimages/";

function Thumbnail() {
  const [thumbnail, setthumbnail] = useState([]);

  useEffect(() => {
    let email = sessionStorage.getItem("userdata").split(",")[1];
    fetch(`${ThumbUrl}${email}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        let dataArray = Object.values(data);
        const imgArray = dataArray.map((item) => {
          let img = document.createElement("img");
          img.src = item.avatar;
          img.width = 100;
          img.height = 100;
          img.alt = "thumbnail";
          return {
            src: img.src,
            width: img.width,
            height: img.height,
            alt: img.alt,
          };
        });
        setthumbnail(imgArray);
      });
  }, []);

  console.log(thumbnail);
  return (
    <div>
      <Header />
      <div className="main-div">
        <div className="thumbnail">
          {thumbnail.map((item) => {
            return (
              <div className="img" style={{ height: "100px", width: "100px" }}>
                <img
                  src={item.src}
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

export default Thumbnail;
