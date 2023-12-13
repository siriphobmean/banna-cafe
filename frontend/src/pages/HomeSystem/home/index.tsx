import { useState } from "react";
import "./home.css";
import NavbarHome from "../../../components/navbarHome";
import { Link } from "react-router-dom";
import Login from "../formLoginRegister";
import Footer from "../../../components/footer";

export default function Home() {
  const [login, setLogin] = useState(false);
  function handleClick() {
    setLogin(!login);
  }
  return (
    <div>
      <div className="slide s1">
        <NavbarHome onOpen={() => setLogin(true)} />
        <div className={`${!login ? "content c1" : "content0"}`}>
          <div className="circle c1" onClick={() => setLogin(true)}>
            <div className="circle c2">
              <span>banna</span>
              <br />
              <p>click here</p>
            </div>
          </div>
        </div>
      </div>
      <div className="slide s2"></div>
      <div className="slide s3">
        <div className="content s3 left">
          <span>
            b<br />a<br />n<br />n<br />a
          </span>
          <Link to={"/menuPreOrder"} className="btn-menu m1">
            menu
          </Link>
        </div>
        <div className="content s3 right">
          <h1>welcome</h1>
          <h2>
            to <span>banna</span>
          </h2>
        </div>
      </div>
      <span className="wordslide s4">bannabanna</span>
      <div className="slide s4">
        <div className="card c1">
          <div className="img-menu">
            <p>banna</p>
            <div className="coaster"></div>
            <div className="img-menu im i1"></div>
          </div>
          <span>เมนูผลไม้</span>
          <Link to={"/menuPreOrder"} className="btn-menu m2">
            เลือกเมนู
          </Link>
        </div>
        <div className="card c2">
          <div className="img-menu">
            <p>banna</p>
            <div className="coaster"></div>
            <div className="img-menu im i2"></div>
          </div>
          <span>เมนูกาแฟ</span>
          <Link to={"/menuPreOrder"} className="btn-menu m2">
            เลือกเมนู
          </Link>
        </div>
        <div className="card c3">
          <div className="img-menu">
            <p>banna</p>
            <div className="coaster"></div>
            <div className="img-menu im i3"></div>
          </div>
          <span>เมนูของทานเล่น</span>
          <Link to={"/menuPreOrder"} className="btn-menu m2">
            เลือกเมนู
          </Link>
        </div>
        <div className="card c4">
          <div className="img-menu">
            <p>banna</p>
            <div className="coaster"></div>
            <div className="img-menu im i4"></div>
          </div>
          <span>เมนูของทานเล่น</span>
          <Link to={"/menuPreOrder"} className="btn-menu m2">
            เลือกเมนู
          </Link>
        </div>
      </div>
      <div className="slide s5">
        <div className="content s5 left"></div>
        <div className="content s5 right">
          <span className="span s5-1">
            b<br />a<br />n<br />n<br />a
          </span>
          <div className="img-menu im i5"></div>
          <div className="text i5">
            <span className="span s5-2">coffee</span>
            <p>
              เปิดประสบการณ์ใหม่สำหรับประสบการณ์กาแฟที่หรูหรา
              <br />
              และประทับใจ ด้วยทุกเฟรเวอร์ของรสชาติที่ทันสมัย
              <br />
              ในแบบที่ทำให้คุณตื่นเต้นทุกสัมผัส
            </p>
            <Link to={"/menuPreOrder"} className="btn-menu m1">
              menu
            </Link>
          </div>
        </div>
      </div>
      <div className="slide s6">
        <Footer />
      </div>
      <div className={`${login ? "loginRegisteractive" : "loginRegister"}`}>
        {login && <Login onClose={handleClick} />}
      </div>
    </div>
  );
}
