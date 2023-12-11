import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { MdOutlineMail } from "react-icons/md";
import { MdOutlineLock } from "react-icons/md";
import { MdOutlinePerson } from "react-icons/md";
import "../login.css";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { MembersInterface } from "../../../../interfaces/IMember";
import { CreateMember } from "../../../../services/https/member";

interface RegisterProps {
  slideRegisters: () => void;
}
const Register: React.FC<RegisterProps> = ({ slideRegisters }) => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MembersInterface>({
    defaultValues: {
      Username: "",
      Email: "",
      Password: "",
    },
  });

  const onSubmitRegister = async (values: MembersInterface) => {
    let res = await CreateMember(values);
    if (res.status) {
      messageApi.open({
        type: "success",
        content: "สมัครสามชิกสำเร็จ",
      });
      setTimeout(function () {
        window.location.reload();
      }, 1000);
    } else {
      messageApi.open({
        type: "error",
        content: "เกิดข้อผิดพลาด",
      });
    }
  };
  return (
    <div className="form-box register">
      {contextHolder}
      <h2>Registeration</h2>
      <form
        name="basic"
        onSubmit={handleSubmit((data) => onSubmitRegister(data))}
        autoComplete="off"
      >
        <div className="input-box">
          <i className="icon">
            <MdOutlinePerson />
          </i>
          <input
            type="text"
            {...register("Username", {
              required: { value: true, message: "this is require" },
            })}
          />
          <label>Username</label>
        </div>
        {errors.Username && (
          <p className="errorMsg">{errors.Username.message}</p>
        )}
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
            <input type="checkbox" /> I agree to the terms & conditions
          </label>
        </div>
        <button type="submit" className="btn">
          Register
        </button>
        <div className="login-register">
          <p>
            Already have an account?{" "}
            <Link to={"#"} className="login-link" onClick={slideRegisters}>
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};
export default Register;
