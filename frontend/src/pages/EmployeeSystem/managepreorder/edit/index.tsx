import { Button,Col,Row,Divider,Form,Input,Card,message,Radio } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ManagePreOrderInterface,PreOrderInterface } from "../../../../interfaces/IManagepreorder";
import { GetManagePreOrdersByID,UpdatePreOrder,GetPreOrderByID } from "../../../../services/https/managepreorder";

function ManagePreorderEdit() {
  const navigate = useNavigate();
  const [data, SetData] = useState<ManagePreOrderInterface>();
  const [preorder, SetPreorder] = useState<PreOrderInterface>();
  // const [srp, SetSRP] = useState<StatusReceivesPreOrderInterface>();
  let { id } = useParams();

  const getMP = async () => {
    let res = await GetManagePreOrdersByID(Number(id));
    if (res) {
      SetData(res);
    }
  };
  const getPreorder = async () => {
    let res = await GetPreOrderByID(Number(id));
    if (res) {
      SetPreorder(res);
    }
    // let r = await GetStatusReceivePreorderByPreorderID(Number(id))
    // if (r){
    //   SetSRP(r);
    // }
  };

  useEffect(() => {
    getMP();
    getPreorder();
    console.log(data?.Note);
  },[]);

  function cancel_button() {
    setTimeout(function () {
      navigate(`/managepreorder`);
    }, 250);
  }
  

  const onFinish = async (values: PreOrderInterface) => {
    values.ID = preorder?.ID;
    values.Member = preorder?.Member;
    values.TotalAmount = preorder?.TotalAmount;
    console.log(values)
    let res = await UpdatePreOrder(values);
    if (res.status) {
      message.open({
        type: "success",
        content: "แก้ไขข้อมูลสำเร็จ",
      });
      setTimeout(function () {
        navigate("/ManagePreorder");
      }, 250);
    } else {
      message.open({
        type: "error",
        content: "แก้ไขข้อมูลไม่สำเร็จ",
      });
    }
  };
 
  

  return (
    <div>
      <Card>
        <h2 style={{ textAlign: "center" }}>ข้อมูลคำสั่งซื้อล่วงหน้า</h2>
        <Divider />
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={12}>
            <p style={{ fontSize: "16px" }}>
              ลำดับ : {preorder?.ID}
              <span></span>
            </p>
            {/* <p style={{ fontSize: "16px" }}>
              {" "}
              <br />
              เวลาสั่งซื้อ :{" "}
              <span style={{ fontWeight: "normal" }}>
                {data?.CreateAt?.toString()?.split("T")[1].slice(0, 5)}
              </span>
            </p> */}
            <p style={{ fontSize: "16px" }}>
              {" "}
              <br />
              เวลาที่จะมารับ :{" "}
              <span style={{ fontWeight: "normal" }}>
                {(data?.PickupTime)?.toString().slice(0,10).concat(" ",(data?.PickupTime)?.toString().slice(11,16))}
              </span>
            </p>
            <p style={{ fontSize: "16px" }}>
              {" "}
              <br />
              ราคา : <span style={{ fontWeight: "normal" }}>{preorder?.TotalAmount}</span>
            </p>
            <p style={{ fontSize: "16px" }}>
              {" "}
              <br />
              ชื่อผู้สั่ง :{" "}
              <span style={{ fontWeight: "normal" }}>{data?.MemberName}</span>
            </p>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={12}>
            <p style={{ fontSize: "16px" }}>
              หลักฐานการชำระเงิน:{" "}
              <div style={{ marginLeft: "50px" }}>
                <img width={350} src={data?.Slipt}></img>
              </div>
            </p>
          </Col>
        </Row>
        <Divider />
        <Form
          name="basic"
          layout="horizontal"
          autoComplete="off"
          onFinish={onFinish}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="หมายเหตุ"
                name="Note"
                rules={[
                  {
                    required: false,
                    message: "กรุณากรอกหมายเหตุ",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="กรุณาเลือก"
                name="respond"
                rules={[
                  {
                    required: true,
                    message: "กรุณาเลือกยอมรับหรือไม่",
                  },
                ]}
              >
                <Radio.Group >
                  <Radio value={"อนุมัติสั่งจอง"}>อนุมัติ</Radio>
                  <Radio value={"ไม่อนุมัติสั่งจอง"}>ไม่อนุมัติ</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Row justify="end">
            <Col>
              <Form.Item>
                <Button
                  style={{ marginRight: "40px", backgroundColor: "lightblue" }}
                  onClick={cancel_button}
                >
                  ยกเลิก
                </Button>
                <Button
                  htmlType="submit"
                  style={{ marginRight: "40px", backgroundColor: "orange" }}
                >
                  ตกลง
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
}
export default ManagePreorderEdit; 
