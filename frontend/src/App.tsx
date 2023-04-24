import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Router from "./Router";
import {useAppSelector} from "./hooks/redux-hooks";

function App() {
  const currentTheme = useAppSelector(state => state.theme.theme);

  return (
      <div className={"App " + currentTheme}>
        <Router />
      </div>
  )
}

export default App
