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
