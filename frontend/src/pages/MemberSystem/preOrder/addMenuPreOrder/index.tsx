import React from "react";
import { FaStar } from "react-icons/fa";
import { IoRestaurantOutline } from "react-icons/io5";
import "./addMenuPreOrder.css";
interface AddMenuPreOrderProps {
  onCloseAddmenupop: () => void;
}
const AddMenuPreOrder: React.FC<AddMenuPreOrderProps> = ({ onCloseAddmenupop }) =>{
  return (
    <div className="add-crad">
      <div className="rat-costadd">
        <div className="addmenu-rating"><FaStar /> <span>4</span></div>
        <span className="icon-close-addmenu" onClick={onCloseAddmenupop}><IoRestaurantOutline /></span>
      </div>
      <form className="form-add">
        <div className="addmenu-imge"></div>
        <div className="addmenu-name">เอสเปรสโช่ <br/>
          <span>Esresso</span>
        </div>
        <div className="menu-amount">
          <div className="btn-amout minus">-</div>
          <span>1</span>
          <div className="btn-amout add">+</div>
        </div>
        <h5>ขนาด
        <div className="menu-size">
          <label className="lc"><input type="checkbox" className="ic"/>175 ml.</label>
          <label><input type="checkbox"/>300 ml.</label>
          <label><input type="checkbox"/>500 ml.</label>
        </div></h5>
        <h5>ความหวาน
        <div className="menu-sweetness">
          <label><input type="checkbox"/>หวานปกติ <span>100%</span></label>
          <label><input type="checkbox"/>หวานปานกลาง <span>50%</span></label>
          <label><input type="checkbox"/>หวานน้อย <span>25%</span></label>
        </div></h5>
        <h5>รูปแบบ
        <div className="menu-option">
          <label><input type="checkbox"/>ร้อน</label>
          <label><input type="checkbox"/>ปั่น</label>
          <label><input type="checkbox"/>เย็น</label>
        </div></h5>
        <div className="menu-total"><span>ราคา</span><p>49-.</p></div>
      </form>
      <button className="btn-addmenu" onClick={onCloseAddmenupop} >+เพิ่ม</button>
    </div>
  );
}
export default AddMenuPreOrder;
