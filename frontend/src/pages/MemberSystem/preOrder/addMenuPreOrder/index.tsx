import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaStar } from "react-icons/fa";
import { IoRestaurantOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import "./addMenuPreorder.css";
import { PreorderMenusInterface } from "../../../../interfaces/IPreorderMenu";
import { CreatePreorderMenu, GetDrinkOptions, GetMenuSize, GetSweetnesses } from "../../../../services/https/preoederMenu";
import { MenusInterface } from "../../../../interfaces/IMenu";
import { PreordersInterface } from "../../../../interfaces/IPreorder";
import { GetRatingsByMenuID } from "../../../../services/https/rating";
import { RatingsInterface } from "../../../../interfaces/IRating";
import { MenuSizesInterface } from "../../../../interfaces/IMenuSize";
import { SweetnessesInterface } from "../../../../interfaces/ISweetness";
import { OptionDrinksInterface } from "../../../../interfaces/IOptionDrink";
interface AddMenuPreorderProps {
  onCloseAddmenupop: () => void;
  addMenu: MenusInterface | undefined;
}
const AddMenuPreorder: React.FC<AddMenuPreorderProps> = ({
  onCloseAddmenupop,
  addMenu,
}) => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [rating, setRating] = useState<number | string>("");
  const [menuSize, setMenuSize] = useState<MenuSizesInterface[]>([]);
  const [sweetness, setSweetness] = useState<SweetnessesInterface[]>([]);
  const [drinkOption, setDrinkOption] = useState<OptionDrinksInterface[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PreorderMenusInterface>({
    defaultValues: {
      Quantity: 1,
      TotalCost: addMenu?.MenuCost,
      MenuID: addMenu?.ID,
      PreorderID: 1,
      MenuSizeID: 0,
      SweetnessID: 0,
      OptionDrinkID: 0,
    },
  });
  const onSubmitAddMenuPreorder = async (
    values: PreorderMenusInterface & PreordersInterface
  ) => {
    console.log("datapreoder");
    console.log(values);
    let res = await CreatePreorderMenu(values);
    if (res.status) {
      messageApi.open({
        type: "success",
        content: "บันทึกเมนูสำเร็จ",
      });
      setTimeout(function () {
        window.location.reload();
      }, 1000);
      onCloseAddmenupop();
    } else {
      messageApi.open({
        type: "error",
        content: "เกิดข้อผิดพลาด",
      });
    }
  };
  const getMenusRating = async () => {
    let res = await GetRatingsByMenuID(addMenu?.ID);
    if (res) {
      setRating(setMenuRatingByMenuID(res));
    } else {
      setRating("+");
    }
  };
  const setMenuRatingByMenuID = (rat: RatingsInterface[]): number | string => {
    if (rat.length === 0) {
      return "+";
    }
    let sumRating = 0;
    for (let i = 0; i < rat.length; i++) {
      sumRating += rat[i].Score || 0;
    }
    return sumRating / rat.length;
  };

  const getMenuSizes = async () => {
    let res = await GetMenuSize();
    if (res) {
      setMenuSize(res);
    }
  };
  const getSweetnesses = async () => {
    let res = await GetSweetnesses();
    if (res) {
      setSweetness(res);
    }
  };
  const getDrinkOptions = async () => {
    let res = await GetDrinkOptions();
    if (res) {
      setDrinkOption(res);
    }
  };
  useEffect(() => {
    const fetchData = async () => {;
      await Promise.all([
        getMenusRating(),
        getMenuSizes(),
        getDrinkOptions(),
        getSweetnesses(),
      ]);
    };

    fetchData();
  }, [addMenu?.ID]);
  
  return (
    <form
      className="add-crad"
      name="basic"
      onSubmit={handleSubmit((data) => onSubmitAddMenuPreorder(data))}
      autoComplete="off"
    >
      {contextHolder}
      <div className="rat-costadd">
        <div className="addmenu-rating">
          <FaStar /> <span>{rating}</span>
        </div>
        <span className="icon-close-addmenu" onClick={onCloseAddmenupop}>
          <IoRestaurantOutline />
        </span>
      </div>
      <div className="form-add">
        <div className="addmenu-imge">
          <img src={addMenu?.MenuImage} alt="Menu Image" />
        </div>
        <div className="addmenu-name">
          {addMenu?.MenuName} <br />
          <span>{addMenu?.MenuNameEng} </span>
        </div>
        <div className="menu-amount">
          <div className="btn-amout minus">-</div>
          <span>1</span>
          <div className="btn-amout add">+</div>
        </div>
        <h5>
          ขนาด
          {menuSize.map((menuSize, index) => (
            <div className="menu-size">
              <label className="lc">
                <input type="checkbox" className="ic" />
                {menuSize.Quantity} ml.
              </label>
            </div>
          ))}
        </h5>
        <h5>
          ความหวาน
          {sweetness.map((sweetness, index) => (
            <div className="menu-sweetness">
              <label>
                <input type="checkbox" />
                {sweetness.Name} <span>100%</span>
              </label>
            </div>
          ))}
        </h5>
        <h5>
          รูปแบบ
          {drinkOption.map((drinkOption, index) => (
            <div className="menu-option">
              <label>
                <input type="checkbox" />
                {drinkOption.Name}
              </label>
            </div>
          ))}
        </h5>
        <div className="menu-total">
          <span>ราคา</span>
          <p>{(addMenu?.MenuCost ?? 1)}-.</p>
        </div>
      </div>
      <button className="btn-addmenu" type="submit">
        +เพิ่ม
      </button>
    </form>
  );
};
export default AddMenuPreorder;
