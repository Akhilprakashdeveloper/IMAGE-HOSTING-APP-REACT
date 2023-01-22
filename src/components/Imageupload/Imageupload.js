import React, { useState } from "react";
import axios from "axios";
import "./Imageupload.css";
import Header from "../Header/Header";

const uploadurl = "http://localhost:5005/upload";

function Imageupload(props) {
  const [file, setfile] = useState("");

  const InputHandle = (event) => {
    setfile(event.target.files[0]);
  };

  const HandleSubmit = async () => {
    try {
      const email = sessionStorage.getItem("userdata").split(",")[1];
      const formData = new FormData();
      formData.append("email", email);
      formData.append("image", file);
      const res = await axios.post(uploadurl, formData);
      alert("image uploaded successfully");
      props.history.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Header />
      <div className="main">
        <div className="image-upload">
          <div className="file">
            <input
              type="file"
              onChange={InputHandle}
              style={{ marginLeft: "30%", marginTop: "5%" }}
            />
            <button
              onClick={HandleSubmit}
              style={{
                height: "33px",
                width: "80px",
                marginTop: "4.2%",
                marginRight: "8%",
                backgroundColor: "#28a745",
              }}
            >
              submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Imageupload;
