import React from "react";
import { NavLink } from "react-router-dom";

const Navigation: React.FC = () => {
  const classes = {
    className: "nav__link nav__link--default link--reset",
    activeClassName: "nav__link--active"
  };

  return (
    <nav className="nav container--alt">
      <NavLink {...classes} exact to="/">
        Home
      </NavLink>
      <NavLink {...classes} to="/about">
        About Me
      </NavLink>
      <NavLink {...classes} to="/albums">
        Album List
      </NavLink>
    </nav>
  );
};

export { Navigation };
