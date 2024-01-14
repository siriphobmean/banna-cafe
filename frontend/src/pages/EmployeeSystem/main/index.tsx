import React, { useState, useEffect } from "react";
import { Space, Table, Button, Col, Row, Divider, Modal, message, Card, Statistic} from "antd";
import { ProfileOutlined, FallOutlined, RiseOutlined, StockOutlined, UserOutlined, FieldTimeOutlined, CoffeeOutlined, CloudOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { GetEmployees, DeleteEmployeeByID } from "../../../services/https/employee";
import { GetMembers } from "../../../services/https/member";
import { EmployeesInterface } from "../../../interfaces/IEmployee";
import { Link, useNavigate } from "react-router-dom";
import { GetLatestMenuID, GetActiveMenu, GetNoActiveMenu, GetRowMenu } from "../../../services/https/menu";
import { GetRowMember, GetRowIngredient } from "../../../services/https/statistic"; // ready to GetRowPromotion
import moment from "moment";
import { MembersInterface } from "../../../interfaces/IMember";

function Mains() {
  const [currentDateTime, setCurrentDateTime] = useState(
    moment().format("DD/MM/YYYY HH:mm:ss")
  );

  const handleLogout = () => {
    Modal.confirm({
      title: "Logout",
      content: "คุณต้องการออกจากระบบหรือไม่ ?",
      okText: "ยืนยัน",
      cancelText: "ยกเลิก",
      onOk: () => {
        navigate("/");
      },
    });
  };

  const handleUserButtonClick = () => {
    Modal.info({
      title: "Message",
      content: "คุณกำลังเข้าสู่ระบบ ในฐานะพนักงาน",
    });
  };

  // const columns: ColumnsType<EmployeesInterface> = [
  //   {
  //     title: "ลำดับ",
  //     dataIndex: "ID",
  //     key: "id",
  //   },
  //   {
  //     title: "ชื่อ",
  //     dataIndex: "FirstName",
  //     key: "firstname",
  //   },
  //   {
  //     title: "นามสกุล",
  //     dataIndex: "LastName",
  //     key: "lastname",
  //   },
  //   {
  //     title: "ตำแหน่ง",
  //     dataIndex: "Role",
  //     key: "role",
  //     render: (item) => Object.values(item.RoleName),
  //   },
  //   {
  //     title: "อีเมล",
  //     dataIndex: "Email",
  //     key: "email",
  //   },
  // ];

  const columns: ColumnsType<MembersInterface> = [
    {
      title: "ลำดับ",
      dataIndex: "ID",
      key: "id",
      render: (text, record, index) => index + 1,
    },
    {
      title: "ชื่อผู้ใช้งาน",
      dataIndex: "Username",
      key: "username",
    },
    {
      title: "อีเมล",
      dataIndex: "Email",
      key: "email",
    },
    {
      title: "เบอร์โทรศัพท์",
      dataIndex: "Phone",
      key: "phone",
    },
  ];

  const navigate = useNavigate();
  const [employees, setEmployees] = useState<EmployeesInterface[]>([]);
  const [members, setMembers] = useState<MembersInterface[]>([]);
  const [messageApi, contextHolder] = message.useMessage();

  // Model
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState<String>();
  const [deleteId, setDeleteId] = useState<Number>();
  const [latestMenuID, setLatestMenuID] = useState<number | undefined>(0);
  const [activeMenu, setActiveMenu] = useState<number | undefined>(0);
  const [noActiveMenu, setNoActiveMenu] = useState<number | undefined>(0);
  const [rowMenu, setRowMenu] = useState<number | undefined>(0);
  const [rowMember, setRowMember] = useState<number | undefined>(0);
  const [rowIngredient, setRowIngredient] = useState<number | undefined>(0);

  const getEmployees = async () => {
    let res = await GetEmployees();
    if (res) {
      setEmployees(res);
    }
  };

  const getMembers = async () => {
    let res = await GetMembers();
    if (res) {
      setMembers(res);
    }
  };

  const getActiveMenu = async () => {
    let res = await GetActiveMenu();
    if (res) {
      setActiveMenu(res);
    }
  };

  const getNoActiveMenu = async () => {
    let res = await GetNoActiveMenu();
    if (res) {
      setNoActiveMenu(res);
    }
  };

  const getRowMenu = async () => {
    let res = await GetRowMenu();
    if (res) {
      setRowMenu(res);
    }
  };
  
  const getRowMember = async () => {
    let res = await GetRowMember();
    if (res) {
      setRowMember(res);
    }
  };

  const getRowIngredient = async () => {
    let res = await GetRowIngredient();
    if (res) {
      setRowIngredient(res);
    }
  };

  // const getRowPromotion = async () => {
  //   let res = await GetRowPromotion();
  //   if (res) {
  //     setRowPromotion(res);
  //   }
  // };

  const [userName, setUserName] = useState<string>("Employee"); // กำหนดชื่อผู้ใช้งาน

  useEffect(() => {
    getEmployees();
    getMembers();
    const fetchLatestMenuID = async () => {
      const latestID = await GetLatestMenuID();
      setLatestMenuID(latestID || 0); // Set the latest menu ID retrieved from the backend
    };
    fetchLatestMenuID();

    getActiveMenu();
    getNoActiveMenu();
    getRowMenu();
    getRowMember();
    getRowIngredient();
    // getRowPromotion();

    const intervalId = setInterval(() => {
      setCurrentDateTime(moment().format("DD/MM/YYYY HH:mm:ss"));
    }, 1000);

    return () => clearInterval(intervalId);

  }, []);

  return (
    <>
      {contextHolder}
      <Row>
        <Col span={12}>
          <h2>ระบบจัดการหลังบ้าน Banna Café</h2>
          {/* <div className="exampleData"><b>User : MeannY</b></div> */}
        </Col>
        <Col span={12} style={{ textAlign: "end", alignSelf: "center" }}>
          <Space>
            {/* <Link to="/ingredient/create"> */}
              <Button type="primary" style={{ background: "#E48F44" }} onClick={handleUserButtonClick}>
                User : {userName}
              </Button>
            {/* </Link> */}
            <Button
              type="primary"
              style={{
                background: "#ffff",
                color: "#E48F44",
                border: "1px solid #E48F44",
              }}
              onClick={handleLogout}
            >
              ออกจากระบบ
            </Button>
          </Space>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Card style={{ backgroundColor: "#F5F5F5" }}>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={24} md={12} lg={12} xl={8}>
                <Card
                  bordered={false}
                  style={{
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                  }}
                >
                  <Statistic
                    title="จำนวนเมนู (ทั้งหมด)"
                    value={`${rowMenu} เมนู`}
                    prefix={<StockOutlined />}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={8}>
                <Card
                  bordered={false}
                  style={{
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                  }}
                >
                  <Statistic
                    title="จำนวนเมนู (พร้อมขาย)"
                    value={`${activeMenu} เมนู`}
                    valueStyle={{ color: "#50C878" }}
                    prefix={<RiseOutlined />}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={8}>
                <Card
                  bordered={false}
                  style={{
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                  }}
                >
                  <Statistic
                    title="จำนวนเมนู (ไม่พร้อมขาย)"
                    value={`${noActiveMenu} เมนู`}
                    valueStyle={{ color: "red" }}
                    prefix={<FallOutlined />}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={7}>
                <Card
                  bordered={false}
                  style={{
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                  }}
                >
                  <Statistic
                    title="จำนวนโปรโมชั่น"
                    value={`4 โปรโมชั่น`} // for test: to use -> rowPromotion
                    valueStyle={{ color: "black" }}
                    prefix={<ProfileOutlined />}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={5}>
                <Card
                  bordered={false}
                  style={{
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                  }}
                >
                  <Statistic
                    title="จำนวนสมาชิก"
                    value={`${rowMember} สมาชิก`}
                    valueStyle={{ color: "black" }}
                    prefix={<UserOutlined />}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={5}>
                <Card
                  bordered={false}
                  style={{
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                  }}
                >
                  <Statistic
                    title="จำนวนวัตถุดิบ"
                    value={`${rowIngredient} วัตถุดิบ`}
                    valueStyle={{ color: "black" }}
                    prefix={<CoffeeOutlined />}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={7}>
                <Card
                  bordered={false}
                  style={{
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                  }}
                >
                  <Statistic
                    title="วัน-เวลา ปัจจุบัน"
                    value={currentDateTime}
                    valueStyle={{ color: "#00BFFF" }}
                    prefix={<CloudOutlined />}
                  />
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Divider />
      <Col span={12}>
          <h2>รายชื่อสมาชิก</h2>
        </Col>
      <div style={{ marginTop: 20 }}>
        <Table rowKey="ID" columns={columns} dataSource={members} />
      </div>
    </>
  );
}

export default Mains;