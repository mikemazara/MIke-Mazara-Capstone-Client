import axios from "axios";
import React, { useState, useEffect } from "react";
import birdMon from "../../assets/images/birdmon.jpg";
import "./Header.scss";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <div className="header__logo">
        <img src={birdMon} alt="logo" className="header__logo-image" />
      </div>
      <div className="header__title">
        <h1>Poke-Mechs</h1>
      </div>
      <div className="header__nav">
        <ul className="header__nav__list">
          <li className="header__nav__list__item">
            <NavLink to="/" className="header__nav__list__item__link">
              Home
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
