import React from 'react'
import { IoRestaurantOutline } from "react-icons/io5";
import "../addMenuPreOrder/addMenuPreOrder.css";
import "./editPreOrder.css";
interface EditMenuPreOrderProps {
  onClosebasketMenupop: () => void;
}
const EditMenuPreOrder: React.FC<EditMenuPreOrderProps> = ({ onClosebasketMenupop }) =>{
  return (
    <div className="edit-crad">
      <div className="rat-cost">
        <span className="icon-close-addmenu" onClick={onClosebasketMenupop} ><IoRestaurantOutline /></span>
      </div>
      <form className="form-edit">
        <div className="basket-menu">
          <h4>ตะกร้าสินค้า</h4>
          <div className="menu-data">
            <div className="imge-item"></div>
            <h5 className="name-item">เอสเปรสโช่<br/><span>Esresso</span></h5>
            <h5 className="size-item">175 ml</h5>
            <h5 className="total-amount">49.-</h5>
            <h5 className="quantity">1</h5>
            <div className="add-minus">
              <div className="btn-quantity minus">-</div>
              <div className="btn-quantity add">+</div>
            </div>
            <div className="btn-description"><h6>รายละเอีด</h6></div>
          </div>
          <hr />
        </div>
        <hr />
        <div className="data-preOrder">
          <h5>วัน-เวลาที่รับ</h5>
          <label htmlFor="" className="datetime-recive"><input type="date" /><input type="time" /></label>
          <h5>หมายเหตุ</h5>
          <label htmlFor="" className="datetime-recive"><input type="text" /></label>
          <h5 className="total-amout-allMenu"><span>รวมราคา</span><p>98.-</p></h5>
        </div>
      </form>
      <button className="btn-addmenu" onClick={onClosebasketMenupop}>ชำระเงิน</button>
    </div>
  )
}
export default EditMenuPreOrder;
