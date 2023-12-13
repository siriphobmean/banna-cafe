import React, { useEffect, useState } from "react";
import { CiLogout } from "react-icons/ci";
import "./sidebarMenu.css";
import { NavLink } from "react-router-dom";
import { MenuTypesInterface } from "../../interfaces/IMenuType";
import { GetMenuTypes } from "../../services/https/menu";
export default function SidebarMemu() {
  const [menuTypes, setmenuTypes] = useState<MenuTypesInterface[]>([]);
  const getMenuTypes = async () => {
    let res = await GetMenuTypes();
    if (res) {
      setmenuTypes(res);
      // console.log(res);
    }
  };
  useEffect(() => {
    getMenuTypes();
  }, []);
  return (
    <div className="sidebar-menu1">
      <div className="top">
        <div className="side-text home">Menu</div>
        {/* <NavLink to="../" className="logout"><CiLogout/>Logout</NavLink> */}
      </div>
      <div className="mid">
        <div className="side-menuType">
          <ul>
            {menuTypes.map((item, index) => {
              return (
                <li key={index} className="side-text">
                  <NavLink to={"#"}>
                    <span>{item.TypeName}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="bottom">
        <NavLink to="/profileMember">
          <div className="side-text profile">
            <div className="side-text point">
              <span>120</span>
            </div>
            <p>Profile</p>
          </div>
        </NavLink>
        <NavLink to="../" className="logout">
          <CiLogout />
          Logout
        </NavLink>
      </div>
    </div>
  );
}
