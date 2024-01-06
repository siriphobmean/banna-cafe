import React, { useEffect, useState } from "react";
import { CiLogout } from "react-icons/ci";
import "./sidebarMenu.css";
import { NavLink } from "react-router-dom";
import { MenuTypesInterface } from "../../interfaces/IMenuType";
import { GetMenuTypes } from "../../services/https/menu";
import { MembersInterface } from "../../interfaces/IMember";

interface SidebarMemuProps {
  onSelectMenuType: (menuType: MenuTypesInterface) => void;
  member: MembersInterface | null;
}

export default function SidebarMemu({ onSelectMenuType, member }: SidebarMemuProps) {
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
  useEffect(() => {
    getMenuTypes();
  }, []);

  return (
    <div className="sidebar-menu1">
      <div className="top">
        <div className="side-text home">Menu</div>
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
                      selectedMenuType === item ? "active" : ""
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
              <span>{member?.Point}</span>
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
