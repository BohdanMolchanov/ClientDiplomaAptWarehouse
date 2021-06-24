import { authHeader } from "../_helpers";
import { UserService } from "./UserService";

const requestUrl = "https://localhost:5001";

export const OwnerService = {
  getDepartments,
  getEmployees,
  getDepartmentsList
};

function getDepartments(search, skip, limit) {
  const headers = new Headers(authHeader());

  const requestOptions = {
    method: "GET",
    headers: headers,
  };

  return fetch(
    `${requestUrl}/owner/departments?search=${search}&skip=${skip}&limit=${limit}`,
    requestOptions
  )
    .then(handleResponse)
    .then((data) => {
      return data;
    });
}

function getEmployees(skip, limit) {
  const headers = new Headers(authHeader());

  const requestOptions = {
    method: "GET",
    headers: headers,
  };

  return fetch(
    `${requestUrl}/owner/employees?skip=${skip}&limit=${limit}`,
    requestOptions
  )
    .then(handleResponse)
    .then((data) => {
      return data;
    });
}

function getDepartmentsList() {
  const headers = new Headers(authHeader());

  const requestOptions = {
    method: "GET",
    headers: headers,
  };

  return fetch(
    `${requestUrl}/owner/departments/list`,
    requestOptions
  )
    .then(handleResponse)
    .then((data) => {
      return data;
    });
}

function handleResponse(response) {
  return response.text().then(text => {
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
