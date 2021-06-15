import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./Components/NavBar";

import { Route, Switch, BrowserRouter} from "react-router-dom";
import WarehouseRouteHook from "./Hooks/WarehouseRouteHook";
import DepartmentStore from "./Components/Pages/DepartmentStore";
import DepartmentSearch from "./Components/Pages/DepartmentSearch";
import { LoginPage } from "./Components/Pages/AuthorizationManagement/LoginPage";
function App() {
  return (
    <BrowserRouter>
      <div className="container-fluid">
        <NavBar />
        <div className="container">
          <Switch>
            <Route exact path="/">
              <DepartmentSearch />
            </Route>
            <Route exact path="/id">
              <DepartmentStore />
            </Route>
            <Route path="/warehouse">
              <WarehouseRouteHook />
            </Route>
            <Route exact path="/login">
              <LoginPage />
            </Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
