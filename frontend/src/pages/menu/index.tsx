import React, { useState, useEffect } from "react";
import { Space, Table, Button, Col, Row, Divider, Modal, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { GetMenus, DeleteMenuByID } from "../../services/https/menu";
import { MenusInterface } from "../../interfaces/IMenu";
import { Link, useNavigate } from "react-router-dom";

function Menus() {
  
  const columns: ColumnsType<MenusInterface> = [
    {
      title: "ลำดับ",
      dataIndex: "ID",
      key: "id",
    },
    {
      title: "รูปเมนู", // รูปไฟล์
      dataIndex: "MenuImage", // Profile
      key: "menuimage", // profile
      render: (text, record, index) => (
        <img src={record.MenuImage} className="w3-left w3-circle w3-margin-right" width="50%"/>
      )
    },
    {
      title: "ชื่อเมนู (TH)",
      dataIndex: "MenuName",
      key: "menuname",
    },
    {
      title: "ชื่อเมนู (ENG)",
      dataIndex: "MenuNameEng",
      key: "menunameeng",
    },
    {
      title: "ราคา",
      dataIndex: "MenuCost",
      key: "menucost",
      render:(record)=>(
        <div>{(record).toFixed(2)} ฿</div>
      )
    },
    {
      title: "ประเภท",
      dataIndex: "MenuType",
      key: "menutype",
      render: (item) => Object.values(item.TypeName),
    },
    {
      title: "วัตถุดิบ",
      dataIndex: "MenuType",
      key: "menutype",
      // render: (item) => Object.values(item.TypeName),
      render:(record)=>(
        <div>วิปครีม</div>
      )
    },
    {
      title: "จำนวนวัตถุดิบ",
      dataIndex: "MenuCost",
      key: "menucost",
      render:(record)=>(
        <div>1</div>
      )
    },
    {
      title: "แก้ไข/ลบข้อมูล",
      dataIndex: "Manage",
      key: "manage",
      render: (text, record, index) => (
        <>
          <Button  onClick={() =>  navigate(`/menu/edit/${record.ID}`)} shape="circle" icon={<EditOutlined />} size={"large"} />
          <Button
            onClick={() => showModal(record)}
            style={{ marginLeft: 10 }}
            shape="circle"
            icon={<DeleteOutlined />}
            size={"large"}
            danger
          />
        </>
      ),
    },
  ];

  const navigate = useNavigate();

  const [menus, setMenus] = useState<MenusInterface[]>([]);

  const [messageApi, contextHolder] = message.useMessage();

  // Model
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState<String>();
  const [deleteId, setDeleteId] = useState<Number>();

  const getMenus = async () => {
    let res = await GetMenus();
    if (res) {
      setMenus(res);
    }
  };

  const showModal = (val: MenusInterface) => {
    setModalText(
      `คุณต้องการลบเมนู "${val.MenuName}" หรือไม่ ?`
    );
    setDeleteId(val.ID);
    setOpen(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    let res = await DeleteMenuByID(deleteId);
    if (res) {
      setOpen(false);
      messageApi.open({
        type: "success",
        content: "ลบข้อมูลสำเร็จ",
      });
      getMenus();
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
    getMenus();
  }, []);

  return (
    <>
      {contextHolder}
      <Row>
        <Col span={12}>
          <h2>จัดการข้อมูลเมนู</h2>
        </Col>
        <Col span={12} style={{ textAlign: "end", alignSelf: "center" }}>
          <Space>
            <Link to="/menu/create">
              <Button type="primary" icon={<PlusOutlined />} style={{ background: '#E48F44' }}>
                เพิ่มเมนู
              </Button>
            </Link>
          </Space>
        </Col>
      </Row>
      <Divider />
      <div style={{ marginTop: 20 }}>
        <Table rowKey="ID" columns={columns} dataSource={menus} />
      </div >
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

export default Menus;