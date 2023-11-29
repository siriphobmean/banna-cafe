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
import { UpdateIngredientMenu } from "../../../services/https/ingredientMenu"; // new

import { IngredientMenusInterface } from "../../../interfaces/IIngredientMenu"; // new more
import { IngredientsInterface } from "../../../interfaces/IIngredient"; // new more
import { CreateIngredientMenu, GetIngredients } from "../../../services/https/ingredientMenu"; // new more

import { ImageUpload } from "../../../interfaces/IUpload";

const { Option } = Select;

function MenuEdit() {
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate("/menu");
  };

  const [messageApi, contextHolder] = message.useMessage();
  const [menu, setMenu] = useState<MenusInterface>();
  const [menuTypes, setMenuTypes] = useState<MenuTypesInterface[]>([]);
  const [menuImage, setMenuImage] = useState<ImageUpload>()
  const [ingredients, setIngredients] = useState<IngredientsInterface[]>([]); // new

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
    let resIngredientMenu = await UpdateIngredientMenu(values); // new

    if (res.status && resIngredientMenu.status) {
    // if (res.status) {
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
        MenuID: res.MenuID, // new
    });
    }
  };

  const getIngredient = async () => {
    let res = await GetIngredients();
    if (res) {
      setIngredients(res);
    }
  }; // new -> select ingredient to use (combobox)

  useEffect(() => {
    getMenuType();
    getMenuById();
    getIngredient();
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
        <h2>แก้ไขข้อมูลเมนู</h2>
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
                label="ลำดับเมนู"
                name="MenuID"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกลำดับเมนู !",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
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
              <Form.Item
                name="MenuTypeID"
                label="ประเภทเมนู"
                rules={[{ required: true, message: "กรุณาระบุประเภทเมนู !" }]}
              >
                <Select allowClear>
                  {menuTypes.map((item) => (
                    <Option value={item.ID} key={item.TypeName}>
                      {item.TypeName}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item name="IngredientID" label="วัตถุดิบ" rules={[{
                
                // required: true,  message: "กรุณาระบุวัตถุดิบ !", // กำลังแก้ไขอยู่
                
                }]}>
                <Select allowClear>
                  {ingredients.map((item) => (
                    <Option value={item.ID} key={item.IngredientName}>{item.IngredientName}</Option> // ยังไม่แก้ไข ต้องดึงมาจากของนพ -> แก้แล้ว test
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="จำนวนวัตถุดิบ"
                name="IngredientAmount" // ยังไม่แก้ไข ต้องดึงมาจากของนพ
                // rules={[
                //   {
                //     required: true,
                //     message: "กรุณากรอกจำนวนวัตถุดิบ !",
                //   },
                // ]} // กำลังแก้ไขอยู่
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
                // rules={[{ required: true,  message: "กรุณาเพิ่มรูปภาพ !", }]} // กำลังแก้ไขอยู่
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
          {/* <Form.Item
            name="MenuImage" // more by flook pariwat :D
          >
          </Form.Item> */}
        </Form>
      </Card>
    </div>
  );
}

export default MenuEdit;
