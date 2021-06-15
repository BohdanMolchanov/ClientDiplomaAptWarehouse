const requestUrl = "http://localhost:5000";
export const WarehouseService = {
  GetStocks,
  GetBatches,
  SearchProductList,
  CreateStock,
  GetStockNames,
  CreateBatch,
  ConfirmBatch
};

function ConfirmBatch(batchId, bestBefore){
    const requestOptions = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            batchId,
            bestBefore
        }),
      };
      return fetch(`${requestUrl}/warehouse/batch/confirm`, requestOptions)
        .then(handleResponse)
        .then(
          (message) => message,
          (error) => error
        );
}

function GetStocks() {
  const requestOptions = {
    method: "GET",
  };
  return fetch(
    `${requestUrl}/warehouse/stock?departmentId=8bcfaed8-e453-4e85-88c5-212b103e5516&skip=0&limit=10`,
    requestOptions
  )
    .then(handleResponse)
    .then((data) => {
      return data;
    });
}

function SearchProductList(search) {
  const requestOptions = {
    method: "GET",
  };
  return fetch(
    `${requestUrl}/warehouse/products?search=${search}`,
    requestOptions
  )
    .then(handleResponse)
    .then((data) => {
      return data;
    });
}

function CreateStock(
  productid,
  maxcount,
  purchaseprice,
  sellprice,
  orderpoint,
  orderperiod
) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      productid,
      maxcount,
      purchaseprice,
      sellprice,
      orderpoint,
      orderperiod,
    }),
  };
  return fetch(`${requestUrl}/warehouse/stock/create`, requestOptions)
    .then(handleResponse)
    .then(
      (message) => message,
      (error) => error
    );
}

function GetStockNames(search) {
  const requestOptions = {
    method: "GET",
  };
  return fetch(
    `${requestUrl}/warehouse/stock/names?search=${search}`,
    requestOptions
  )
    .then(handleResponse)
    .then((data) => {
      return data;
    });
}

function CreateBatch(stockId, providername, count) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      stockId,
      providername,
      count,
    }),
  };
  return fetch(`${requestUrl}/warehouse/batch/create`, requestOptions)
    .then(handleResponse)
    .then(
      (message) => message,
      (error) => error
    );
}

function GetBatches() {
  const requestOptions = {
    method: "GET",
  };
  return fetch(
    `${requestUrl}/warehouse/batches?departmentId=8bcfaed8-e453-4e85-88c5-212b103e5516&skip=0&limit=10`,
    requestOptions
  )
    .then(handleResponse)
    .then((data) => {
      return data;
    });
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      // if (response.status === 401) {
      //     // auto logout if 401 response returned from api
      //     logout();
      //     location.reload(true);
      // }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
