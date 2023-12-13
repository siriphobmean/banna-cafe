import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { MdOutlineMail } from "react-icons/md";
import { MdOutlineLock } from "react-icons/md";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { MembersInterface } from "../../../../interfaces/IMember";
import "../login.css";
import { LoginMember } from "../../../../services/https/member";
interface LoginProps {
  slideRegisters: () => void;
}
const Login: React.FC<LoginProps> = ({ slideRegisters }) => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MembersInterface>({
    defaultValues: {
      Email: "",
      Password: "",
    },
  });

  const onSubmitLogin = async (values: MembersInterface) => {
    let res = await LoginMember(values);
    if (res.status) {
      messageApi.open({
        type: "success",
        content: "เข้าสุ่ระบบสำเร็จ",
      });
      setTimeout(function () {
        navigate("../menuPreorder");
      }, 800);
    } else {
      messageApi.open({
        type: "error",
        content: "เข้าสุ่ระบบไม่สำเร็จ",
      });
    }
  };
  return (
    <div className="form-box login">
      {contextHolder}
      <h2>Login</h2>
      <form
        name="basic"
        onSubmit={handleSubmit((data) => onSubmitLogin(data))}
        autoComplete="off"
      >
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
                checkLength: (value) => value && value.length >= 6,
                matchPattern: (value) =>
                  value
                    ? /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/.test(
                        value
                      )
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
          <p className="errorMsg">Password should be at-least 6 characters.</p>
        )}
        {errors.Password?.type === "matchPattern" && (
          <p className="errorMsg">
            Password should contain at least one uppercase letter, lowercase
            letter, digit, and special symbol.
          </p>
        )}
        <div className="remember-forgot">
          <label>
            <input type="checkbox" /> ReMember me
          </label>
          <Link to="#">Forgot Password?</Link>
        </div>
        <button type="submit" className="btn">
          Login
        </button>
        <div className="login-register">
          <p>
            Don't have account?{" "}
            <Link to="#" className="register-link" onClick={slideRegisters}>
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};
export default Login;
