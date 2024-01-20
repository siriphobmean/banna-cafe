// import React, { useState, useEffect } from "react";
// import { PreordersInterface } from "../../../../interfaces/IPreorder";
// import type { ColumnsType } from "antd/es/table";
// import {
//   Space,
//   Table,
//   Button,
//   Col,
//   Row,
//   Divider,
//   Modal,
//   message,
//   Popover,
//   Image,
// } from "antd";

// function HistoryPreorder() {
//   const columns: ColumnsType<PreordersInterface> = [
//     {
//       title: "ลำดับ",
//       dataIndex: "MenuID", 
//       key: "id",
//       render: (text, record, index) => index + 1,
//     },
//     {
//       title: "รูปเมนู", // เดี๋ยวจะเอาตัวปรับมุมโค้งออก เพราะจะต้องใส่เป็นรูปเมนูพื้นหลังโปร่ง.png
//       dataIndex: "MenuImage",
//       key: "menuimage",
//       render: (text, record, index) => (
//         <Popover content={<Image src={record.MenuImage} />} title="รูปเมนู">
//           <img
//             src={record.MenuImage}
//             className="w3-left w3-circle w3-margin-right"
//             width="50%"
//             style={{ borderRadius: "25%" }}
//           />
//         </Popover>
//       ),
//     },
//     {
//       title: "ชื่อเมนู (TH)",
//       dataIndex: "MenuName",
//       key: "menuname",
//     },
//     {
//       title: "ชื่อเมนู (ENG)",
//       dataIndex: "MenuNameEng",
//       key: "menunameeng",
//     },
//     {
//       title: "ราคา",
//       dataIndex: "MenuCost",
//       key: "menucost",
//       render: (record) => <div>{record.toFixed(2)} ฿</div>,
//     },
//     {
//       title: "ประเภท",
//       dataIndex: "MenuType",
//       key: "menutype",
//       render: (item) => Object.values(item.TypeName),
//     },
//     {
//       title: "สถานะเมนู",
//       dataIndex: "MenuStatus",
//       key: "menustatus",
//       render: (status) => (
//         <span>{status === 1 ? "ไม่พร้อมขาย" : "พร้อมขาย"}</span>
//       ),
//     },
//     {
//       title: "วัตถุดิบ",
//       dataIndex: "IngredientData",
//       key: "ingredientdata",
//       render: (text, record, index) => (
//         <>
//           <Button
//             onClick={() => navigate(`/menu/ingredientMenu/${record.ID}`)}
//             shape="circle"
//             icon={<EyeOutlined />}
//             size={"large"}
//           />
//         </>
//       ),
//     },
//     {
//       title: "แก้ไข/ลบเมนู",
//       dataIndex: "Manage",
//       key: "manage",
//       render: (text, record, index) => (
//         <>
//           <Button
//             onClick={() => navigate(`/menu/edit/${record.ID}`)}
//             shape="circle"
//             icon={<EditOutlined />}
//             size={"large"}
//           />
//           <Button
//             onClick={() => showModal(record)}
//             style={{ marginLeft: 10 }}
//             shape="circle"
//             icon={<DeleteOutlined />}
//             size={"large"}
//             danger
//           />
//         </>
//       ),
//     },
//   ];

//   const navigate = useNavigate();

//   const [menus, setMenus] = useState<MenusInterface[]>([]);

//   const [messageApi, contextHolder] = message.useMessage();

//   // Model
//   const [open, setOpen] = useState(false);
//   const [confirmLoading, setConfirmLoading] = useState(false);
//   const [modalText, setModalText] = useState<String>();
//   const [deleteId, setDeleteId] = useState<Number>();

//   const getMenus = async () => {
//     let res = await GetMenus();
//     if (res) {
//       setMenus(res);
//     }
//   };

//   const showModal = (val: MenusInterface & IngredientMenusInterface) => {
//     setModalText(`คุณต้องการลบเมนู "${val.MenuName}" หรือไม่ ?`);
//     setDeleteId(val.ID);
//     setOpen(true);
//   };

//   const handleOk = async () => {
//     setConfirmLoading(true);
//     // let resIngredient = await DeleteIngredientMenuByID(deleteId);
//     let resIngredient = await DeleteIngredientMenuSet(deleteId);
//     let res = await DeleteMenuByID(deleteId);
//     if (res & resIngredient) {
//       setOpen(false);
//       messageApi.open({
//         type: "success",
//         content: "ลบเมนูสำเร็จ",
//       });
//       getMenus();
//     } else {
//       setOpen(false);
//       messageApi.open({
//         type: "error",
//         content: "เกิดข้อผิดพลาด !",
//       });
//     }
//     setConfirmLoading(false);
//   };

//   const handleCancel = () => {
//     setOpen(false);
//   };

//   useEffect(() => {
//     getMenus();
//   }, []);

//   return (
//     <>
//       {contextHolder}
//       <Row>
//         <Col span={12}>
//           <h2>จัดการข้อมูลเมนู</h2>
//         </Col>
//         <Col span={12} style={{ textAlign: "end", alignSelf: "center" }}>
//           <Space>
//             <Link to="/menu/create">
//               <Button
//                 type="primary"
//                 icon={<PlusOutlined />}
//                 style={{ background: "#E48F44" }}
//               >
//                 เพิ่มเมนู
//               </Button>
//             </Link>
//           </Space>
//         </Col>
//       </Row>
//       <Divider />
//       <div style={{ marginTop: 20 }}>
//         <Table rowKey="ID" columns={columns} dataSource={menus} />
//       </div>
//       <Modal
//         title="ลบเมนู"
//         open={open}
//         onOk={handleOk}
//         confirmLoading={confirmLoading}
//         onCancel={handleCancel}
//       >
//         <p>{modalText}</p>
//       </Modal>
//     </>
//   );
// }

// export default HistoryPreorder;
import React from 'react'

export default function index() {
  return (
    <div>
      
    </div>
  )
}
