// export default function apiMultipart(apiType, path, data, token) {
//   return new Promise(function (resolve, reject) {
//     fetch(window.APIURL + path, {
//       method: apiType,
//       headers: {
//         Authorization: token,
//       },
//       body: data,
//     })
//       .then((res) => res.json())
//       .then(
//         (result) => {
//           resolve(result);
//         },
//         (error) => {
//           resolve(false);
//         }
//       );
//   });
// }

export default function apiMultipart(apiType, path, data, token) {
  return new Promise(function (resolve, reject) {
    fetch(window.APIURL + path, {
      method: apiType,
      headers: {
        Authorization: token,
      },
      body: data,
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
