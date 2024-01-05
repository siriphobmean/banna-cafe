import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaStar } from "react-icons/fa";
import { IoRestaurantOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import "./addMenuPreOrder.css";
import { PreorderMenusInterface } from "../../../../interfaces/IPreorderMenu";
import {
  CreatePreorderMenu,
  GetDrinkOptions,
  GetMenuSize,
  GetSweetnesses,
} from "../../../../services/https/preoederMenu";
import { MenusInterface } from "../../../../interfaces/IMenu";
import { PreordersInterface } from "../../../../interfaces/IPreorder";
import { GetRatingsByMenuID } from "../../../../services/https/rating";
import { RatingsInterface } from "../../../../interfaces/IRating";
import { MenuSizesInterface } from "../../../../interfaces/IMenuSize";
import { SweetnessesInterface } from "../../../../interfaces/ISweetness";
import { OptionDrinksInterface } from "../../../../interfaces/IOptionDrink";
import {
  CreatePreorder,
  GetNewPreorderByMemberID,
  GetPreorderStatusPaymentByMemberID,
} from "../../../../services/https/preorder";
import { StatusApprovePreordersInterface } from "../../../../interfaces/IStatusApprovePreorder";
import { PreorderStatusApprovesInterface } from "../../../../interfaces/IPreorderStatusApprove";
import { PreorderStatusRecivesInterface } from "../../../../interfaces/IPreorderStatusRecive";
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
  const [preorder_status_approver, setPreorder_status_approver] =
    useState<StatusApprovePreordersInterface>();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<
    PreorderMenusInterface &
      PreordersInterface &
      PreorderStatusApprovesInterface &
      PreorderStatusRecivesInterface
  >({
    defaultValues: {
      Quantity: 1,
      TotalCost: addMenu?.MenuCost,
      MenuID: addMenu?.ID,
      PreorderID: 1,
      MenuSizeID: 1, // Assuming it's an array for multiple selections
      SweetnessID: 1,
      DrinkOptionID: 1,
      DrinkOptionStatus: 1,
      SweetnessStatus: 1,
      MenuSizeStatus: 1,

      TotalAmount: 0,
      MemberID: 1,
      // PickupTime: "2006-01-02T15:04:05Z07:00",
      // PickupDate: "2006-01-02T15:04:05Z07:00",
      Note: "",
      Respond: "",

      StatusApprovePreorderID: 1,
      StatusRecivePreorderID: 1,
    },
  });

  const onSubmitAddMenuPreorder = async (values: PreorderMenusInterface & PreordersInterface) => {

    if (preorder_status_approver?.ID === 2 ||(await getNewPreoderByMember(1)) === undefined) {
      let res1 = await CreatePreorder(values);
      if (!res1.status) {
        messageApi.open({
          type: "error",
          content: "เกิดข้อผิดพลาด1",
        });
        return;
      }
    }

    values.PreorderID = await getNewPreoderByMember(1);
    
    let res2 = await CreatePreorderMenu(values);
    if (res2.status) {
      messageApi.open({
        type: "success",
        content: "บันทึกเมนูสำเร็จ",
      });
      setTimeout(function () {
        onCloseAddmenupop();
      }, 1000);
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
  const getPreoderStatusPaymentByMember = async (id: number) => {
    let res = await GetPreorderStatusPaymentByMemberID(id);
    if (res) {
      setPreorder_status_approver(res);
    }
  };
  const getNewPreoderByMember = async (
    id: number
  ): Promise<number | undefined> => {
    let res = await GetNewPreorderByMemberID(id);

    if (res) {
      return res.ID;
    }
    return undefined;
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        getMenusRating(),
        getMenuSizes(),
        getDrinkOptions(),
        getSweetnesses(),
        getPreoderStatusPaymentByMember(1),
      ]);
    };
    fetchData();
  }, [addMenu?.ID]);

const quantity = watch("Quantity");

const handleDecrease = () => {
  if (
    quantity !== undefined &&
    quantity > 1 &&
    addMenu?.MenuCost !== undefined
  ) {
    const newQuantity = quantity - 1;
    setValue("Quantity", newQuantity);
    setValue("TotalCost", newQuantity * addMenu.MenuCost);
  }
};

const handleIncrease = () => {
  if (
    quantity !== undefined &&
    quantity >= 1 &&
    addMenu?.MenuCost !== undefined
  ) {
    const newQuantity = quantity + 1;
    setValue("Quantity", newQuantity);
    setValue("TotalCost", newQuantity * addMenu.MenuCost);
  }
};


  
  console.log("preorder");
  console.log(preorder_status_approver);
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
          <p>{addMenu?.MenuCost ?? 1}-.</p>
        </div>
      </div>
      <button className="btn-addmenu" type="submit">
        +เพิ่ม
      </button>
    </form>
  );
};
export default AddMenuPreorder;
