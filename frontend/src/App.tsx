import "@/App.css";
import "@/styles/page-layouts.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import Router from "@/components/Router";
import { useAppSelector } from "@/hooks/redux-hooks";
import { Navbar } from "@/components/Navbar";

function App() {
  const currentTheme = useAppSelector((state) => state.theme.theme);

  return (
    <div className={"App " + currentTheme}>
      <Navbar />
      <Router />
    </div>
  );
}

export default App;
