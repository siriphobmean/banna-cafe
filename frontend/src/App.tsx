// import {
//   Route,
//   RouterProvider,
//   createBrowserRouter,
//   createRoutesFromElements,
// } from "react-router-dom";

// //Home
// // By Tik
// import Home from "./pages/HomeSystem/home";
// // import Login from "./pages/home/login";

// // For Employee
// // By Mean
// import EmployeeLayout from "./layouts/employeeLayout";
// import Mains from "./pages/EmployeeSystem/main";
// import Menus from "./pages/EmployeeSystem/menu";
// import MenuCreate from "./pages/EmployeeSystem/menu/create";
// import MenuEdit from "./pages/EmployeeSystem/menu/edit";
// import IngredientMenus from "./pages/EmployeeSystem/menu/ingredientMenu";
// import IngredientMenuCreate from "./pages/EmployeeSystem/menu/ingredientMenuCreate";
// import Members from "./pages/EmployeeSystem/member";
// import MemberEdit from "./pages/EmployeeSystem/member/edit";

// // By Nop
// import Ingredient from "./pages/EmployeeSystem/ingredient";
// import IngredientCreate from "./pages/EmployeeSystem/ingredient/create";
// import IngredientEdit from "./pages/EmployeeSystem/ingredient/edit";
// import History from "./pages/EmployeeSystem/history";
// import Promotion from "./pages/EmployeeSystem/promotion";

// // For Owner
// import MainsOwner from "./pages/OwnerSystem/main";
// import OwnerLayout from "./layouts/ownerLayout";
// import Employees from "./pages/OwnerSystem/employee";
// import EmployeeCreate from "./pages/OwnerSystem/employee/create";
// import EmployeeEdit from "./pages/OwnerSystem/employee/edit";

// // For Member
// // By Tik
// //PreOrder
// import MenuPreorder from "./pages/MemberSystem/preorder";

// //Profile
// import ProfileMember from "./pages/MemberSystem/profile";
// import EditProfileMember from "./pages/MemberSystem/profile/edit";
// // in now test...
// import MemberLayout from "./layouts/memberLayout";
// import PromotionCreate from "./pages/EmployeeSystem/promotion/create";
// import PromotionEdit from "./pages/EmployeeSystem/promotion/edit";
// import React from "react";

// function App() {
//   const [token, setToken] = React.useState<String>("");

//   React.useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       setToken(token);
//     }
//   }, []);
//   if (!token) {
//     const router = createBrowserRouter(
//       createRoutesFromElements(<Route element={<Home />} />)
//     );
//     return <RouterProvider router={router} />;
//   }

//   function routeList() {
//     if (localStorage.getItem("position") == "Member") {
//       return (
//         <>
//           {/* <Route index element={<Home />} /> */}
//           <Route path="" element={<MemberLayout />}>
//             <Route path="/menuPreorder" element={<MenuPreorder />} />
//             <Route path="/profileMember" element={<ProfileMember />} />
//             <Route
//               path="/profileMember/edit/:id"
//               element={<EditProfileMember />}
//             />
//           </Route>
//         </>
//       );
//     } else if (localStorage.getItem("position") == "Employee") {
//       return (

//           <Route path="" element={<EmployeeLayout />}>
//             <Route path="/mainEmployee" element={<Mains />} />
//             <Route path="/menu" element={<Menus />} />
//             <Route path="/menu/create" element={<MenuCreate />} />
//             <Route path="/menu/edit/:id" element={<MenuEdit />} />
//             <Route
//               path="/menu/ingredientMenu/:id"
//               element={<IngredientMenus />}
//             />
//             <Route
//               path="/menu/ingredientMenu/create/:id"
//               element={<IngredientMenuCreate />}
//             />
//             <Route path="/member" element={<Members />} />
//             <Route path="/member/edit/:id" element={<MemberEdit />} />
//             <Route path="/ingredient" element={<Ingredient />} />
//             <Route path="/ingredient/create" element={<IngredientCreate />} />
//             <Route path="/ingredient/edit/:id" element={<IngredientEdit />} />
//             <Route path="/history" element={<History />} />
//             {/* <Route path="/managepreorder" element={<ManagePreorder />} /> */}
//             {/* <Route
//               path="/managepreorder/edit/:id"
//               element={<ManagePreorderEdit />}
//             /> */}
//             {/* <Route path="/payment/:pid" element={<Payment />} /> */}
//             <Route path="/promotion" element={<Promotion />} />
//             <Route path="/promotion/create" element={<PromotionCreate />} />
//             <Route path="/promotion/edit/:id" element={<PromotionEdit />} />
//           </Route>
//       );
//     } else if (localStorage.getItem("position") == "Owner") {
//       return (
//           <Route path="" element={<OwnerLayout />}>
//             <Route key="mainOwner" path="" element={<MainsOwner />} />
//             ,
//             <Route key="employee" path="/employee" element={<Employees />} />,
//             <Route
//               key="employeeCreate"
//               path="/employee/create"
//               element={<EmployeeCreate />}
//             />
//             ,
//             <Route
//               key="employeeEdit"
//               path="/employee/edit/:id"
//               element={<EmployeeEdit />}
//             />
//             ,
//           </Route>
//       );
//     }
//   }
//   console.log(localStorage.getItem("position"));
//   const router = createBrowserRouter(createRoutesFromElements(routeList()));
//   return <RouterProvider router={router} />;
// }

