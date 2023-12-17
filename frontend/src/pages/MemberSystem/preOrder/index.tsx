import { useState, useEffect } from "react";
import { PiBasketFill } from "react-icons/pi";
import { IoSearch } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import SidebarMemu from "../../../components/sidebarMember";
import MenuAll from "./menu";
import AddMenuPreorder from "./addMenuPreorder";
import EditPreorder from "./editPreorder";
import MenuSlide from "./menuslide";
import Footer from "../../../components/footer";
import { GetMenusByName } from "../../../services/https/preorder";
import { MenusInterface } from "../../../interfaces/IMenu";
import { MenuTypesInterface } from "../../../interfaces/IMenuType";
import "./menuPreorder.css";
export default function MenuPreorder() {
  const [addMenupop, setAddmenupop] = useState(false);
  const [basketMenupop, setBasketMenupop] = useState(false);
  const [selectedMenuType, setSelectedMenuType] =
    useState<MenuTypesInterface | null>(null);

  const handleSelectMenuType = (menuType: MenuTypesInterface) => {
    setSelectedMenuType(menuType);
  };
  const [searchText, setSearchText] = useState(String);
  const [menusSearch, setMenusSearch] = useState<MenusInterface[]>([]);
  const [menus, setMenus] = useState<MenusInterface[]>([]);
  const [menuslide, setMenuSlide] = useState<MenusInterface>();
  const [menu, setMenu] = useState<MenusInterface>();
  console.log("menu");
  console.log(menu);
  const getMenusByMenuName = async (e: string) => {
    if (
      e.trim() &&
      e != "/" &&
      e !== "#" &&
      e !== "%" &&
      e !== "." &&
      e !== "." &&
      e !== "\\"
    ) {
      let res = await GetMenusByName(e);
      if (res) {
        setMenusSearch(res);
      }
    } else {
      setMenusSearch([]);
      setSearchText("");
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    e.preventDefault();
    getMenusByMenuName(e.target.value);
  };
  const handleSearchButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    getMenusByMenuName(searchText);
  };
  return (
    <div className="menuPreorder">
      <div className="sidebarMemu">
        <SidebarMemu onSelectMenuType={handleSelectMenuType} />
      </div>
      <div className="contentMenu">
        <header>
          <form className="search-menu">
            <label htmlFor="">
              <IoSearch className="icon-search" />
              <input
                className="search-input"
                placeholder="search for menu"
                value={searchText}
                onChange={handleInputChange}
              />
              <button onClick={handleSearchButtonClick}>search</button>
            </label>
          </form>
          <div
            className="basket-preorder"
            onClick={() => setBasketMenupop(true)}
          >
            <PiBasketFill className="basket-icon" />
          </div>
        </header>
        <main>
          <div className="menu-recomment">
            <div className="menu-slide">
              <MenuSlide
                onAddmenupop={() => setAddmenupop(true)}
                onAddMenu={(menu) => setMenu(menu)}
                menus={menus}
                setMenushow={(menu) => setMenuSlide(menu)}
              />
            </div>
            <div className="munu-slide-information">
              <div className="information-text">Information</div>
              <div className="imge-information"></div>
              <div className="name-information">
                Matchalatte & Orang <span>ส้มส้ม</span>
              </div>
              <div className="cost-information">
                ราคา <span>129 bath.</span>
              </div>
              <div className="rating-information">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
            </div>
            <div className="munu-promotion">
              <div className="information-text">Promotion & Recommend</div>
              <div className="imges-promotion"></div>
            </div>
          </div>
          <div className="menu-block">
            <div className="menu-text">Menu</div>
            <MenuAll
              onAddmenupop={() => setAddmenupop(true)}
              menusSearch={menusSearch}
              searchText={searchText}
              selectedMenuType={selectedMenuType}
              onAddMenu={(menu) => setMenu(menu[0])}
              onchangeMenus={(munus) => setMenus(munus)}
            />
            <br />
          </div>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>

      {addMenupop && (
        <div className="add-menu">
          <AddMenuPreorder
            onCloseAddmenupop={() => {
              setAddmenupop(false);
            }}
            addMenu={menu}
          />
        </div>
      )}
      {basketMenupop && (
        <div className="edit-basketes">
          <EditPreorder onClosebasketMenupop={() => setBasketMenupop(false)} />
        </div>
      )}
    </div>
  );
}
