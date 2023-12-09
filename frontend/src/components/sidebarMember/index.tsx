import React from "react";
import "./sidebarMenu.css";
import { NavLink } from "react-router-dom";
import { SidebarMemberData } from "./data";
export default function SidebarMemu() {
  return (
    <div className="sidebar-menu1">
      <div className="top">
        <div className="side-text home">
          <NavLink to="../">Home</NavLink>
        </div>
      </div>
      <div className="mid">
        <div className="side-menuType">
          <ul>
            {SidebarMemberData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <NavLink to={item.path}>
                    <span>{item.title}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="bottom">
        <NavLink to="/profileMember"><div className="side-text profile">
          <div className="side-text point">
            <span>120</span>
          </div>
          <p>Profile</p>
          </div>
        </NavLink>
      </div>
    </div>
  );
}
