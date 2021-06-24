import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import AdminOrganizationsPanelPage from "../Components/Pages/Administration/AdminOrganizationsPanelPage";
import AdminDepartmentsPanel from "../Components/Pages/Administration/AdminDepartmentsPanel";
import AdminMedicineDictionary from "../Components/Pages/Administration/AdminMedicineDictionary";
import AdminMedicineFilling from "../Components/Pages/Administration/AdminMedicineFilling";
function AdminRouteHook() {
  const { path, id } = useRouteMatch();

  return (
    <>
      <Switch>
        <Route exact path={`${path}/organizations`}>
          <AdminOrganizationsPanelPage />
        </Route>
        <Route exact path={`${path}/departments`}>
          <AdminDepartmentsPanel />
        </Route>
        <Route exact path={`${path}/dictionary`}>
          <AdminMedicineDictionary />
        </Route>
        <Route exact path={`${path}/dictionary/add`}>
          <AdminMedicineFilling />
        </Route>
      </Switch>
    </>
  );
}

export default AdminRouteHook;
