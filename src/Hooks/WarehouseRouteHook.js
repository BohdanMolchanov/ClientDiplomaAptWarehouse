import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import BatchesManagement from '../Components/Pages/WarehouseManagement/BatchesManagement';
import CreateBatch from '../Components/Pages/WarehouseManagement/CreateBatch';
import CreateStock from '../Components/Pages/WarehouseManagement/CreateStock';
import Warehouse from '../Components/Pages/WarehouseManagement/Warehouse';
function WarehouseRouteHook() {
  const { path, id } = useRouteMatch();

  return (
    <>
      <Switch>
      <Route exact path={`${path}/`}>
          <Warehouse /> 
        </Route>
        <Route exact path={`${path}/create`}>
          <CreateStock />
        </Route>
        <Route exact path={`${path}/batches`}>
          <BatchesManagement />
        </Route>
        <Route exact path={`${path}/batches/create`}>
          <CreateBatch />
        </Route>
      </Switch>
    </>
  );
}

export default WarehouseRouteHook;