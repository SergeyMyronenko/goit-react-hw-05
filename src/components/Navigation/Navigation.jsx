import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
import clsx from "clsx";

export const Navigation = () => {
  return (
    <header className={css.head}>
      <nav className={css.navigate}>
        <NavLink
          className={({ isActive }) => {
            return clsx(css.link, isActive && css.active);
          }}
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) => {
            return clsx(css.link, isActive && css.active);
          }}
          to="/movies"
        >
          Movies
        </NavLink>
      </nav>
    </header>
  );
};
