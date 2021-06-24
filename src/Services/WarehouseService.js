import { UserService } from "./UserService";
import { authHeader } from '../_helpers';
const requestUrl = "https://localhost:5001";

export const WarehouseService = {
  GetStocks,
  GetBatches,
  SearchProductList,
  CreateStock,
  GetStockNames,
  CreateBatch,
  ConfirmBatch,
};

function ConfirmBatch(batchId, bestBefore) {
  const headers = new Headers(authHeader());
  headers.append("Content-Type", "application/json");
  const requestOptions = {
    method: "PATCH",
    headers: headers,
    body: JSON.stringify({
      batchId,
      bestBefore,
    }),
  };
  return fetch(`${requestUrl}/warehouse/batch/confirm`, requestOptions)
  .then(handleResponse)
  .then((data) => {
    return data;
  });
}

function GetStocks(skip, limit, status, search) {
  const headers = new Headers(authHeader());
  const requestOptions = {
    method: "GET",
    headers: headers,
  };
  return fetch(
    `${requestUrl}/warehouse/stock?skip=${skip}&limit=${limit}&status=${status}&search=${search}`,
    requestOptions
  )
    .then(handleResponse)
    .then((data) => {
      return data;
    });
}

function SearchProductList(search) {
  const headers = new Headers(authHeader());
  const requestOptions = {
    method: "GET",
    headers: headers,
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
  const headers = new Headers(authHeader());
  headers.append("Content-Type", "application/json");
  const requestOptions = {
    method: "POST",
    headers: headers,
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
  .then((data) => {
    return data;
  });
}

function GetStockNames(search) {
  const headers = new Headers(authHeader());
  const requestOptions = {
    method: "GET",
    headers: headers,
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
  const headers = new Headers(authHeader());
  headers.append("Content-Type", "application/json");
  const requestOptions = {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      stockId,
      providername,
      count,
    }),
  };
  return fetch(`${requestUrl}/warehouse/batch/create`, requestOptions)
  .then(handleResponse)
  .then((data) => {
    return data;
  });
}

function GetBatches(skip, limit, status, search) {
  const headers = new Headers(authHeader());
  const requestOptions = {
    method: "GET",
    headers: headers,
  };
  return fetch(
    `${requestUrl}/warehouse/batches?skip=${skip}&limit=${limit}&status=${status}&search=${search}`,
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
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        UserService.logout();
        window.location.replace("/");
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
