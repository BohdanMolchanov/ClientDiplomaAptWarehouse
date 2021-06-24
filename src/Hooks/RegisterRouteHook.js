import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import OwnerRegisterDepartment from "../Components/Pages/Owner/OwnerRegisterDepartment";
import RegisterOrganizationPage from "../Components/Pages/Registration/RegisterOrganizationPage";
import OwnerRegisterEmployee from "../Components/Pages/Owner/OwnerRegisterEmployee";

function RegisterRouteHook() {
  const { path, id } = useRouteMatch();

  return (
    <>
      <Switch>
        <Route exact path={`${path}/organization`}>
          <RegisterOrganizationPage />
        </Route>
        <Route exact path={`${path}/department`}>
          <OwnerRegisterDepartment />
        </Route>
        <Route exact path={`${path}/employee`}>
          <OwnerRegisterEmployee />
        </Route>
        {/* <Route exact path={`${path}/employee`}>
          <AdminMedicineDictionary />
        </Route> */}
      </Switch>
    </>
  );
}

export default RegisterRouteHook;
