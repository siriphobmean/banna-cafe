import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import SidebarProflie from "../../../../components/sidebarProfile";
import Footer from "../../../../components/footer";
import "../profileMember.css";
import { GetMemberById, UpdateMember } from "../../../../services/https/member";
import { MembersInterface } from "../../../../interfaces/IMember";
import { BiHide } from "react-icons/bi";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import { message } from "antd";
export default function EditProfileMember() {

  let { id } = useParams();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [member, setMember] = useState<MembersInterface | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<MembersInterface>({
    defaultValues: {
        Username: "",
        Email: "",
        Password: "",
        Phone: "",
        MemberImage: "",
        Point: 0,
    },
  });
  const onSubmitEditProfileMember = async (values: MembersInterface) => {
    values.ID = member?.ID
    let res = await UpdateMember(values);
    if (res.status) {
      messageApi.open({
        type: "success",
        content: "แก้ไข้อมูลสำเร็จ",
      });
      setTimeout(function () {
        navigate("/profileMember");
      }, 1000);
    } else {
      messageApi.open({
        type: "error",
        content: res.message,
      });
    }
  };
  const getMemberByID = async (id: Number) => {
    let res = await GetMemberById(id);
    if (res) {
      setMember(res);
      setValue("Username", res.Username);
      setValue("Email", res.Email);
      setValue("Password", res.Password);
      setValue("Phone", res.Phone);
      setValue("MemberImage", res.MemberImage);
      setValue("Point", res.Point);
    }
  };
  useEffect(() => {
    getMemberByID(Number(id));
  }, []);
  return (
    <div className="ProfileMember">
      {contextHolder}
      <div className="sidebarProflie">
        <SidebarProflie onSelect={"ข้อมูล"} member={member} />
      </div>
      <div className="contentprofile">
        <form
          className="dataProflie-member"
          name="basic"
          onSubmit={handleSubmit((data) => onSubmitEditProfileMember(data))}
          autoComplete="off"
        >
          <div className="head-profile">
            <div className="imge-profile">
              <span className="span1">ban</span>
              <label htmlFor="">
                {/* <input
                type="image"
                className="ic"
                {...register("MemberImage", {
                  required: { value: true, message: "this is require" },
                })}
                // onClick={() => {
                //   setValue("MemberImage", newMenuSweetnessID);
                // }}
              /> */}
                <img
                  className="imge-member"
                  src={member?.MemberImage}
                  alt="Menu Image"
                />
              </label>
              <span>na.</span>
              <div className="leave"></div>
            </div>
            <h5>{member?.Email}</h5>
          </div>
          <div className="data-profile">
            <div className="memberData name">
              <h4>name</h4>
              <input
                type="text"
                className="ic"
                {...register("Username", {
                  required: { value: true, message: "this is require" },
                })}
              />
            </div>
            <div className="memberData email">
              <h4>Email</h4>
              <input
                type="text"
                className="ic"
                {...register("Email", {
                  required: { value: true, message: "this is require" },
                })}
              />
            </div>
            <div className="memberData phone">
              <h4>Phone</h4>
              <input
                type="text"
                className="ic"
                {...register("Phone", {
                  required: { value: true, message: "this is require" },
                })}
              />
            </div>
            <div className="memberData pass">
              <h4>Password</h4>
              <input
                type="password"
                className="ic ps"
                {...register("Password", {
                  required: { value: true, message: "this is require" },
                })}
              />
            </div>
          </div>
          <div className="btn-Profile">
            <button type="submit" className="btn-edotProfile">
              ยืนยันข้อมูล
            </button>
          </div>
        </form>
        <div className="history-prorder"></div>
        <footer>
          <Footer />
        </footer>
      </div>
    </div>
  );
}
