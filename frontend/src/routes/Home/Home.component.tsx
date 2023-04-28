import {FC, useCallback} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import {themeToggle} from "../../store/Theme/Theme.action";

const Home:FC = () => {
  const currentTheme = useAppSelector(state => state.theme.theme);
  const dispatch = useAppDispatch();

  const toggleTheme = useCallback(() => {
    dispatch(themeToggle());
  }, [dispatch])

  return(
    <>
      <button className='btn' onClick={toggleTheme}>Change Theme</button>
      <h1>Hello World!</h1>
      <p>current theme: {currentTheme}</p>
    </>
  )
}

export default Home;