import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {NavBar} from "./Components/NavBar";

import { Route, Switch, BrowserRouter} from "react-router-dom";
import WarehouseRouteHook from "./Hooks/WarehouseRouteHook";
import DepartmentStore from "./Components/Pages/DepartmentStore";
import DepartmentSearch from "./Components/Pages/DepartmentSearch";
import { LoginPage } from "./Components/Pages/AuthorizationManagement/LoginPage";
import RegisterRouteHook from "./Hooks/RegisterRouteHook";
import AdminRouteHook from "./Hooks/AdminRouteHook";
import OwnerDepartmentsList from "./Components/Pages/Owner/OwnerDepartmentsList";

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
            <Route path="/department/:id" render={(props) => <DepartmentStore {...props}/>}/>
            <Route path="/warehouse">
              <WarehouseRouteHook />
            </Route>
            <Route exact path="/login">
              <LoginPage />
            </Route>
            <Route path="/register">
              <RegisterRouteHook />
            </Route>
            <Route path="/admin">
              <AdminRouteHook />
            </Route>
            <Route exact path="/owner/departments">
              <OwnerDepartmentsList />
            </Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
