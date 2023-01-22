import React from "react";
import { Link } from "react-router-dom";
import { ImCloudUpload } from "react-icons/im";
import { FcGallery } from "react-icons/fc";
import Header from "../Header/Header";
import "./Home.css";

function Home() {
  if (sessionStorage.getItem("token")) {
    return (
      <div>
        <Header />

        <div className="home-content">
          <p style={{ color: "red", fontSize: "15px", marginLeft: "7%" }}>
            !Click The Key in the Header to Avail your Public APIKEY
          </p>
          <p style={{ color: "yellow", fontSize: "10px", marginLeft: "7%" }}>
            http://localhost:5005/images?email=""&APIKEY=""
          </p>
          <div className="center-contents">
            <div className="upload">
              <img
                src="https://img.freepik.com/premium-vector/online-cloud-computing-data-center-web-hosting-service-database-documents-file-cloud-storage-upload-download-data-file-management-data-transfering-backup-vector-illustration_435184-1156.jpg?w=2000"
                className="upload-image"
              />

              <p className="image-text">Upload your Image</p>
              <Link to="/upload">
                <ImCloudUpload size="75px" className="upload-icon" />
              </Link>
            </div>

            <div className="uploaded">
              <img
                src="https://tse3.mm.bing.net/th?id=OIP.DHDzKVY9RUhpMr0vfc3fqQHaE_&pid=Api&P=0"
                className="uploaded-image"
              />

              <p className="image-text">See uploaded Image</p>
              <Link to="/uploaded">
                <FcGallery size="75px" className="upload-icon" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Header />

        <div className="home-content">
          <div className="center-content">
            <div className="image-section">
              \
              <img
                className="image-content"
                src="https://i.pcmag.com/imagery/roundups/04kECIAgqF4I9IK42bNsxZg-2..v1569492522.jpg"
                alt=""
              />
            </div>
            <div className="content-section">
              <div className="content">
                <h3>Easy sharing:</h3>
                <p>
                  {" "}
                  Share your images with a simple link, or embed them directly
                  on your website or blog
                </p>

                <h3>Secure hosting:</h3>
                <p>
                  {" "}
                  We use the latest security measures to ensure your images are
                  protected at all times.
                </p>

                <h3>Fast and reliable hosting:</h3>
                <p>
                  Enjoy lightning-fast image loading times for your visitors.
                </p>

                <h3>Unlimited storage:</h3>
                <p>
                  Never worry about running out of space for your images again.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
