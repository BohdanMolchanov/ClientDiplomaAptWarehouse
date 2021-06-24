import { authHeader } from "../_helpers";
import { UserService } from "./UserService";
const requestUrl = "https://localhost:5001";

export const RegistrationService = {
  organization,
  department,
  employee,
};

function organization(
  name,
  shortName,
  edrpou,
  password,
  phone,
  email,
  firstName,
  secondName,
  lastName
) {
  const data = {
    phone: phone,
    email: email,
    firstName: firstName,
    secondName: secondName,
    lastName: lastName,
  };

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const requestOptions = {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ name, shortName, edrpou, password, data }),
  };

  return fetch(`${requestUrl}/register/organization`, requestOptions)
    .then(handleResponse)
    .then((data) => {
      return data;
    });
}

function department(
  name,
  shortName,
  region,
  area,
  localityName,
  addressStreet,
  addressStreetNumber,
) {
  const headers = new Headers(authHeader());
  headers.append("Content-Type", "application/json");
  const requestOptions = {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      name,
      shortName,
      region,
      area,
      localityName,
      addressStreet,
      addressStreetNumber
    }),
  };

  return fetch(`${requestUrl}/register/department`, requestOptions)
    .then(handleResponse)
    .then((data) => {
      return data;
    });
}

function employee(
  departmentid,
  password,
  roleType,
  phone,
  email,
  firstName,
  secondName,
  lastName
) {
  const data = {
    roleType: roleType,
    phone: phone,
    email: email,
    firstName: firstName,
    secondName: secondName,
    lastName: lastName,
  };
  const headers = new Headers(authHeader());
  headers.append("Content-Type", "application/json");
  const requestOptions = {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ departmentid, password, data }),
  };

  return fetch(`${requestUrl}/register/employee`, requestOptions)
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
