import { useEffect, useState } from "react";
import { IoRestaurantOutline } from "react-icons/io5";
import { message } from "antd";
import "../addMenuPreorder/addMenuPreorder.css";
import "./editPreorder.css";
import { useForm } from "react-hook-form";
import { PreorderMenusInterface } from "../../../../interfaces/IPreorderMenu";
import { PreordersInterface } from "../../../../interfaces/IPreorder";
import { MenusInterface } from "../../../../interfaces/IMenu";
import {
  GetMenuPreordersByPreoderID,
  GetNewPreorderByMemberID,
  GetPreorderStatusPaymentByMemberID,
  UpdatePreorder,
} from "../../../../services/https/preorder";
import { GetMenuById } from "../../../../services/https/menu";
import { UpdatePreorderMenu } from "../../../../services/https/preoederMenu";
import EditMenuPreorder from "../editMenuPreorder";
import { StatusApprovePreordersInterface } from "../../../../interfaces/IStatusApprovePreorder";
interface EditPreorderProps {
  onClosebasketMenupop: () => void;
}
const EditPreorder: React.FC<EditPreorderProps> = ({
  onClosebasketMenupop,
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [preordermenus, setrPeorderMenus] = useState<PreorderMenusInterface[]>(
    []
  );
  const [preordermenu, setrPeorderMenu] = useState<PreorderMenusInterface>();
  const [preorder, setPreorder] = useState<PreordersInterface>();
  const [menus, setMenus] = useState<MenusInterface[]>([]);
  const [menu, setMenu] = useState<MenusInterface>();
  const [editMenupop, setEditmenupop] = useState(false);
  const [preorder_status_approver, setPreorder_status_approver] =
    useState<StatusApprovePreordersInterface>();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PreordersInterface>({
    defaultValues: {
      TotalAmount: preorder?.TotalAmount || 0,
      MemberID: 1,
      PickUpDateTime: new Date(),
      Note: "",
      Respond: "",
    },
  });

  const getNewPreoderByMember = async (
    id: number
  ): Promise<number | undefined> => {
    let res = await GetNewPreorderByMemberID(id);
    if (res) {
      setPreorder(res);
      setValue("TotalAmount", res.TotalAmount || 0);
      setValue("MemberID", res.MemberID || 1);
      setValue("PickUpDateTime", new Date(res.PickUpDateTime) || "");
      setValue("Note", res.Note || "");
      setValue("Respond", res.Respond || "");
      getPreordersMenusByPreoderID(res.ID);
    }
    return undefined;
  };
  const getPreordersMenusByPreoderID = async (id: number) => {
    let res = await GetMenuPreordersByPreoderID(id);
    if (res) {
      setrPeorderMenus(res);
      getMenusByID(res);
    }
  };
  const getMenusByID = async (preorderMenus: PreorderMenusInterface[]) => {
    let getMenus: MenusInterface[] = [];

    for (let i = 0; i < preorderMenus.length; i++) {
      let res = await GetMenuById(preorderMenus[i].MenuID);

      if (res) {
        getMenus[i] = res;
      }
    }
    setMenus(getMenus);
  };
  const getPreoderStatusPaymentByMember = async (id: number) => {
    let res = await GetPreorderStatusPaymentByMemberID(id);
    if (res) {
      setPreorder_status_approver(res);
    }
  };
  useEffect(() => {
    getPreoderStatusPaymentByMember(1);
    getNewPreoderByMember(1);
  }, []);
  const onSubmitUpDatePreorderMenu = async (
    values: PreorderMenusInterface & PreordersInterface
  ) => {
    let res1 = await UpdatePreorderMenu(values);
    values.ID = preorder?.ID;
    values.PickUpDateTime = preorder?.PickUpDateTime;
    values.Note = preorder?.Note;
    values.Respond = preorder?.Respond;
    values.TotalAmount = watch("TotalAmount");
    let res2 = await UpdatePreorder(values);
    if (!res1.status && !res2.status) {
      messageApi.open({
        type: "error",
        content: "เกิดข้อผิดพลาด ไม่สามารถแก้ไขจำนวนได้",
      });
    }
  };
  const onSubmitUpDatePreorder = async (values: PreordersInterface) => {
    values.ID = preorder?.ID;
    values.PickUpDateTime = new Date(values?.PickUpDateTime ?? 0);
    // const h = values.PickUpDateTime.getHours;
    // values.PickUpDateTime.setHours(h);
    console.log(values.PickUpDateTime);
    console.log("values");
    console.log(values);
    let res = await UpdatePreorder(values);
    if (res.status) {
      messageApi.open({
        type: "success",
        content: "บันทึกเมนูสำเร็จ",
      });
      setTimeout(function () {
        onClosebasketMenupop();
      }, 20000);
    } else {
      messageApi.open({
        type: "error",
        content: res.message,
      });
    }
  };

  const handleDecrease = (
    preordermenu: PreorderMenusInterface,
    index: number
  ) => {
    if (
      preordermenu.Quantity !== undefined &&
      preordermenu.Quantity > 1 &&
      preordermenu.Menu?.MenuCost !== undefined
    ) {
      const menuCost = (preordermenu.TotalCost ?? 0) / preordermenu.Quantity;
      const newQuantity = preordermenu.Quantity - 1;
      preordermenus[index].TotalCost = (preordermenu.TotalCost ?? 0) - menuCost;
      preordermenus[index].Quantity = newQuantity;
      setValue("TotalAmount", (watch("TotalAmount") ?? 0) - menuCost);
    }
  };
  const handleIncrease = (
    preordermenu: PreorderMenusInterface,
    index: number
  ) => {
    if (
      preordermenu.Quantity !== undefined &&
      preordermenu.Quantity >= 1 &&
      preordermenu.Menu?.MenuCost !== undefined
    ) {
      const menuCost = (preordermenu.TotalCost ?? 0) / preordermenu.Quantity;
      const newQuantity = preordermenu.Quantity + 1;
      preordermenus[index].TotalCost = (preordermenu.TotalCost ?? 0) + menuCost;
      preordermenus[index].Quantity = newQuantity;
      setValue("TotalAmount", (watch("TotalAmount") ?? 0) + menuCost);
    }
  };
  const pickUpDateTime = watch("PickUpDateTime");
  return (
    <>
      <form
        className="edit-crad"
        name="basic"
        onSubmit={handleSubmit((data) => onSubmitUpDatePreorder(data))}
        autoComplete="off"
      >
        {contextHolder}
        <div className="rat-costEdit">
          <span className="icon-close-addmenu" onClick={onClosebasketMenupop}>
            <IoRestaurantOutline />
          </span>
        </div>
        <div className="form-edit">
          <h4>ตะกร้าสินค้า</h4>
          <div className="basket-menu">
            {preorder_status_approver?.ID == 1 &&
              preordermenus.map(
                (preordermenu: PreorderMenusInterface, index: number) => (
                  <>
                    <div className="menu-data" key={index}>
                      <img
                        src={menus[index]?.MenuImage}
                        alt=""
                        className="imge-item"
                      />
                      <h5 className="name-item">
                        {menus[index]?.MenuName}
                        <br />
                        <span>{menus[index]?.MenuNameEng}</span>
                      </h5>
                      <h5 className="size-item">
                        {preordermenu.MenuSize?.Name}
                      </h5>
                      <h5 className="total-amount">
                        {preordermenu.TotalCost !== undefined
                          ? preordermenu.TotalCost.toFixed(2)
                          : "N/A"}
                        .-
                      </h5>
                      <h5 className="quantity">{preordermenu.Quantity}</h5>
                      <div className="add-minus">
                        <div
                          className="btn-quantity minus"
                          onClick={() => {
                            handleDecrease(preordermenu, index);
                            onSubmitUpDatePreorderMenu(preordermenu);
                          }}
                        >
                          -
                        </div>
                        <div
                          className="btn-quantity add"
                          onClick={() => {
                            handleIncrease(preordermenu, index);
                            onSubmitUpDatePreorderMenu(preordermenu);
                          }}
                        >
                          +
                        </div>
                      </div>
                      <div
                        className="btn-description"
                        onClick={() => {
                          setMenu(menus[index]);
                          setEditmenupop(true);
                          setrPeorderMenu(preordermenu);
                        }}
                      >
                        <h6>รายละเอียด</h6>
                      </div>
                    </div>
                    <hr />
                  </>
                )
              )}
          </div>
          <hr />
          <div className="data-preOrder">
            <h5>วัน-เวลาที่รับ</h5>
            <label htmlFor="" className="datetime-recive">
              <input
                type="datetime-local"
                defaultValue={
                  pickUpDateTime instanceof Date
                    ? pickUpDateTime.toISOString().slice(0, 16)
                    : ""
                }
                {...register("PickUpDateTime", {
                  // required: { value: true, message: "This is required" },
                })}
              />
            </label>
            <h5>หมายเหตุ</h5>
            <label htmlFor="" className="datetime-recive">
              <input
                type="text"
                {...register("Note", {
                  required: { value: true, message: "this is required" },
                })}
              />
            </label>
            <h5 className="total-amout-allMenu">
              <span>รวมราคา</span>
              {preorder_status_approver?.ID == 1 && (
                <p>{watch("TotalAmount")?.toFixed(2) ?? "N/A"}.-</p>
              )}
            </h5>
          </div>
        </div>
        <button className="btn-addmenu" type="submit">
          ชำระเงิน
        </button>
      </form>
      {editMenupop && (
        <div className={`${editMenupop ? "edit-menuactive" : "edit-menu"}`}>
          <EditMenuPreorder
            onCloseAddmenupop={() => {
              setEditmenupop(false);
              getNewPreoderByMember(1);
            }}
            editMenu={menu}
            preordermenus={preordermenu}
            preorder={preorder}
          />
        </div>
      )}
    </>
  );
};
export default EditPreorder;
