import React, { useEffect, useState } from "react";
import { CiLogout } from "react-icons/ci";
import "./sidebarMenu.css";
import { NavLink } from "react-router-dom";
import { MenuTypesInterface } from "../../interfaces/IMenuType";
import { GetMenuTypes } from "../../services/https/menu";

interface SidebarMemuProps {
  onSelectMenuType: (menuType: MenuTypesInterface) => void;
}

export default function SidebarMemu({ onSelectMenuType }: SidebarMemuProps) {
  const [menuTypes, setmenuTypes] = useState<MenuTypesInterface[]>([]);
  const [selectedMenuType, setSelectedMenuType] =
    useState<MenuTypesInterface>();
  const handleMenuTypeClick = (menuType: MenuTypesInterface) => {
    setSelectedMenuType(menuType);
    onSelectMenuType(menuType);
  };

  const getMenuTypes = async () => {
    let res = await GetMenuTypes();
    if (res) {
      setmenuTypes(res);
      onSelectMenuType(res[0]);
      setSelectedMenuType(res[0]);
    }
  };
  console.log(selectedMenuType);
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
                <li className="side-text">
                  <div
                    key={index}
                    className={`menutype-item${
                      (selectedMenuType===item)? "active" : ""
                    }`}
                    onClick={() => handleMenuTypeClick(item)}
                  >
                    <span>{item.TypeName}</span>
                  </div>
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
