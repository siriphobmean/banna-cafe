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
import { EmployeesInterface } from "../../../../interfaces/IEmployee";
import { RolesInterface } from "../../../../interfaces/IRole";
import { GendersInterface } from "../../../../interfaces/IGender"; // more
import { CreateEmployee, GetRoles, GetEmployeeById, UpdateEmployee, GetGenders } from "../../../../services/https/employee";
import { useNavigate, useParams } from "react-router-dom";

const { Option } = Select;

function EmployeeEdit() {
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate("/employee");
  };
  const [messageApi, contextHolder] = message.useMessage();

  const [employee, setEmployee] = useState<EmployeesInterface>();
  const [roles, setRoles] = useState<RolesInterface[]>([]);
  const [genders, setGenders] = useState<GendersInterface[]>([]);

  // รับข้อมูลจาก params
  let { id } = useParams();
  // อ้างอิง form กรอกข้อมูล
  const [form] = Form.useForm();

  const onFinish = async (values: EmployeesInterface) => {
    values.ID = employee?.ID;
    values.Age = parseInt(values.Age! .toString(), 10);
    values.Salary = parseFloat(values.Salary!.toString());
    let res = await UpdateEmployee(values);
    if (res.status) {
      messageApi.open({
        type: "success",
        content: "แก้ไขข้อมูลสำเร็จ",
      });
      setTimeout(function () {
        navigate("/employee");
      }, 2000);
    } else {
      messageApi.open({
        type: "error",
        content: res.message,
      });
    }
    console.log(values)
  };

  const getRole = async () => {
    let res = await GetRoles();
    if (res) {
      setRoles(res);
    }
  };

  const getGender = async () => {
    let res = await GetGenders();
    if (res) {
      setGenders(res);
    }
  };

  const getEmployeeById = async () => {
    let res = await GetEmployeeById(Number(id));
    if (res) {
      setEmployee(res);
      // set form ข้อมูลเริ่มของผู้ใช้ที่เราแก้ไข
      form.setFieldsValue({ 
        FirstName: res.FirstName,
        LastName : res.LastName,
        RoleID: res.RoleID,
        Email: res.Email,
        Password: res.Password,
        GenderID: res.GenderID,
        Age: res.Age,
        Salary: res.Salary,
    });
    }
  };

  useEffect(() => {
    getRole();
    getGender();
    getEmployeeById();
  }, []);

  return (
    <div>
      {contextHolder}
      <Card>
        <h2>แก้ไขข้อมูลพนักงาน</h2>
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
                label="ชื่อจริง"
                name="FirstName"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกชื่อ !",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="นามสกุล"
                name="LastName"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกนามสกุล !",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                name="RoleID"
                label="ตำแหน่ง"
                rules={[{ required: true, message: "กรุณาระบุตำแหน่ง !" }]}
              >
                <Select allowClear>
                  {roles.map((item) => (
                    <Option value={item.ID} key={item.RoleName}>
                      {item.RoleName}
                    </Option>
                  ))}
                </Select>
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
                  {
                    required: true,
                    message: "กรุณากรอกอีเมล !",
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
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกรหัสผ่าน !",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item name="GenderID" label="เพศ" rules={[{ required: true,  message: "กรุณาระบุเพศ !", }]}>
                <Select allowClear>
                  {genders.map((item) => (
                    <Option value={item.ID} key={item.GenderName}>{item.GenderName}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="อายุ"
                name="Age"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกอายุ !",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="เงินเดือน"
                name="Salary"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกเงินเดือน !",
                  },
                ]}
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
        </Form>
      </Card>
    </div>
  );
}

export default EmployeeEdit;
