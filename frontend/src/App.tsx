import "@/App.css";
import "@/styles/page-layouts.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import { useAppSelector } from "@/hooks/redux-hooks";
import Router from "@/components/Router";

function App() {
  const currentTheme = useAppSelector((state) => state.theme.theme);

  return (
    <div className={"App " + currentTheme}>
      <Router />
    </div>
  );
}

export default App;
