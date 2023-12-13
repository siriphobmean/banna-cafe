import { PreorderStatusApprovesInterface } from "../../../interfaces/IPreorderStatusApprove";

const apiUrl = "http://localhost:8080";

async function CreatePreorderStatusApprove(
  data: PreorderStatusApprovesInterface
) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/preorderStatusApproves`, requestOptions)
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

async function UpdatePreorderStatusApprove(
  data: PreorderStatusApprovesInterface
) {
  const requestOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/preorderStatusApproves`, requestOptions)
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

async function DeletePreorderStatusApproveByID(id: Number | undefined) {
  const requestOptions = {
    method: "DELETE",
  };

  let res = await fetch(
    `${apiUrl}/preorderStatusApprove/${id}`,
    requestOptions
  )
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

// async function GetPreorderStatusApproveById(id: Number | undefined) {
//   const requestOptions = {
//     method: "GET",
//   };

//   let res = await fetch(`${apiUrl}/preorderStatusApprove/${id}`, requestOptions)
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
  CreatePreorderStatusApprove,
  UpdatePreorderStatusApprove,
  DeletePreorderStatusApproveByID,
  // GetPreorderStatusApproveById,
};
