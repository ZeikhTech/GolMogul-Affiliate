import axios from "axios";

export const getRequest = async (url, token, params = {}, headers = {}) => {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
      ...headers,
    },
    params: {
      ...params,
    },
  };

  let returnValue;

  await axios
    .get(window.APIURL + url, config)
    .then((result) => {
      returnValue = { result: result, error: null };
    })
    .catch((err) => {
      returnValue = { result: null, error: err };
    });
  return returnValue;
};

export default function apiHelper(apiType, path, data, token) {
  if (apiType == "post") {
    return new Promise(function (resolve, reject) {
      fetch(window.APIURL + path, {
        method: apiType,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            resolve(result);
          },
          (error) => {
            resolve(false);
          }
        );
    });
  } else {
    return new Promise(function (resolve, reject) {
      fetch(window.APIURL + path, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
        .then((res) => res.json())
        .then(
          (result) => {
            resolve(result);
          },
          (error) => {
            resolve(false);
          }
        );
    });
  }
}
