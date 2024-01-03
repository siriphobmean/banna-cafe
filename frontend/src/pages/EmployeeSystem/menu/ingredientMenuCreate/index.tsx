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
  Select,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { MenusInterface } from "../../../../interfaces/IMenu";
import { IngredientMenusInterface } from "../../../../interfaces/IIngredientMenu";
import { IngredientsInterface } from "../../../../interfaces/IIngredient";
import { CreateIngredientMenu, GetIngredients, GetIngredientUnits, CreateIngredientMenuByMenuName, GetMenuNames } from "../../../../services/https/ingredientMenu";
import { useNavigate, useParams } from "react-router-dom";
import { IngredientUnitsInterface } from "../../../../interfaces/IIngredientUnit";

const { Option } = Select;

function IngredientMenuCreate() {
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate("/menu");
  };
  
  const [messageApi, contextHolder] = message.useMessage();
  const [ingredients, setIngredients] = useState<IngredientsInterface[]>([]); // new
  const [ingredientUnits, setIngredientUnits] = useState<IngredientUnitsInterface[]>([]); // more 13/12/66
  const [menuNames, setMenuNames] = useState<MenusInterface[]>([]); // more 20/12/66

  const onFinish = async (values: MenusInterface & IngredientMenusInterface) => { // more & IngredientMenusInterface
    values.Amount = parseInt(values.Amount!.toString(), 10); // new more 12:40 AM 30/11/2023
    values.MenuID = parseInt(values.MenuID!.toString(), 10); // new more 12:35 AM 29/11/2023
    console.log(values.MenuID);

    // CreateIngredientMenu -> edit to CreateIngredientMenuByMenuName
    let res = await CreateIngredientMenuByMenuName(values); // new -> edit 20/12/66
    
    if (res.status) {
      messageApi.open({
        type: "success",
        content: "เพิ่มวัตถุดิบสำเร็จ",
      });
      setTimeout(function () {
        navigate("/menu");
      }, 2000);
    } else {
      messageApi.open({
        type: "error",
        content: res.message,
      });
    }
    console.log(values);
  };

  const getMenuName = async () => {
    let res = await GetMenuNames();
    if (res) {
      setMenuNames(res);
    }
  }; // select menuName to use (combobox) more 20/12/66

  const getIngredientUnit = async () => {
    let res = await GetIngredientUnits();
    if (res) {
      setIngredientUnits(res);
    }
  }; // select menuUnit to use (combobox) +more 13/12/66

  const getIngredient = async () => {
    let res = await GetIngredients();
    if (res) {
      setIngredients(res);
    }
  }; // new -> select ingredient to use (combobox)

  useEffect(() => {
    getIngredient(); // new
    getIngredientUnit(); // more 13/12/66
    getMenuName(); // more 20/12/66
  }, []);

  const [form] = Form.useForm();
  let { id } = useParams();

  return (
    <div>
      {contextHolder}
      <Card>
        <h2>เพิ่มข้อมูลวัตถุดิบของเมนู</h2>
        <Divider />
        <Form
          name="basic"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item name="MenuID" label="เมนู" rules={[{ required: true,  message: "กรุณาระบุเมนู !", }]}>
                <Select allowClear>
                  {menuNames.map((item) => (
                    <Option value={item.ID} key={item.MenuName}>{item.MenuName}</Option> // Nop
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
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item name="IngredientUnitID" label="หน่วย" rules={[{ required: true,  message: "กรุณาระบุหน่วยวัตถุดิบ !", }]}>
                <Select allowClear>
                  {ingredientUnits.map((item) => (
                    <Option value={item.ID} key={item.UnitName}>{item.UnitName}</Option> // Nop
                  ))}
                </Select>
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

export default IngredientMenuCreate;
