import { useState, useEffect } from "react";
import SidebarMemu from "../../../components/sidebarMember";
import Footer from "../../../components/footer";
import "./profileMember.css";
import { MenuTypesInterface } from "../../../interfaces/IMenuType";
import { GetMemberById } from "../../../services/https/member";
import { MembersInterface } from "../../../interfaces/IMember";
import { BiHide } from "react-icons/bi";
export default function ProfileMember() {
  const [selectedMenuType, setSelectedMenuType] =
    useState<MenuTypesInterface | null>(null);

  const handleSelectMenuType = (menuType: MenuTypesInterface) => {
    setSelectedMenuType(menuType);
  };
  const [member, setMember] = useState<MembersInterface | null>(null);
  const [passwordHide, setPasswordHide] = useState(false);
  console.log(member)
  const getMemberByID = async (id: Number) => {
    let res = await GetMemberById(id);
    if (res) {
      setMember(res);
    }
  };
  useEffect(() => {
    getMemberByID(1);
  }, []);
  return (
    <div className="ProfileMember">
      <div className="sidebarProflie">
        <SidebarMemu onSelectMenuType={handleSelectMenuType} />
      </div>
      <div className="contentprofile">
        <div className="dataProflie-member">
          <div className="head-profile">
            <div className="imge-profile">
              <span className="span1">ban</span>
              <img
                className="imge-member"
                src={member?.MemberImage}
                alt="Menu Image"
              />
              <span>na.</span>
              <div className="leave"></div>
            </div>
            <h5>{member?.Email}</h5>
          </div>
          <form className="data-profile">
            <div className="memberData name">
              <h4>name</h4>
              <h5>{member?.Username}</h5>
            </div>
            <div className="memberData email">
              <h4>Email</h4>
              <h5>{member?.Email}</h5>
            </div>
            <div className="memberData phone">
              <h4>Phone</h4>
              <h5>{member?.Phone}</h5>
            </div>
            <div className="memberData pass">
              <h4>Password</h4>
              <h5>
                <span>{passwordHide ? (member?.Password ? member.Password : "########") : "########"}</span>
                <p onClick={() => { setPasswordHide(!passwordHide); }}>
                  <BiHide />
                </p>
              </h5>
            </div>
          </form>
        </div>
        <div className="history-prOrder"></div>
        <footer>
          <Footer />
        </footer>
      </div>
    </div>
  );
}
