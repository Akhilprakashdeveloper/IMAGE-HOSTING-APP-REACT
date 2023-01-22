import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Register from "./components/Register&Login/Register";
import Login from "./components/Register&Login/Login";
import Imageupload from "./components/Imageupload/Imageupload";
import UploadedImage from "./components/UploadedImages/UploadedImage";
import Thumbnail from "./components/Thumbnail/Thumbnail";

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/upload" component={Imageupload} />
      <Route path="/uploaded" component={UploadedImage} />
      <Route path="/thumbnail" component={Thumbnail} />
    </BrowserRouter>
  );
}

export default App;
