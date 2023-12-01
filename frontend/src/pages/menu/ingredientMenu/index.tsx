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
import { GetMenuById, UpdateMenu } from "../../../services/https/menu";
import { useNavigate, useParams } from "react-router-dom";
import { GetIngredientMenuById, UpdateIngredientMenu } from "../../../services/https/ingredientMenu"; // new
import { IngredientMenusInterface } from "../../../interfaces/IIngredientMenu"; // new more
import { IngredientsInterface } from "../../../interfaces/IIngredient"; // new more
import { GetIngredients } from "../../../services/https/ingredientMenu"; // new more

const { Option } = Select;

function IngredientMenus() {
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate("/menu");
  };

  const [messageApi, contextHolder] = message.useMessage();
  const [menu, setMenu] = useState<MenusInterface>();
  const [ingredientMenu, setIngredientMenu] = useState<IngredientMenusInterface>(); // new more'
  const [ingredients, setIngredients] = useState<IngredientsInterface[]>([]); // new

  // รับข้อมูลจาก params
  let { id } = useParams();
  // อ้างอิง form กรอกข้อมูล
  const [form] = Form.useForm();

  const onFinish = async (values: MenusInterface & IngredientMenusInterface) => {
    values.ID = menu?.ID;
    values.Amount = parseInt(values.Amount!.toString(), 10); // new

    let res = await UpdateMenu(values);
    let resIngredientMenu = await UpdateIngredientMenu(values); // new
    if (res.status && resIngredientMenu.status) { // add more
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

  const getMenuById = async () => {
    let res = await GetMenuById(Number(id));
    if (res) {
      setMenu(res);
      // set form ข้อมูลเริ่มของผู้ใช้ที่เราแก้ไข
      form.setFieldsValue({ 
        MenuName: res.MenuName ,
        MenuNameEng: res.MenuNameEng ,
    });
    }
  };

  const getIngredientMenuById = async () => {
    let res = await GetIngredientMenuById(Number(id));
    if (res) {
      setIngredientMenu(res);
      form.setFieldsValue({
        Amount: res.Amount,
        IngredientID: res.IngredientID,
      });
    }
  }; // new

  const getIngredient = async () => {
    let res = await GetIngredients();
    if (res) {
      setIngredients(res);
    }
  }; // new -> select ingredient to use (combobox)

  useEffect(() => {
    getMenuById();
    getIngredient(); // new
    getIngredientMenuById(); // new
  }, []);

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
              <Form.Item name="IngredientID" label="วัตถุดิบ [1]" 
                rules={[{
                  required: true,  message: "กรุณาระบุวัตถุดิบ !",
                }]}>
                <Select allowClear>
                  {ingredients.map((item) => (
                    <Option value={item.ID} key={item.IngredientName}>{item.IngredientName}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="จำนวนวัตถุดิบ [1]"
                name="Amount"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกจำนวนวัตถุดิบ !",
                  },
                ]}
              >
                <Input readOnly/>
              </Form.Item>
            </Col>
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

export default IngredientMenus;
