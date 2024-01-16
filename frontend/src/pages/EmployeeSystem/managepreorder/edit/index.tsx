import {
  Button,
  Col,
  Row,
  Divider,
  Form,
  Input,
  Card,
  message,
  Radio,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, ChangeEventHandler } from "react";
import {
  ManagePreOrderInterface,
  PreOrderInterface,
  StatusReceivesPreOrderInterface,
  StatusReceiveInterface,
} from "../../../../interfaces/IManagepreorder";
import {
  GetManagePreOrdersByID,
  UpdatePreOrder,
  GetPreOrderByID,
  UpdateStatusReceivePreorder,
  GetStatusReceivePreorderByPreorderID,
  ListStatusReceive,
} from "../../../../services/https/managepreorder";

function ManagePreorderEdit() {
  const navigate = useNavigate();
  const [data, SetData] = useState<ManagePreOrderInterface>();
  const [preorder, SetPreorder] = useState<PreOrderInterface>();
  const [srp, SetSRP] = useState<StatusReceivesPreOrderInterface>();
  const [sr, SetSr] = useState<StatusReceiveInterface[]>([]);
  let { id } = useParams();

  const getMP = async () => {
    let res = await GetManagePreOrdersByID(Number(id));
    if (res) {
      SetData(res);
    }
  };
  const getPreorder = async () => {
    let res1 = await GetPreOrderByID(Number(id));
    if (res1) {
      SetPreorder(res1);
      console.clear()
      console.log(preorder)
    }
    let res2 = await GetStatusReceivePreorderByPreorderID(Number(id))
    if (res2){
      SetSRP(res2);
    }
    let res3 = await ListStatusReceive()
    if(res3){
      SetSr(res3)
    }
  };

  useEffect(() => {
    getMP();
    getPreorder();
       
  }, []);

  function cancel_button() {
    setTimeout(function () {
      navigate(`/managepreorder`);
    }, 250);
  }

  const onFinish = async (values: PreOrderInterface) => {
    // alert(preorder?.Note)
    values.ID = preorder?.ID
    values.Member = preorder?.Member
    values.PickupTime = preorder?.PickupTime
    values.StatusApprovePreOrderInterface = preorder?.StatusApprovePreOrderInterface
    values.StatusReceivePreOrderInterface = preorder?.StatusReceivePreOrderInterface
    values.TotalAmount = preorder?.TotalAmount
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
    if (preorder?.Respond=="อนุมัติสั่งจอง"){
      let data: StatusReceivesPreOrderInterface = srp||{}
      data.StatusReceivePreOrder = sr[1]
      data.StatusReceivePreOrderID = sr[1].ID
      let res = await UpdateStatusReceivePreorder(data||{})
      if(!res.status){
        message.open({
          type: "error",
          content: res.message,
        });
      }
    }
    else if(preorder?.Respond=="ไม่อนุมัติสั่งจอง"){
      let data: StatusReceivesPreOrderInterface = srp||{}
      data.StatusReceivePreOrder = sr[0]
      data.StatusReceivePreOrderID = sr[0].ID
      let res = await UpdateStatusReceivePreorder(data||{})
      if(!res.status){
        message.open({
          type: "error",
          content: res.message,
        });
      }
    }
  };
  const onInput = (e:any) => {
    let c: PreOrderInterface = preorder ||{};
    c.Note = e.target.value;
    SetPreorder(c);
  };
  const onChange = (e:any) => {
    let c: PreOrderInterface = preorder ||{};
    c.Respond = e.target.value;
    SetPreorder(c);
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
                {data?.PickupTime?.toString()
                  .slice(0, 10)
                  .concat(" ", data?.PickupTime?.toString().slice(11, 16))}
              </span>
            </p>
            <p style={{ fontSize: "16px" }}>
              {" "}
              <br />
              ราคา :{" "}
              <span style={{ fontWeight: "normal" }}>
                {preorder?.TotalAmount}
              </span>
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
          layout="horizontal"
          autoComplete="off"
          onFinish={onFinish}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="หมายเหตุ"
                name="Note"
                initialValue={preorder?.Note}
                rules={[
                  {
                    required: false,
                    message: "กรุณากรอกหมายเหตุ",
                  },
                ]}
              >
                <Input onInput={onInput}/>
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
                <Radio.Group onChange={onChange}>
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
