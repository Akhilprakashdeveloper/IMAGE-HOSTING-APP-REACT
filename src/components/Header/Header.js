import React, { useState, useEffect } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { FcLandscape } from "react-icons/fc";
import { FcKey } from "react-icons/fc";

const userUrl = "http://localhost:5005/userInfo";

function Header(props) {
  const [userdata, setuserdata] = useState({});
  const [showAPIKey, setShowAPIKey] = useState(false);

  useEffect(() => {
    fetch(userUrl, {
      method: "GET",
      headers: {
        "x-access-token": sessionStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setuserdata(data);
      });
  }, []);

  const ConditionalHeader = () => {
    if (userdata.name) {
      let data = userdata;
      let outArray = [data.name, data.email];
      sessionStorage.setItem("userdata", outArray);

      return (
        <nav>
          <div className="nav-left">
            <div className="icon">
              <FcLandscape size="1x" />
            </div>

            <p className="nav-title">IMAGE HOSTING</p>
            <FcKey className="key" onClick={() => setShowAPIKey(!showAPIKey)} />
            {showAPIKey && (
              <p className="api-key">
                <span style={{ color: "#28a745" }}>APIKEY IS:</span>
                {data.apikey}
              </p>
            )}
          </div>

          <div className="nav-right">
            <Link to="/">
              <i class="bi bi-house" id="nav-homeicon"></i>
            </Link>
            <i style={{ marginLeft: "4%", fontSize: "30px" }}>
              Hello {data.name}
            </i>

            <button className="logout" onClick={handleLogout}>
              {" "}
              Logout
            </button>
          </div>
        </nav>
      );
    } else {
      return (
        <nav>
          <div className="nav-left">
            <div className="icon">
              <FcLandscape size="1x" />
            </div>

            <p className="nav-title">IMAGE HOSTING SERVICE</p>
          </div>

          <div className="nav-right">
            <Link to="/">
              <i class="bi bi-house" id="nav-homeicon"></i>
            </Link>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <i style={{ marginLeft: "10%", fontSize: "30px" }}>signin</i>
            </Link>
            <Link to="/register" style={{ textDecoration: "none" }}>
              <i style={{ marginLeft: "10%", fontSize: "30px" }}>signup</i>
            </Link>
          </div>
        </nav>
      );
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userdata");
    setuserdata("");
    props.history.push("/");
  };

  return <div>{ConditionalHeader()}</div>;
}

export default withRouter(Header);
