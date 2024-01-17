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

// For Owner
import OwnerLayout from "./layouts/ownerLayout"; 
import Employees from "./pages/OwnerSystem/employee";
import EmployeeCreate from "./pages/OwnerSystem/employee/create";
import EmployeeEdit from "./pages/OwnerSystem/employee/edit";
import MemberLayout from "./layouts/memberLayout";

// For Member
//PreOrder

//Member
import MenuPreorder from "./pages/MemberSystem/preOrder";

//Profile
import ProfileMember from "./pages/MemberSystem/profile";
import EditProfileMember from "./pages/MemberSystem/profile/edit";
import ManagePreorder from "./pages/EmployeeSystem/managepreorder";
import ManagePreorderEdit from "./pages/EmployeeSystem/managepreorder/edit";
import Payment from "./pages/MemberSystem/payment/payment";
// in now test...

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index element={<Home />} />
      <Route path="" element={<MemberLayout />}>
        <Route path="/menuPreorder" element={<MenuPreorder />} />
        <Route path="/profileMember" element={<ProfileMember />} />
        <Route
          path="/profileMember/edit/:id"
          element={<EditProfileMember />}
        />
      </Route>
      <Route path="" element={<EmployeeLayout />}>
        <Route path="/mainEmployee" element={<Mains />} />
        <Route path="/menu" element={<Menus />} />
        <Route path="/menu/create" element={<MenuCreate />} />
        <Route path="/menu/edit/:id" element={<MenuEdit />} />
        <Route path="/menu/ingredientMenu/:id" element={<IngredientMenus />} />
        <Route path="/menu/ingredientMenu/create/:id" element={<IngredientMenuCreate />} />
        <Route path="/member" element={<Members />} />
        <Route path="/member/edit/:id" element={<MemberEdit />} />
        <Route path="/ingredient" element={<Ingredient />} />
        <Route path="/ingredient/create" element={<IngredientCreate />} />
        <Route path="/ingredient/edit/:id" element={<IngredientEdit />} />
        <Route path="/history" element={<History />} />
        <Route path="/managepreorder" element={<ManagePreorder />} />
        <Route path="/managepreorder/edit/:id" element={<ManagePreorderEdit />} />
      </Route>
        <Route path="/payment/:pid" element={<Payment />} />

      <Route path="" element={<OwnerLayout />}>
        <Route path="/mainOwner" element={<Mains />} />
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