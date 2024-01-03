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
import { MenusInterface } from "../../../../interfaces/IMenu";
import { MenuTypesInterface } from "../../../../interfaces/IMenuType";
import { GetMenuTypes, GetMenuById, UpdateMenu } from "../../../../services/https/menu";
import { useNavigate, useParams } from "react-router-dom";
import { GetIngredientMenuById, GetIngredientUnits, UpdateIngredientMenu } from "../../../../services/https/ingredientMenu"; // new
import { IngredientMenusInterface } from "../../../../interfaces/IIngredientMenu"; // new more
import { IngredientsInterface } from "../../../../interfaces/IIngredient"; // new more
import { GetIngredients } from "../../../../services/https/ingredientMenu"; // new more
import { GetIngredientById } from "../../../../services/https/ingredient"; // new more
import { ImageUpload } from "../../../../interfaces/IUpload";
import { IngredientUnitsInterface } from "../../../../interfaces/IIngredientUnit"; // more 13/12/66

const { Option } = Select;

function MenuEdit() {
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate("/menu");
  };

  const [messageApi, contextHolder] = message.useMessage();
  const [menu, setMenu] = useState<MenusInterface>();
  const [ingredientMenu, setIngredientMenu] = useState<IngredientMenusInterface>(); // new more
  const [menuTypes, setMenuTypes] = useState<MenuTypesInterface[]>([]);
  const [ingredientUnits, setIngredientUnits] = useState<IngredientUnitsInterface[]>([]); // more 13/12/66
  const [ingredients, setIngredients] = useState<IngredientsInterface[]>([]); // new
  const [menuImage, setMenuImage] = useState<ImageUpload>()

  // รับข้อมูลจาก params
  let { id } = useParams();
  // อ้างอิง form กรอกข้อมูล
  const [form] = Form.useForm();

  const onFinish = async (values: MenusInterface & IngredientMenusInterface) => { // more & IngredientMenusInterface
    values.ID = menu?.ID;
    // values.MenuCost = parseInt(values.MenuCost! .toString(), 10) // edit by saran :D
    values.MenuCost = parseFloat(values.MenuCost!.toString());
    values.MenuImage = menuImage?.thumbUrl;
    values.Amount = parseInt(values.Amount!.toString(), 10); // new
    values.MenuStatus = parseInt(values.MenuStatus!.toString(), 10); // more

    if(!values.MenuImage) {
      values.MenuImage = prevMenuImage;
    } // more

    let resMenu = await UpdateMenu(values); // rename res -> resMenu
    let resIngredientMenu = await UpdateIngredientMenu(values); // new

    if (resMenu.status && resIngredientMenu.status) { // rename res -> resMenu
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
  }; // select menuType to use (combobox)

  const getIngredientUnit = async () => {
    let res = await GetIngredientUnits();
    if (res) {
      setIngredientUnits(res);
    }
  }; // more 13/12/66

  const getIngredient = async () => {
    let res = await GetIngredients();
    if (res) {
      setIngredients(res);
    }
  }; // new -> select ingredient to use (combobox)

  const getMenuById = async () => {
    let res = await GetMenuById(Number(id));
    if (res) {
      setMenu(res);
      setPrevMenuImage(res.MenuImage); // more
      // set form ข้อมูลเริ่มของผู้ใช้ที่เราแก้ไข
      form.setFieldsValue({ 
        MenuName: res.MenuName ,
        MenuNameEng: res.MenuNameEng ,
        MenuCost: res.MenuCost ,
        MenuTypeID: res.MenuTypeID , // พอบันทึกกลายเป็น Null ? -> แก้ได้แล้ว
        // MenuImage: res.MenuImage , // ไม่สามารถใช้ส่วนนี้ได้ เลยปรับเป็นต้อง upload แทน
        // IngredientID: res.IngredientID ,
        // Amount: res.Amount ,
        MenuID: res.MenuID, // new
        MenuStatus: res.MenuStatus // more
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
        IngredientUnitID: res.IngredientUnitID,
      });
    }
  }; // new

  useEffect(() => {
    getMenuType();
    getMenuById();
    getIngredient();
    getIngredientMenuById();
    getMenuById(); // more
    getIngredientUnit(); // more 13/12/66
  }, []);

  const [prevMenuImage, setPrevMenuImage] = useState<string | undefined>(); // more

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
                    message: "กรุณากรอกชื่อเมนู ! (ชื่อต้องยาวไม่เกิน 50 ตัวอักษร)",
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
                    message: "กรุณากรอกชื่อเมนู ! (ชื่อต้องยาวไม่เกิน 50 ตัวอักษร)",
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
                    message: "กรุณากรอกราคาเมนู ! (เลขทศนิยม 2 ตำแหน่ง)",
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
              <Form.Item
                label="สถานะเมนู (1 คือ ไม่พร้อมขาย / 2 คือ พร้อมขาย)"
                name="MenuStatus"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกสถานะเมนู ! (เลข 1 หรือ 2 เท่านั้น)",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item name="IngredientID" label="วัตถุดิบหลัก" 
                rules={[{
                  required: true,  
                  message: "กรุณาระบุวัตถุดิบหลัก !",
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
                label="จำนวนวัตถุดิบ"
                name="Amount"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกจำนวนวัตถุดิบ !",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item name="IngredientUnitID" label="หน่วย" rules={[{ 
                required: true,  
                message: "กรุณาระบุหน่วยวัตถุดิบ !", }]}>
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
                // rules={[{ required: true,  message: "กรุณาเพิ่มรูปภาพ !", }]}
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
          <Form.Item name="MenuID"></Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default MenuEdit;
