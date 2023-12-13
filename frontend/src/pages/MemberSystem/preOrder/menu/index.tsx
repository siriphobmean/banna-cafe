import { useState, useEffect} from 'react';
import './menu.css';
import { FaStar } from "react-icons/fa";
import { MenusInterface } from '../../../../interfaces/IMenu';
import { GetMenusBYMenuTypeID } from '../../../../services/https/menu';
interface MenuAllProps {
  onAddmenupop: () => void;
}
const MenuAll: React.FC<MenuAllProps> = ({ onAddmenupop }) => {
  const [menus, setMenus] = useState<MenusInterface[]>([]);
  const getMenusByName = async () => {
    let res = await GetMenusBYMenuTypeID(Number(1));
    if (res) {
      setMenus(res);
      // console.log(res)
    }
  };
  
  useEffect(() => {
    getMenusByName();
  }, []);
  return (
    <div className="menu-all">
      {menus.map((menu) => (
        <div className="menu-crad" key={menu.ID}>
          <div className="menu-crad menu-rating">
            <FaStar /> <span>4</span>
          </div>
          <div className="menu-item">
            <div className="menu-imge">
              <img src={menu.MenuImage} alt="Menu Image" />
            </div>
            <div className="manu-name">
              {menu.MenuName} <br />
              <span>{menu.MenuNameEng}</span>
            </div>
            <div className="cost-btn">
              <div className="menu-cost">{menu.MenuCost}-.</div>
              <button className="btn-add" onClick={onAddmenupop}>
                +เพิ่ม
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default MenuAll;
