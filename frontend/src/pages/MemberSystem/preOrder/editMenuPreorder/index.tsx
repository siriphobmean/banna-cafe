import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaStar } from "react-icons/fa";
import { IoRestaurantOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import "../addMenuPreorder/addMenuPreorder.css";
import { PreorderMenusInterface } from "../../../../interfaces/IPreorderMenu";
import {
  GetDrinkOptions,
  GetMenuSize,
  GetSweetnesses,
  UpdatePreorderMenu,
} from "../../../../services/https/preoederMenu";
import { MenusInterface } from "../../../../interfaces/IMenu";
import { PreordersInterface } from "../../../../interfaces/IPreorder";
import { GetRatingsByMenuID } from "../../../../services/https/rating";
import { RatingsInterface } from "../../../../interfaces/IRating";
import { MenuSizesInterface } from "../../../../interfaces/IMenuSize";
import { SweetnessesInterface } from "../../../../interfaces/ISweetness";
import { OptionDrinksInterface } from "../../../../interfaces/IOptionDrink";
import { UpdatePreorder } from "../../../../services/https/preorder";

interface EditMenuPreorderProps {
  onCloseAddmenupop: () => void;
  editMenu: MenusInterface | undefined;
  preordermenus: PreorderMenusInterface | undefined;
  preorder: PreordersInterface | undefined;
}
const EditMenuPreorder: React.FC<EditMenuPreorderProps> = ({
  onCloseAddmenupop,
  editMenu,
  preordermenus,
  preorder,
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
    watch,
    setValue,
    formState: { errors },
  } = useForm<PreorderMenusInterface & PreordersInterface>({
    defaultValues: {
      Quantity: preordermenus?.Quantity,
      TotalCost: editMenu?.MenuCost,
      MenuID: editMenu?.ID,
      PreorderID: preordermenus?.PreorderID,
      MenuSizeID: preordermenus?.MenuSizeID,
      SweetnessID: preordermenus?.SweetnessID,
      DrinkOptionID: preordermenus?.DrinkOptionID,
      DrinkOptionStatus: 1,
      SweetnessStatus: 1,
      MenuSizeStatus: 1,

      TotalAmount: 0,
    },
  });

  const onSubmitEditMenuPreorder = async (values: PreorderMenusInterface) => {
    values.ID = preordermenus?.ID;
    values.PreorderID = preordermenus?.PreorderID;
    const oldTotolcost = preordermenus?.TotalCost;
    let res1 = await UpdatePreorderMenu(values);
    if (res1.status) {
      messageApi.open({
        type: "success",
        content: "บันทึกเมนูสำเร็จ",
      });
      setTimeout(function () {
        onCloseAddmenupop();
      }, 1000);
      onSubmitUpDatePreorder(values, oldTotolcost ?? 0);
    } else {
      messageApi.open({
        type: "error",
        content: "เกิดข้อผิดพลาด",
      });
    }
  };
  const onSubmitUpDatePreorder = async (
    values: PreordersInterface,
    oldTotolcost: number
  ) => {
    values.ID = preorder?.ID;
    const TotalCost = (watch("TotalCost") ?? 0).toFixed(2);
    values.TotalAmount = parseFloat(TotalCost);
    values.TotalAmount = values.TotalAmount - oldTotolcost;
    values.TotalAmount = values.TotalAmount + (preorder?.TotalAmount ?? 0);
    let res1 = await UpdatePreorder(values);
    if (!res1.status) {
      messageApi.open({
        type: "error",
        content: "เกิดข้อผิดพลาด2",
      });
      return;
    }
  };
  const getMenusRating = async () => {
    let res = await GetRatingsByMenuID(editMenu?.ID);
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
    const fetchData = async () => {
      await Promise.all([
        getMenusRating(),
        getMenuSizes(),
        getDrinkOptions(),
        getSweetnesses(),
      ]);
    };
    fetchData();
  }, [editMenu?.ID]);

  const quantity = watch("Quantity");

  const handleDecrease = () => {
    if (
      quantity !== undefined &&
      quantity > 1 &&
      editMenu?.MenuCost !== undefined
    ) {
      const newQuantity = quantity - 1;
      setValue("Quantity", newQuantity);
      setValue("TotalCost", newQuantity * editMenu.MenuCost);
    }
  };

  const handleIncrease = () => {
    if (
      quantity !== undefined &&
      quantity >= 1 &&
      editMenu?.MenuCost !== undefined
    ) {
      const newQuantity = quantity + 1;
      setValue("Quantity", newQuantity);
      setValue("TotalCost", newQuantity * editMenu.MenuCost);
    }
  };

  return (
    <form
      className="add-crad"
      name="basic"
      onSubmit={handleSubmit((data) => onSubmitEditMenuPreorder(data))}
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
          <img src={editMenu?.MenuImage} alt="Menu Image" />
        </div>
        <div className="addmenu-name">
          {editMenu?.MenuName} <br />
          <span>{editMenu?.MenuNameEng} </span>
        </div>
        <div className="menu-amount">
          <div className="btn-amount minus" onClick={handleDecrease}>
            -
          </div>
          <span>{quantity}</span>
          <div className="btn-amount plus" onClick={handleIncrease}>
            +
          </div>
        </div>
        <h5>
          ขนาด
          <div className="menu-size">
            {menuSize.map((menuSize: MenuSizesInterface, index: number) => (
              <label className="lc" key={index}>
                <input
                  type="checkbox"
                  className="ic"
                  {...register("MenuSizeStatus", {
                    required: { value: true, message: "this is required" },
                  })}
                  onClick={() => {
                    const newMenuSizeID = menuSize.ID;
                    setValue("MenuSizeID", newMenuSizeID);
                  }}
                  checked={menuSize.ID === watch("MenuSizeID")}
                />
                {menuSize.Quantity} ml.
              </label>
            ))}
          </div>
          {errors.MenuSizeID && (
            <p className="errorMsg">{errors.MenuSizeID.message}</p>
          )}
        </h5>
        <h5>
          ความหวาน
          {sweetness.map((sweetness, index) => (
            <div className="menu-sweetness">
              <label>
                <input
                  type="checkbox"
                  className="ic"
                  {...register("SweetnessStatus", {
                    required: { value: true, message: "this is require" },
                  })}
                  onClick={() => {
                    const newMenuSweetnessID = sweetness.ID;
                    setValue("SweetnessID", newMenuSweetnessID);
                  }}
                  checked={watch("SweetnessID") === sweetness.ID}
                />
                {sweetness.Name} <span>{sweetness.Value}%</span>
              </label>
            </div>
          ))}
        </h5>
        <h5>
          รูปแบบ
          {drinkOption.map((drinkOption, index) => (
            <div className="menu-option">
              <label>
                <input
                  type="checkbox"
                  className="ic"
                  {...register("DrinkOptionStatus", {
                    required: { value: true, message: "this is require" },
                  })}
                  onClick={() => {
                    const newDrinkOptionID = drinkOption.ID;
                    setValue("DrinkOptionID", newDrinkOptionID);
                  }}
                  checked={watch("DrinkOptionID") === drinkOption.ID}
                />
                {drinkOption.Name}
              </label>
            </div>
          ))}
        </h5>
        <div className="menu-total">
          <span>ราคา</span>
          <p>{watch("TotalCost")?.toFixed(2) ?? "N/A"}-.</p>
        </div>
      </div>
      <button className="btn-addmenu" type="submit">
        ยืนยันการแก้ไข
      </button>
    </form>
  );
};
export default EditMenuPreorder;
