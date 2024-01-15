import React, { useState, useEffect } from "react";
import { Card, Table, Button, Col, Row, Divider, Modal, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { Link, useNavigate } from "react-router-dom";
import { ManagePreOrderInterface } from "../../../interfaces/IManagepreorder";
import { GetManagePreOrders } from "../../../services/https/managepreorder";

function ManagePreorder() {
  
  const columns : ColumnsType<ManagePreOrderInterface> = [
    {
      title: "ลำดับ",
      dataIndex: "PreorderID",
      key: "id",
    },
    {
      title: "เวลาที่รับ",
      dataIndex: "PickupTime",
      key: "pickuptime",
      render:(time) =>{
        const text = time.slice(0,19).split("T")[0].concat(" ",time.slice(0,16).split("T")[1])
        return <span>{text}</span>
      }
    },
    {
        title: "ราคา",
        dataIndex: "Price",
        key: "price",
    },
    {
      title: "สถานะการจอง",
      dataIndex: "Respond",
      key: "respond",
    },
    // {
    //   title: "สถานะการรับสินค้า",
    //   dataIndex: "ReceiveStatus",
    //   key: "receuvestatus",
    // },
    {
      title: "หมายเหตุ",
      dataIndex: "Note",
      key: "note",
  },
    {
      title: "รายละเอียด",
      dataIndex: "Manage",
      key: "manage",
      render: (text, mp, index) => (
        <label onClick={() =>  navigate(`/managepreorder/edit/${mp.PreorderID}`)} style={{color:"green"}} >เพิ่มเติม</label>
      ),
    },
  ];

  const navigate = useNavigate();

  const [data, SetData] = useState<ManagePreOrderInterface[]>([]);
  const [mouseHover, SetMouseHover] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();

  const getMP = async () => {
    let res = await GetManagePreOrders();
    if (res) {
      SetData(res);
    }
  };

  useEffect(() => {
    getMP();
  },[]);

  return (
    
    
    <>
    {contextHolder}
    <Card><h2 style={{textAlign:"center"}}>จัดการคำสั่งซื้อล่วงหน้า</h2>
      <Divider />
      <div style={{ marginTop: 20 }}>
        <Table rowKey="id" columns={columns} dataSource={data}/>
      </div>
    </Card>
    </>
  );
}
export default ManagePreorder;