// export default App;

// --------------------------------------------------------------------------------------------

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

//Home
import Home from "./pages/HomeSystem/home";
// import Login from "./pages/home/login";

// For Employee
// By Mean
import EmployeeLayout from "./layouts/employeeLayout";
import Mains from "./pages/EmployeeSystem/main";
import Menus from "./pages/EmployeeSystem/menu";
import MenuCreate from "./pages/EmployeeSystem/menu/create";
import MenuEdit from "./pages/EmployeeSystem/menu/edit";
import IngredientMenus from "./pages/EmployeeSystem/menu/ingredientMenu";
import IngredientMenuCreate from "./pages/EmployeeSystem/menu/ingredientMenuCreate";
import Members from "./pages/EmployeeSystem/member";
import MemberEdit from "./pages/EmployeeSystem/member/edit";

// By Nop
import Ingredient from "./pages/EmployeeSystem/ingredient";
import IngredientCreate from "./pages/EmployeeSystem/ingredient/create";
import IngredientEdit from "./pages/EmployeeSystem/ingredient/edit";
import History from "./pages/EmployeeSystem/history";
// import Promotion from "./pages/EmployeeSystem/promotion";
// import PromotionCreate from "./pages/EmployeeSystem/promotion/create";
// import PromotionEdit from "./pages/EmployeeSystem/promotion/edit";

// For Owner
import MainsOwner from "./pages/OwnerSystem/main";
import OwnerLayout from "./layouts/ownerLayout";
import Employees from "./pages/OwnerSystem/employee";
import EmployeeCreate from "./pages/OwnerSystem/employee/create";
import EmployeeEdit from "./pages/OwnerSystem/employee/edit";
import MemberLayout from "./layouts/memberLayout";

// For Member
//PreOrder

//Member
import MenuPreorder from "./pages/MemberSystem/preorder";
// import ReviewMenu from "./pages/MemberSystem/preorder/reviewMenu";
//Profile
import ProfileMember from "./pages/MemberSystem/profile";
import EditProfileMember from "./pages/MemberSystem/profile/edit";
// import ManagePreorder from "./pages/EmployeeSystem/managepreorder";
// import ManagePreorderEdit from "./pages/EmployeeSystem/managepreorder/edit";
// import Payment from "./pages/MemberSystem/payment/payment";
// in now test...

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index element={<Home />} />
      <Route path="" element={<MemberLayout />}>
        <Route path="/menuPreorder" element={<MenuPreorder />} />
        <Route path="/profileMember" element={<ProfileMember />} />

        <Route path="/profileMember/edit/:id" element={<EditProfileMember />} />
        {/* <Route path="/reviewMenu" element={<ReviewMenu />} /> */}
      </Route>
      <Route path="" element={<EmployeeLayout />}>
        <Route path="/mainEmployee" element={<Mains />} />
        <Route path="/menu" element={<Menus />} />
        <Route path="/menu/create" element={<MenuCreate />} />
        <Route path="/menu/edit/:id" element={<MenuEdit />} />
        <Route path="/menu/ingredientMenu/:id" element={<IngredientMenus />} />
        <Route
          path="/menu/ingredientMenu/create/:id"
          element={<IngredientMenuCreate />}
        />
        <Route path="/member" element={<Members />} />
        <Route path="/member/edit/:id" element={<MemberEdit />} />
        <Route path="/ingredient" element={<Ingredient />} />
        <Route path="/ingredient/create" element={<IngredientCreate />} />
        <Route path="/ingredient/edit/:id" element={<IngredientEdit />} />
        <Route path="/history" element={<History />} />
        {/* <Route path="/managepreorder" element={<ManagePreorder />} />
        <Route path="/managepreorder/edit/:id" element={<ManagePreorderEdit />} /> */}
        {/* <Route path="/promotion" element={<Promotion />} />
        <Route path="/promotion/create" element={<PromotionCreate />} />
        <Route path="/promotion/edit/:id" element={<PromotionEdit />} /> */}
      </Route>
      {/* <Route path="/payment/:pid" element={<Payment />} /> */}

      <Route path="" element={<OwnerLayout />}>
        <Route path="/mainOwner" element={<MainsOwner />} />
        <Route path="/employee" element={<Employees />} />
        <Route path="/employee/create" element={<EmployeeCreate />} />
        <Route path="/employee/edit/:id" element={<EmployeeEdit />} />
      </Route>
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
