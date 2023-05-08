import {FC, ReactEventHandler} from "react";
import "./Navbar.style.css";
import darkModeIcon from "@/assets/icons/dark-mode.svg";
import lightModeIcon from "@/assets/icons/light-mode.svg";

interface NavbarProps{
  toggleTheme:ReactEventHandler;
  logout:ReactEventHandler;
  currentTheme:"light"|"dark";
}

const Navbar:FC<NavbarProps> = (props) => {
  return(
    <nav className="navbar navbar-expand-md navbar-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href={"/"}>FANBALL</a>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" href="/dashboard">Dashboard</a>
            </li>
            <li className="nav-item">
              <a href="/players" className="nav-link">Players</a>
            </li>
          </ul>
        </div>
        <div>
          <button className="navbar-toggler me-2" type="button" data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                  aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"/>
          </button>
          <button onClick={props.logout} className={"btn py-1 me-2"}>
            Logout
          </button>
          <button onClick={props.toggleTheme} className={'theme-btn'}>
            <img
              src={props.currentTheme == 'dark' ? darkModeIcon : lightModeIcon}
              height={30}
              alt="change theme"
            />
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;