import React, { useState, useEffect } from "react";
import { Space, Table, Button, Col, Row, Divider, Modal, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { GetEmployees, DeleteEmployeeByID } from "../../../services/https/employee";
import { EmployeesInterface } from "../../../interfaces/IEmployee";
import { Link, useNavigate } from "react-router-dom";

function Mains() {
  
  const columns: ColumnsType<EmployeesInterface> = [
    {
      title: "ลำดับ",
      dataIndex: "ID",
      key: "id",
    },
    {
      title: "ชื่อ",
      dataIndex: "FirstName",
      key: "firstname",
    },
    {
      title: "นามสกุล",
      dataIndex: "LastName",
      key: "lastname",
    },
    {
      title: "ตำแหน่ง",
      dataIndex: "Role",
      key: "role",
      render: (item) => Object.values(item.RoleName),
    },
    {
      title: "อีเมล",
      dataIndex: "Email",
      key: "email",
    },
  ];

  const navigate = useNavigate();

  const [employees, setEmployees] = useState<EmployeesInterface[]>([]);

  const [messageApi, contextHolder] = message.useMessage();

  // Model
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState<String>();
  const [deleteId, setDeleteId] = useState<Number>();

  const getEmployees = async () => {
    let res = await GetEmployees();
    if (res) {
      setEmployees(res);
    }
  };

  const [userName, setUserName] = useState<string>("นายศิริภพ พูนประสิทธิ์ (for test)"); // กำหนดชื่อผู้ใช้งาน

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <>
      {contextHolder}
      <Row>
        <Col span={12}>
          <h2>ระบบจัดการหลังบ้าน Banna Café</h2>
          {/* <div className="exampleData"><b>รายชื่อพนักงาน</b></div> */}
        </Col>
        <Col span={12} style={{ textAlign: "end", alignSelf: "center" }}>
        <Space>
            {/* <Link to="/ingredient/create"> */}
              <Button type="primary" style={{ background: "#E48F44" }}>
                ผู้ใช้งาน : {userName}
              </Button>
            {/* </Link> */}
            <Link to="/">
              <Button
                type="primary"
                style={{
                  background: "#ffff",
                  color: "#E48F44",
                  border: "1px solid #E48F44",
                }}
              >
                ออกจากระบบ
              </Button>
            </Link>
          </Space>
        </Col>
      </Row>
      <Divider />
      <div style={{textAlign: 'center', fontSize: '24px'}}>รายชื่อพนักงาน</div>
      <div style={{ marginTop: 20 }}>
        <Table rowKey="ID" columns={columns} dataSource={employees} />
      </div>
      <div style={{textAlign: 'center'}}>ทีมผู้สร้าง กำลังพัฒนาระบบ ขออภัยในความไม่สะดวกครับ :D</div>
    </>
  );
}

export default Mains;
