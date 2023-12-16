import React from "react";
import SidebarMemu from "../../../components/sidebarMember";
import Footer from "../../../components/footer";
import "./profileMember.css";
export default function ProfileMember() {
  return (
    <div className="ProfileMember">
      <div className="sidebarProflie">
        <SidebarMemu />
      </div>
      <div className="contentprofile">
        <div className="dataProflie-member">
            <div className="head-profile">
                <div className="imge-profile">
                    <span className="span1" >ban</span>
                    <div className="imge-member"></div>
                    <span>na.</span>
                    <div className="leave"></div>
                </div>
                <h5>b6419455@.sut.ac.th</h5>
            </div>
            <form className="data-profile">
                <div className="memberData name"><h4>name</h4><h5>Bhuwadol Sriton</h5></div>
                <div className="memberData email"><h4>Email</h4><h5>b6419455@.sut.ac.th</h5></div>
                <div className="memberData phone"><h4>Phone</h4><h5>0987654321</h5></div>
                <div className="memberData pass"><h4>Password</h4><h5>12345678aB</h5></div>
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
