import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

//Home


// For Employee
// By Mean
import EmployeeLayout from "./layouts/employeeLayout";
import Mains from "./pages/Employee System/main";
import Menus from "./pages/Employee System/menu";
import MenuCreate from "./pages/Employee System/menu/create";
import MenuEdit from "./pages/Employee System/menu/edit";
import IngredientMenus from "./pages/Employee System/menu/ingredientMenu";
import Members from "./pages/Employee System/member";
import MemberEdit from "./pages/Employee System/member/edit";

// By Nop
import Ingredient from "./pages/Employee System/ingredient";
import IngredientCreate from "./pages/Employee System/ingredient/create";
import IngredientEdit from "./pages/Employee System/ingredient/edit";
import History from "./pages/Employee System/history";

// For Owner
import OwnerLayout from "./layouts/ownerLayout"; 
import Employees from "./pages/Owner System/employee";
import EmployeeCreate from "./pages/Owner System/employee/create";
import EmployeeEdit from "./pages/Owner System/employee/edit";
import MemberLayout from "./layouts/memberLayout";

// For Member
//PreOrder

//Profile

// in now test...

const router = createBrowserRouter(
  createRoutesFromElements(
      <>
          <Route path="" element={<MemberLayout/>}>
              <Route path="/mainMember" element={<Mains/>}/>
          </Route>

          <Route path="" element={<EmployeeLayout />}>
              <Route path="/mainEmployee" element={<Mains />}/>
              <Route path="/menu" element={<Menus />}/>
              <Route path="/menu/create" element={<MenuCreate />}/>
              <Route path="/menu/edit/:id" element={<MenuEdit />}/>
              <Route path="/menu/ingredientMenu/:id" element={<IngredientMenus />}/>
              <Route path="/member" element={<Members />}/>
              <Route path="/member/edit/:id" element={<MemberEdit />}/>
              <Route path="/ingredient" element={<Ingredient />} />
              <Route path="/ingredient/create" element={<IngredientCreate />} />
              <Route path="/ingredient/edit/:id" element={<IngredientEdit />} />
              <Route path="/history" element={<History />} />
          </Route>

          <Route path="" element={<OwnerLayout/>}>
              <Route path="/mainOwner" element={<Mains/>}/>
              <Route path="/employee" element={<Employees />}/>
              <Route path="/employee/create" element={<EmployeeCreate />}/>
              <Route path="/employee/edit/:id" element={<EmployeeEdit />}/>
          </Route>
      </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;