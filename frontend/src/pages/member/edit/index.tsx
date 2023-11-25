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
import { MembersInterface } from "../../../interfaces/IMember";
// import { RolesInterface } from "../../../interfaces/IRole";
import { CreateMember, GetMemberById, UpdateMember } from "../../../services/https/member";
import { useNavigate, useParams } from "react-router-dom";

const { Option } = Select;

function MemberEdit() {
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate("/member");
  };
  const [messageApi, contextHolder] = message.useMessage();

  const [member, setMember] = useState<MembersInterface>();
//   const [roles, setRoles] = useState<RolesInterface[]>([]);

  // รับข้อมูลจาก params
  let { id } = useParams();
  // อ้างอิง form กรอกข้อมูล
  const [form] = Form.useForm();

  const onFinish = async (values: MembersInterface) => {
    values.ID = member?.ID;
    values.Point = parseInt(values.Point! .toString(), 10);
    // values.Salary = parseFloat(values.Salary!.toString());
    let res = await UpdateMember(values);
    if (res.status) {
      messageApi.open({
        type: "success",
        content: "แก้ไขข้อมูลสำเร็จ",
      });
      setTimeout(function () {
        navigate("/member");
      }, 2000);
    } else {
      messageApi.open({
        type: "error",
        content: "แก้ไขข้อมูลไม่สำเร็จ",
      });
    }
    console.log(values)
  };

//   const getRole = async () => {
//     let res = await GetRoles();
//     if (res) {
//       setRoles(res);
//     }
//   };

  const getMemberById = async () => {
    let res = await GetMemberById(Number(id));
    if (res) {
      setMember(res);
      // set form ข้อมูลเริ่มของผู้ใช้ที่เราแก้ไข
      form.setFieldsValue({ 
        Username: res.Username,
        Email: res.Email,
        Password: res.Password,
        MemberImage: res.MemberImage,
        Phone: res.Phone,
        Point: res.Point,
    });
    }
  };

  useEffect(() => {
    // getRole();
    getMemberById();
  }, []);

  return (
    <div>
      {contextHolder}
      <Card>
        <h2>แก้ไขข้อมูลสมาชิก</h2>
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
                label="ชื่อผู้ใช้งาน"
                name="Username"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="อีเมล"
                name="Email"
                rules={[
                  {
                    type: "email",
                    message: "รูปแบบอีเมลไม่ถูกต้อง !",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="รหัสผ่าน"
                name="Password"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="เบอร์โทรศัพท์"
                name="Phone"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="คะแนนสะสม"
                name="Point"
              >
                <Input />
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
          <Form.Item name="MemberImage"></Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default MemberEdit;
