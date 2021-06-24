import { authHeader } from "../_helpers";
import { UserService } from "./UserService";

export const AdminService = {
  getPanel,
  getProducts,
  confirmOrganization,
  confirmDepartment,
  createProduct
};
const requestUrl = "https://localhost:5001";

function getPanel(extension, confirmed, skip, limit, search) {
  const headers = new Headers(authHeader());

  const requestOptions = {
    method: "GET",
    headers: headers
  };

  return fetch(`${requestUrl}/admin/panel?search=${search}&extension=${extension}&confirmed=${confirmed}&skip=${skip}&limit=${limit}`, requestOptions)
    .then(handleResponse)
    .then((data) => {
      return data;
    });
}

function getProducts(skip, limit) {
    const headers = new Headers(authHeader());
  
    const requestOptions = {
      method: "GET",
      headers: headers
    };
  
    return fetch(`${requestUrl}/admin/dictionary/products?skip=${skip}&limit=${limit}`, requestOptions)
      .then(handleResponse)
      .then((data) => {
        return data;
      });
  }

function confirmOrganization(id) {
  const headers = new Headers(authHeader());
  const requestOptions = {
    method: "PATCH",
    headers: headers,
  };
  return fetch(`${requestUrl}/admin/confirm/organization/${id}`, requestOptions)
    .then(handleResponse)
    .then((data) => {
      return data;
    });
}
function confirmDepartment(id) {
    const headers = new Headers(authHeader());
    const requestOptions = {
      method: "PATCH",
      headers: headers,
    };
    return fetch(`${requestUrl}/admin/confirm/department/${id}`, requestOptions)
      .then(handleResponse)
      .then((data) => {
        return data;
      });
  }

  function createProduct(
      nameUkr,
      nameEn,
      productType,
      description
    ) {
      const headers = new Headers(authHeader());
      headers.append("Content-Type", "application/json");
      const requestOptions = {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
            nameUkr,
            nameEn,
            productType,
            description
        }),
      };
    
      return fetch(`${requestUrl}/admin/dictionary/products`, requestOptions)
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