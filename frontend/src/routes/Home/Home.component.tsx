import { FC, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { selectTheme, themeToggle } from "@/store/Theme/Theme.slice";

const Home: FC = () => {
  const currentTheme = useAppSelector(selectTheme);
  const dispatch = useAppDispatch();

  const toggleTheme = useCallback(() => {
    dispatch(themeToggle());
  }, [dispatch]);

  return (
    <>
      <button className="btn" onClick={toggleTheme}>
        Change Theme
      </button>
      <h1>Hello World!</h1>
      <p>current theme: {currentTheme}</p>
    </>
  );
};

export default Home;
