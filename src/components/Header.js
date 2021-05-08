import React from "react";
import logo from "../assets/logo.svg";

const Header = (props) => {
  return (
    <header className="header wrapper">
      <img className="logo" src={logo} alt="Deliveroo Logo" />
    </header>
  );
};

export default Header;
