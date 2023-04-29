import "@/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Router from "@/components/Router";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import darkModeIcon from "@/assets/icons/dark-mode.svg";
import lightModeIcon from "@/assets/icons/light-mode.svg";
import { themeToggle } from "@/store/Theme/Theme.slice";

function App() {
	const currentTheme = useAppSelector((state) => state.theme.theme);

	const toggleTheme = () => {
		dispatch(themeToggle())
	}

  return (
    <div className={"App " + currentTheme}>
      <button onClick={toggleTheme} className={"theme-btn"}>
        <img src={currentTheme == "dark" ? darkModeIcon : lightModeIcon}  alt="change theme"/>
      </button>
      <Router />
    </div>
  );
}

export default App;
