import {FC, ReactEventHandler, SyntheticEvent} from "react";
import Navbar from "@/components/Navbar/Navbar.component";
import {useSelector} from "react-redux";
import {selectTheme, themeToggle} from "@/store/Theme/Theme.slice";
import {useAppDispatch} from "@/hooks/redux-hooks";
import BrowserDB from "@/utils/BrowserDB";
import {clearUserDetails} from "@/store/User/User.slice";


const NavbarContainer:FC = () => {
  const currentTheme = useSelector(selectTheme);
  const dispatch = useAppDispatch();
  const toggleTheme:ReactEventHandler = (e:SyntheticEvent) => {
    dispatch(themeToggle());
  }

  const logout = () => {
    BrowserDB.delete("authToken");
    dispatch(clearUserDetails());
  }

  return (
    <Navbar
      currentTheme={currentTheme}
      toggleTheme={toggleTheme}
      logout={() => logout()}
    />
  )
}

export default NavbarContainer;