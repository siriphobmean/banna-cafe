import { PreorderStatusRecivesInterface } from "../../../interfaces/IPreorderStatusRecive";

const apiUrl = "http://localhost:8080";

async function CreatePreorderStatusRecive(
  data: PreorderStatusRecivesInterface
) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/preorderStatusRecives`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
    });

  return res;
}

async function UpdatePreorderStatusRecive(data: PreorderStatusRecivesInterface) {
  const requestOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/preorderStatusRecives`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
    });

  return res;
}

async function DeletePreorderStatusReciveByID(id: Number | undefined) {
  const requestOptions = {
    method: "DELETE",
  };

  let res = await fetch(`${apiUrl}/preorderStatusRecive/${id}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

// async function GetPreorderStatusReciveById(id: Number | undefined) {
//   const requestOptions = {
//     method: "GET",
//   };

//   let res = await fetch(`${apiUrl}/preorderStatusRecive/${id}`, requestOptions)
//     .then((response) => response.json())
//     .then((res) => {
//       if (res.data) {
//         return res.data;
//       } else {
//         return false;
//       }
//     });

//   return res;
// }

export {
  CreatePreorderStatusRecive,
  UpdatePreorderStatusRecive,
  DeletePreorderStatusReciveByID,
  // GetPreorderStatusReciveById,
};
