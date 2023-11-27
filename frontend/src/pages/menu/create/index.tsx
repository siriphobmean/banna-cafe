import React, { useState, useEffect } from "react";
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
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { MenusInterface } from "../../../interfaces/IMenu";
import { MenuTypesInterface } from "../../../interfaces/IMenuType";

import { IngredientMenusInterface } from "../../../interfaces/IIngredientMenu"; // new
import { IngredientsInterface } from "../../../interfaces/IIngredient"; // new

import { ImageUpload } from "../../../interfaces/IUpload";
import { CreateMenu, GetMenuTypes } from "../../../services/https/menu";

import { CreateIngredientMenu, GetIngredients } from "../../../services/https/ingredientMenu"; // new

import { useNavigate } from "react-router-dom";

const { Option } = Select;

function MenuCreate() {
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate("/menu");
  };
  const [messageApi, contextHolder] = message.useMessage();
  const [menuTypes, setMenuTypes] = useState<MenuTypesInterface[]>([]);

  const [ingredients, setIngredients] = useState<IngredientsInterface[]>([]); // new

  const [menuImage, setMenuImage] = useState<ImageUpload>()

  console.log (menuTypes);

  const onFinish = async (values: MenusInterface & IngredientMenusInterface) => { // more & IngredientMenusInterface
    values.MenuImage = menuImage?.thumbUrl;
    // values.MenuCost = parseInt(values.MenuCost! .toString(), 10); // edit by saran :D
    values.MenuCost = parseFloat(values.MenuCost!.toString());
    values.Amount = parseInt(values.Amount!.toString(), 10); // new
    // console.log(values);
    // let res = await CreateMenu(values); // use it -> keep data to db /menu
    // let res = await CreateIngredientMenu(values); // use it -> keep data to db /ingredientMenu
    console.log(values.MenuID); // in now undefined
    // CreateMenu
    let resMenu = await CreateMenu(values); // new

    // CreateIngredientMenu
    let resIngredientMenu = await CreateIngredientMenu(values); // new
    
    if (resMenu.status && resIngredientMenu.status) { // new 
    // if (res.status) {
      messageApi.open({
        type: "success",
        content: "บันทึกข้อมูลสำเร็จ",
      });
      setTimeout(function () {
        navigate("/menu");
      }, 2000);
    } else {
      messageApi.open({
        type: "error",
        content: "บันทึกข้อมูลไม่สำเร็จ",
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

  const getIngredient = async () => {
    let res = await GetIngredients();
    if (res) {
      setIngredients(res);
    }
  }; // new

  useEffect(() => {
    getMenuType();

    getIngredient(); // new

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
        <h2>เพิ่มข้อมูลเมนู</h2>
        <Divider />
        <Form
          name="basic"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="ชื่อเมนู (TH)"
                name="MenuName"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกชื่อเมนู !",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="ชื่อเมนู (ENG)"
                name="MenuNameEng"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกชื่อเมนู !",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="ราคาเมนู"
                name="MenuCost"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกราคาเมนู !",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item name="MenuTypeID" label="ประเภทเมนู" rules={[{ required: true,  message: "กรุณาระบุประเภทเมนู !", }]}>
                <Select allowClear>
                  {menuTypes.map((item) => (
                    <Option value={item.ID} key={item.TypeName}>{item.TypeName}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item name="IngredientID" label="วัตถุดิบ" rules={[{ required: true,  message: "กรุณาระบุวัตถุดิบ !", }]}>
                <Select allowClear>
                  {ingredients.map((item) => (
                    <Option value={item.ID} key={item.IngredientName}>{item.IngredientName}</Option> // Nop
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="จำนวนวัตถุดิบ"
                name="Amount" // Nop
                rules={[{ required: true, message: "กรุณากรอกจำนวนวัตถุดิบ !", }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item
                label="รูปเมนู"
                name="MenuImage"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                rules={[{ required: true,  message: "กรุณาเพิ่มรูปภาพ !", }]}
              >
                <Upload maxCount={1} multiple={false} listType="picture-card">
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>อัพโหลด</div>
                  </div>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
          <Row justify="end">
            <Col style={{ marginTop: "40px" }}>
              <Form.Item>
                <Space>
                  <Button htmlType="button" style={{ marginRight: "10px" }} onClick={handleCancel}>
                    ยกเลิก
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={<PlusOutlined />}
                    style={{background: '#E48F44'}}
                  >
                    ยืนยัน
                  </Button>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
}

export default MenuCreate;
