import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => (
  <div className="notFound">
    <h1 className="heading heading--level1 notFound__heading">
      Page not found
    </h1>
    <div>
      Use the following links to return to the site: <br />
      <br />
    </div>
    <div>
      <Link className="link link--default" to="/">
        Homepage
      </Link>
      {" | "}
      <Link className="link link--default" to="/about">
        About Me
      </Link>
      {" | "}
      <Link className="link link--default" to="/albums">
        Albums
      </Link>
    </div>
  </div>
);

export default NotFound;
