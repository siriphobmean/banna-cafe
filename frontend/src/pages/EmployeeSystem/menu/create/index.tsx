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
import { MenusInterface } from "../../../../interfaces/IMenu";
import { MenuTypesInterface } from "../../../../interfaces/IMenuType";
import { IngredientMenusInterface } from "../../../../interfaces/IIngredientMenu"; // new
import { IngredientsInterface } from "../../../../interfaces/IIngredient"; // new
import { ImageUpload } from "../../../../interfaces/IUpload";
import { CreateMenu, GetMenuTypes } from "../../../../services/https/menu";
import { CreateIngredientMenu, GetIngredients, GetIngredientUnits } from "../../../../services/https/ingredientMenu"; // new +more 13/12/66
import { useNavigate } from "react-router-dom";
import { IngredientUnitsInterface } from "../../../../interfaces/IIngredientUnit"; // more 13/12/66
import { GetLatestMenuID } from "../../../../services/https/menu"; // new 20/12/66

const { Option } = Select;

function MenuCreate() {
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate("/menu");
  };
  
  const [messageApi, contextHolder] = message.useMessage();
  const [menuTypes, setMenuTypes] = useState<MenuTypesInterface[]>([]);
  const [ingredients, setIngredients] = useState<IngredientsInterface[]>([]); // new
  const [ingredientUnits, setIngredientUnits] = useState<IngredientUnitsInterface[]>([]); // more 13/12/66
  const [menuImage, setMenuImage] = useState<ImageUpload>()
  const [latestMenuID, setLatestMenuID] = useState<number | undefined>(undefined); // new 20/12/66
  console.log (menuTypes);

  const onFinish = async (values: MenusInterface & IngredientMenusInterface) => { // more & IngredientMenusInterface

    // Fetch latest menu ID
    let latestID = await GetLatestMenuID();
    // Increment the latest ID by 1 for the new menu ID
    if (latestID !== false) {
      latestID += 1; // Increment the latest ID by 1
      values.MenuID = latestID; // Assign the incremented ID to the MenuID field
    } else {
      // Handle if the latest ID retrieval fails
      messageApi.open({
        type: "error",
        content: "ไม่สามารถดึงข้อมูล ID เมนูล่าสุดได้",
      });
    return;
  }

    values.MenuImage = menuImage?.thumbUrl;
    // values.MenuCost = parseInt(values.MenuCost! .toString(), 10); // edit by saran :D
    values.MenuCost = parseFloat(values.MenuCost!.toString());
    values.Amount = parseInt(values.Amount!.toString(), 10); // new more 12:40 AM 30/11/2023
    //values.MenuID = parseInt(values.MenuID!.toString(), 10); // new more 12:35 AM 29/11/2023
    values.MenuStatus = parseInt(values.MenuStatus!.toString(), 10); // more
    // console.log(values);
    // let res = await CreateMenu(values); // use it -> keep data to db /menu
    // let res = await CreateIngredientMenu(values); // use it -> keep data to db /ingredientMenu
    // values.MenuID = 10; // กำหนดค่าได้ แต่ค่าไม่ส่งไปยัง Database (เป็น Null) -> update สามารถส่งค่าได้แล้ว 9:10 AM 28/11/2023
    
    console.log(values.MenuID); // in now undefined, more db setup // values in IngredientMenusInterface

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
  }; // select menuType to use (combobox)

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
    getMenuType();
    getIngredient(); // new
    getIngredientUnit(); // more 13/12/66
    const fetchLatestMenuID = async () => {
      const latestID = await GetLatestMenuID();
      setLatestMenuID(latestID); // Set the latest menu ID retrieved from the backend
    };
    fetchLatestMenuID();
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
          {/* <Col xs={24} sm={24} md={24} lg={24} xl={12}>
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
            </Col> */}
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
              <Form.Item
                label="สถานะเมนู (0 คือ ไม่พร้อมขาย / 1 คือ พร้อมขาย)"
                name="MenuStatus"
                rules={[
                  {
                    required: true,
                    message: "กรุณาเลือกสถานะเมนู !",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item name="IngredientID" label="วัตถุดิบหลัก" rules={[{ required: true,  message: "กรุณาระบุวัตถุดิบหลัก !", }]}>
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
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item
                label="รูปเมนู"
                name="MenuImage"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                //rules={[{ required: true,  message: "กรุณาเพิ่มรูปภาพ !", }]} // เอาออกก่อนเพราะตอนนี้ test
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
