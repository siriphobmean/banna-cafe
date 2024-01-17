import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { MdOutlineMail } from "react-icons/md";
import { MdOutlineLock } from "react-icons/md";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { MembersInterface } from "../../../../interfaces/IMember";
import "../login.css";
import { LoginMember } from "../../../../services/https/member";
import { MenusInterface } from "../../../../interfaces/IMenu";
interface LoginProps {
  slideRegisters: () => void;
}
const Login: React.FC<LoginProps> = ({ slideRegisters }) => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<MembersInterface>({
    defaultValues: {
      Email: "tttt",
      Password: "tttttttt",
    },
  });

  // const onSubmitLogin = async (values: MembersInterface) => {
  //   let res = await LoginMember(values);
  //   if (res.status) {
  //     messageApi.open({
  //       type: "success",
  //       content: "เข้าสุ่ระบบสำเร็จ",
  //     });
  //     setTimeout(function () {
  //       navigate("../menuPreorder");
  //     }, 1000);
  //   } else {
  //     messageApi.open({
  //       type: "error",
  //       content: "เข้าสุ่ระบบไม่สำเร็จ",
  //     });
  //   }
  // };
  const onSubmitLogin = async () => {
    const values: MembersInterface = {
      Email: watch("Email"),
      Password: watch("Password"),
    };

    let res = await LoginMember(values);
    if (res.status) {
      messageApi.open({
        type: "success",
        content: "เข้าสุ่ระบบสำเร็จ",
      });
      setTimeout(function () {
        navigate("../menuPreorder");
      }, 1000);
    } else {
      messageApi.open({
        type: "error",
        content: "เข้าสุ่ระบบไม่สำเร็จ",
      });
    }
  };
  return (
    <form
      name="basic"
      // onSubmit={handleSubmit((data) => onSubmitLogin(data))}
      autoComplete="off"
      className="form-box login"
    >
      {contextHolder}
      <h2>Login</h2>
      <div className="input-box">
        <span className="icon">
          <MdOutlineMail />
        </span>
        <input
          type="text"
          {...register("Email", {
            required: "Email is required.",
            pattern: {
              value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              message: "Email is not valid.",
            },
          })}
        />
        <label>Email</label>
      </div>
      {errors.Email && <p className="errorMsg">{errors.Email.message}</p>}
      <div className="input-box">
        <span className="icon">
          <MdOutlineLock />
        </span>
        <input
          type="password"
          {...register("Password", {
            required: true,
            validate: {
              checkLength: (value) => value && value.length >= 8,
              matchPattern: (value) =>
                value
                  ? // ? /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/.test(
                    /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)/.test(value)
                  : false,
            },
          })}
        />
        <label>Password</label>
      </div>
      {errors.Password?.type === "required" && (
        <p className="errorMsg">Password is required.</p>
      )}
      {errors.Password?.type === "checkLength" && (
        <p className="errorMsg">Password should be at-least 8 characters.</p>
      )}
      <div className="remember-forgot">
        <label>
          <input type="checkbox" /> ReMember me
        </label>
        <Link to="#">Forgot Password?</Link>
      </div>
      <div onClick={onSubmitLogin} className="btn">
        Login
      </div>
      <div className="login-register">
        <p>
          Don't have account?{" "}
          <Link to="#" className="register-link" onClick={slideRegisters}>
            Register
          </Link>
        </p>
      </div>
    </form>
  );
};
export default Login;
