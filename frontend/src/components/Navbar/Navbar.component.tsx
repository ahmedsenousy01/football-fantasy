import { FC, ReactEventHandler } from "react";
import "./Navbar.style.css";
import darkModeIcon from "@/assets/icons/dark-mode.svg";
import lightModeIcon from "@/assets/icons/light-mode.svg";
import NavbarLink from "@/components/NavLink/NavLink";
import NavLink from "@/components/NavLink/NavLink";
import { getCurrentPathName } from "@/utils/Url/Url";
import { useSelector } from "react-redux";
import { selectTheme } from "@/store/Theme/Theme.slice";

interface NavbarProps {
  toggleTheme: ReactEventHandler;
  logout: ReactEventHandler;
  currentTheme: "light" | "dark";
}

const Navbar: FC<NavbarProps> = (props) => {
  const location = getCurrentPathName();
  const theme = useSelector(selectTheme);

  return (
    <nav
      className={`navbar navbar-expand-sm ${
        theme === "dark" ? "navbar-dark" : "navbar-light"
      }`}
    >
      <div className="container-fluid">
        <a className="navbar-brand" href={"/"}>
          FANBALL
        </a>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavbarLink href={"/dashboard"}>Dashboard</NavbarLink>
            </li>
            <li className="nav-item">
              <NavbarLink href={"/players/1"}>Players</NavbarLink>
            </li>
            <li className="nav-item">
              <NavLink href={"/leaderboard"}>Leaderboard</NavLink>
            </li>
          </ul>
          <div>
            {location === "/login" || location === "/register" ? null : (
              <button onClick={props.logout} className={"btn py-1 me-2"}>
                Logout
              </button>
            )}
            <button onClick={props.toggleTheme} className={"theme-btn"}>
              <img
                src={
                  props.currentTheme == "dark" ? darkModeIcon : lightModeIcon
                }
                height={30}
                alt="change theme"
              />
            </button>
          </div>
        </div>
        <div>
          <button
            className="navbar-toggler me-2"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
