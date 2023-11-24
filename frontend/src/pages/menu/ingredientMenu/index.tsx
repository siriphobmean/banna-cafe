import React, { useState, useEffect, useId } from "react";
import {
  Space,
  Button,
  Col,
  Row,
  Divider,
  Form,
  Input,
  Card,
  message,
  Upload,
  Select,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { MenusInterface } from "../../../interfaces/IMenu";
import { MenuTypesInterface } from "../../../interfaces/IMenuType";
import { CreateMenu, GetMenuTypes, GetMenuById, UpdateMenu } from "../../../services/https/menu";
import { useNavigate, useParams } from "react-router-dom";

import { ImageUpload } from "../../../interfaces/IUpload";

const { Option } = Select;

function IngredientMenu() {
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate("/menu");
  };

  const [messageApi, contextHolder] = message.useMessage();

  const [menu, setMenu] = useState<MenusInterface>();
  const [menuTypes, setMenuTypes] = useState<MenuTypesInterface[]>([]);

  const [menuImage, setMenuImage] = useState<ImageUpload>()

  // รับข้อมูลจาก params
  let { id } = useParams();
  // อ้างอิง form กรอกข้อมูล
  const [form] = Form.useForm();

  const onFinish = async (values: MenusInterface) => {
    values.ID = menu?.ID;
    // values.MenuCost = parseInt(values.MenuCost! .toString(), 10) // edit by saran :D
    values.MenuCost = parseFloat(values.MenuCost!.toString());

    values.MenuImage = menuImage?.thumbUrl;

    let res = await UpdateMenu(values);
    if (res.status) {
      messageApi.open({
        type: "success",
        content: "แก้ไขข้อมูลสำเร็จ",
      });
      setTimeout(function () {
        navigate("/menu");
      }, 2000);
    } else {
      messageApi.open({
        type: "error",
        content: "แก้ไขข้อมูลไม่สำเร็จ",
      });
    }
    console.log(values);
  };

  const getMenuType = async () => {
    let res = await GetMenuTypes();
    if (res) {
      setMenuTypes(res);
    }
  };

  const getMenuById = async () => {
    let res = await GetMenuById(Number(id));
    if (res) {
      setMenu(res);
      // set form ข้อมูลเริ่มของผู้ใช้ที่เราแก้ไข
      form.setFieldsValue({ 
        MenuName: res.MenuName ,
        MenuNameEng: res.MenuNameEng ,
        MenuCost: res.MenuCost ,
        MenuTypeID: res.MenuTypeID , // พอบันทึกกลายเป็น Null ?
        // MenuImage: res.MenuImage ,
        // ต้องใส่วัตถุดิบ และจำนวนวัตถุดิบ 2 อย่าง IngreID, IngreAmount
        // IngreID: res.IngreID
        // IngreeAmount: res.IngreAmount
    });
    }
  };

  useEffect(() => {
    getMenuType();
    getMenuById();
  }, []);

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    setMenuImage(e?.fileList[0])
    return e?.fileList;
  };

  return (
    <div>
      {contextHolder}
      <Card>
        <h2>รายละเอียดวัตถุดิบ ของเมนู</h2>
        <Divider />
        <Form
          name="basic"
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="ชื่อเมนู (TH)"
                name="MenuName"
              >
                <Input readOnly/>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item 
                label="ชื่อเมนู (ENG)"
                name="MenuNameEng"
              > 
                <Input readOnly/> 
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item 
                name="IngredientID" 
                label="วัตถุดิบ [1]"
              >
                <Input readOnly/>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="จำนวนวัตถุดิบ [1]"
                name="IngredientAmount" // ยังไม่แก้ไข ต้องดึงมาจากของนพ
              >
                <Input readOnly/>
              </Form.Item>
            </Col>
            {/* <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item 
                name="IngredientID" 
                label="วัตถุดิบ [2]"
              >
                <Input readOnly/>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="จำนวนวัตถุดิบ [2]"
                name="IngredientAmount" // ยังไม่แก้ไข ต้องดึงมาจากของนพ
              >
                <Input readOnly/>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item 
                name="IngredientID" 
                label="วัตถุดิบ [3]"
              >
                <Input readOnly/>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="จำนวนวัตถุดิบ [3]"
                name="IngredientAmount" // ยังไม่แก้ไข ต้องดึงมาจากของนพ
              >
                <Input readOnly/>
              </Form.Item>
            </Col> */}
          </Row>
          <Row justify="end">
            <Col style={{ marginTop: "40px" }}>
              <Form.Item>
                <Space>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
}

export default IngredientMenu;
