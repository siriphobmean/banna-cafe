import React from 'react'
import { NavLink, } from "react-router-dom";
import { NavbarHomeData } from './data';
import "./navbarHome.css";
interface NavbatProps {
  onOpen: () => void;
}
const NavbarHome: React.FC<NavbatProps> = ({ onOpen }) => {
  return (
    <nav className={'nav-home'}>
      <ul className='nav-home-items'>
        {NavbarHomeData.map((item, index) => {
          return (
            <li key={index} className={item.cName}>
              <NavLink to={item.path}>
                <span>{item.title}</span>
              </NavLink>
            </li>
          );
        })}
        <li className="nav-text" onClick={onOpen}>
          <NavLink to={"#"}><span>Login</span></NavLink>
        </li>
      </ul>
    </nav>
  )
}
export default NavbarHome;