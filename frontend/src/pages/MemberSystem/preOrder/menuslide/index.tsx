import React, { useEffect, useState } from "react";
import { MenusInterface } from "../../../../interfaces/IMenu";

import "../menuPreorder.css";
interface MenuSlides {
  onAddmenupop: () => void;
  menus: MenusInterface[];
  onAddMenu: (menu: MenusInterface) => void;
  setMenushow: (menu: MenusInterface) => void;
}
function MenuSlide({
  onAddmenupop,
  menus,
  onAddMenu,
  setMenushow,
}: MenuSlides) {
  const [indexStart, setIndexStart] = useState(0);
  let indexEnd = indexStart + 3;
  const menushow = menus.slice(indexStart, indexEnd);
  if (indexEnd >= menus.length) {
    indexEnd = menus.length + 1;
  }
  if (indexStart < 0) {
    setIndexStart(0);
  }
  useEffect(() => {
    setMenushow(menushow[1]);
  }, []);
  return (
    <>
      <div className="imge-slide">
        <button
          className="bnt-laft"
          onClick={() => setIndexStart(indexStart - 1)}
        ></button>
        <div className="block-item">
          {menushow.map((menu, index) => (
            <div key={index} className={`menu-imge i${index}`}>
              <img src={menu.MenuImage} alt={`Menu Image ${index}`} />
            </div>
          ))}
        </div>
        <button
          className="bnt-right"
          onClick={() => setIndexStart(indexStart + 1)}
        ></button>
      </div>
      <div className="menu-name">
        {/* Render other menu information based on the selected menu */}
        {menushow.length > 0 && (
          <>
            <p>{menushow[1].MenuCost} bath.</p>
            <span>
              {menushow[1].MenuName}
              <span> </span>
              {menushow[1].MenuNameEng}
            </span>
            <button
              onClick={() => {
                onAddmenupop();
                onAddMenu(menushow[1]);
              }}
            >
              <span>+</span>
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default MenuSlide;
