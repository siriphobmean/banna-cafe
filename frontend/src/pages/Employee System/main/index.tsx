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

  const showModal = (val: EmployeesInterface) => {
    setModalText(
      `คุณต้องการลบข้อมูลพนักงาน "${val.FirstName} ${val.LastName}" หรือไม่ ?`
    );
    setDeleteId(val.ID);
    setOpen(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    let res = await DeleteEmployeeByID(deleteId);
    if (res) {
      setOpen(false);
      messageApi.open({
        type: "success",
        content: "ลบข้อมูลสำเร็จ",
      });
      getEmployees();
    } else {
      setOpen(false);
      messageApi.open({
        type: "error",
        content: "เกิดข้อผิดพลาด !",
      });
    }
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <>
      {contextHolder}
      <Row>
        <Col span={12}>
          <h2>ระบบจัดการหลังบ้าน Banna Café</h2>
          <div className="exampleData"><b>รายชื่อพนักงาน</b></div>
        </Col>
        <Col span={12} style={{ textAlign: "end", alignSelf: "center" }}>
          {/* <Space>
            <Link to="/employee/create">
              <Button type="primary" icon={<PlusOutlined />} style={{ background: '#E48F44' }}>
                เพิ่มพนักงาน
              </Button>
            </Link>
          </Space> */}
        </Col>
      </Row>
      <Divider />
      <div style={{ marginTop: 20 }}>
        <Table rowKey="ID" columns={columns} dataSource={employees} />
      </div>
      <Modal
        title="ลบข้อมูล ?"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </>
  );
}

export default Mains;
