import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <div className="row">
          <Link className="navbar-brand" to="/">
            Home
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
