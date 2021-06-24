import { authHeader } from "../_helpers";

const requestUrl = "https://localhost:5001";

export const ClientService = {
    getDepartments,
    getDepartmentInformation,
    getAuthorizedDepartmentInformation
};

function getDepartments(
    drugName,
    region,
    area,
    localityName,
    addressStreet,
    addressStreetNumber,
    skip, 
    limit,
) {
    const requestOptions = {
      method: "GET",
    };
  
    return fetch(
      `${requestUrl}/client/departments?drugName=${drugName}&region=${region}&area=${area}&localityName=${localityName}&addressStreet=${addressStreet}&addressStreetNumber=${addressStreetNumber}&skip=${skip}&limit=${limit}`,
      requestOptions
    )
      .then(handleResponse)
      .then((data) => {
        return data;
      });
  }

  function getDepartmentInformation(
    drugName,
    departmentId,
    skip, 
    limit,
) {
    const requestOptions = {
      method: "GET",
    };
  
    return fetch(
      `${requestUrl}/client/department/${departmentId}/information?search=${drugName}&skip=${skip}&limit=${limit}`,
      requestOptions
    )
      .then(handleResponse)
      .then((data) => {
        return data;
      });
  }

  function getAuthorizedDepartmentInformation() {
  const headers = new Headers(authHeader());

  const requestOptions = {
    method: "GET",
    headers: headers
  };
  
    return fetch(
      `${requestUrl}/department/information`,
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
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }
  
      return data;
    });
  }