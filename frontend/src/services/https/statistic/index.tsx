const apiUrl = "http://localhost:8080";

async function GetRowMember() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/countMember`, requestOptions)
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

async function GetRowIngredient() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    let res = await fetch(`${apiUrl}/countIngredient`, requestOptions)
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

// async function GetRowPromotion() {
//     const requestOptions = {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };
  
//     let res = await fetch(`${apiUrl}/countPromotion`, requestOptions)
//       .then((response) => response.json())
//       .then((res) => {
//         if (res.data) {
//           return res.data;
//         } else {
//           return false;
//         }
//       });
  
//     return res;
//   }

export {
  GetRowMember,
  GetRowIngredient,
  // GetRowPromotion
};