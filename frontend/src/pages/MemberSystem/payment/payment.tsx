import React, { useState, useEffect,useRef,ChangeEvent, InputHTMLAttributes } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Divider,List,Table,Card, message } from "antd";
import { FaFileUpload  } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import {PaymentInterface,StatusPaymentInterface,PaymentStatus,PromotionInterface} from "../../../interfaces/IPayment";
import  * as service from "../../../services/https/payment";
import { GetPreOrderByID } from "../../../services/https/managepreorder";
import { PreorderMenusInterface } from "../../../interfaces/IPreorderMenu";
import { PreOrderInterface } from "../../../interfaces/IManagepreorder";
import { EmployeesInterface } from "../../../interfaces/IEmployee";

function Payment(){
    const [showpayment,Setshowpayment] = useState<Boolean>(true);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [preorderMenu, SetPreorderMenu] = useState<PreorderMenusInterface[]>([]);
    const [payment, SetPayment] = useState<PaymentInterface>();
    let { pid } = useParams();
    const [total,SetTotal]=useState<number>(3);
    const [fixed,SetFixed]=useState<number>(4);
    const [code,SetCode]=useState<string>(' ');
    const [promotion, SetPromotion]=useState<PromotionInterface>();
    let c : PaymentInterface = payment||{};
    const [image,SetImage] = useState<string>();
    const [preorder,SetPreorder] = useState<PreOrderInterface>();
    const [employee,SetEmployee] = useState<EmployeesInterface>();


    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];

      if (selectedFile) {
        console.log('Selected File:', selectedFile);
        const reader = new  FileReader();
        reader.onload = () =>{
            const imageUrl = reader.result as string;
            SetImage(imageUrl)
        }
        reader.readAsDataURL(selectedFile);
        message.open({
            type:"success",
            content:"อัพโหลดรูปสำเร็จ"
        })
      }
    };

    const resetImage = () =>{
        SetImage('');
    }

    const openFilePicker = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };

    function displayPayment(){
        Setshowpayment(!showpayment)
    }

    const getCode = async ()=>{
        if(code !== undefined){
            let res2 = await service.GetPromotionByCode(code)
            if(res2){
                const msg = ("กำลังใช้งานโค้ด").concat(res2?.Name)
                message.open({
                    type:"success",
                    content:msg,
                });
                
                if(code !== promotion?.Code || total === fixed){
                    SetPromotion(res2);
                    c.Code = code;
                    c.TotalAmount = fixed - res2.Discount;
                    SetPayment(c);
                    SetTotal(c.TotalAmount);
                }   
            }
            else{
                message.open({
                    type:"error",
                    content:"ไม่พบโค้ดส่วนลดปัจจุบัน", 
                });
                if(code!==promotion?.Code){
                    SetTotal(fixed);
                }
            }
        }else{
            message.open({
                type:"warning",
                content:"กรุณากรอกโค้ดส่วนลดหรือดำเนินการต่อโดยไม่กรอกโค้ดส่วนลด"
            }) 
        }
    }

    const onFinish = async ()=>{
        let data : PaymentInterface = payment || {};
        data.Employee = employee;
        data.Preorder = preorder;
        data.Promotion = promotion;
        data.TotalAmount = total;
        data.Image = image;
        data.Code = promotion?.Code
        data.EmployeeID = employee?.ID
        data.PreorderID = preorder?.ID
        data.PromotionID = promotion?.ID
        if(data.Image){
            let res = await service.CreatePayment(data)
            if (res.status){
                message.open({
                    type:"success",
                    content:"ดำเนินการสำเร็จ"
                })
                displayPayment();
            }
            else{
                message.open({
                    type:"error",
                    content:"ดำเนินการไม่สำเร็จ"
                })
            }
        }else{
            message.open({
                type:"error",
                content:"กรุณาอัพโหลดหลักฐานการโอน"
            })
        }
    }

    const getData = async () =>{
        let res1 = await service.GetPreorderMenuByPreorderID(Number(pid))
        if(res1){
            const t:number = res1.reduce((sum:number,menu : PreorderMenusInterface) => sum += menu.TotalCost||0,0) 
            SetTotal(t);
            SetFixed(t);
            SetPreorderMenu(res1);
            if(total){
                c = payment||{};
                c.TotalAmount=total
                SetPayment(c);
                SetPayment(c);
            }
        }
        let res2 = await service.GetEmployeeByID(1)
        if(res2){
            SetEmployee(res2);
            console.log("employee:",res2)
        }
        let res3 = await GetPreOrderByID(Number(pid))
        if(res3){
            SetPreorder(res3)
            console.log("preorder:",res3)
        }
    }

    const onInput = (e: any) => {
        SetCode(e.target.value||" ");
        console.log(e.target.values)
    };

    useEffect(()=>{
        getData();
    }, [])

    return(
        <div style={{justifyContent:"center",width:"100%",height:"100%"}}>
            <div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",filter:showpayment?"blur(4px)":"none"}}> 
                <button style={{backgroundColor:"red"}} onClick={displayPayment}>clickme</button>
                <img style={{width:"100%"}} src="https://imgur.com/Awd3zQC.jpg" alt="ts" />
            </div>    
            <div style={{backgroundColor:"green",width:"41%", height:"70%", position:"absolute",left:"30%",top:"20%",display:showpayment?"flex":"none",borderRadius:"15px 15px 15px 15px",flexDirection:"column",justifyItems:"center"}}>
                <div style={{backgroundColor:"black",width:"98.5%", height:"98.5%",position:"absolute",display:"flex",flexDirection:"column",left:".75%",top:".75%",borderRadius:"15px 15px 15px 15px"}}>
                    <div style={{display:"flex",width:"100%", height:"90%"}}>
                        <div style={{backgroundColor:"#F0E9D2",width:"50%",height:"100%",display:"flex",flexDirection:"column",textAlign:"center",justifyItems:"center",alignItems:"center",borderRadius:"15px 0px 0px 0px"}}>
                            <p style={{fontSize:"25px",borderBottom:"1px solid black"}}>ชำระเงิน</p>
                            <img style={{width:"65%",border:"1.5px solid black",left:"20%"}} src="https://i.imgur.com/YZ0f7Vs.jpg" 
                            alt="qr code" />
                            <p >Banna Cafe <br/> 670-238025-7 SCB</p>
                            <div onClick={openFilePicker} style={{display:"flex",flexDirection:"column",backgroundColor:"#c9c9c7",alignItems:"center",borderBlockStyle:"solid",border:"2px solid black",textAlign:'center', cursor:"pointer"}}>
                                <input ref={fileInputRef} type="file" accept=".png,.jpg" style={{display:"none"}} onChange={handleFileChange}/> 
                                กรุณาอัพโหลดหลักฐานการโอน
                                <FaFileUpload size={25}/>
                            </div>
                            <img src={image} alt="uploaded image" onClick={resetImage} style={{width:"70px",display:image?"flex":"none",marginTop:"3%",border:"1px solid black"}} />
                        </div>
                        <div style={{backgroundColor:"#F0E9D2",width:"50%",height:"100%",display:"flex",flexDirection:"column",textAlign:"center",borderRadius:"0px 15px 0px 0px",borderLeft:"1px solid black"}}>
                            <p style={{fontSize:"25px",borderBottom:"1px solid black"}}>รายการสินค้า</p>
                            <IoClose size={"8%"} style={{position:"absolute",right:"1%",top:"1%",cursor:"pointer"}} onClick={displayPayment}/>
                            <ul style={{height:"80%",width:"85%",overflowY:"scroll",overflowX:"unset",listStyle:"none",marginTop:"1%"}}>
                                {preorderMenu.map((m) =>
                                <li key={m.ID} style={{borderTop:m.ID===1?"none":"1px solid grey"}}>
                                    <p style={{textAlign:"left",alignContent:"center"}}> 
                                        <img style={{width:"50px",marginRight:"15px"}}src={m.Menu?.MenuImage} alt={m.Menu?.MenuNameEng}/>
                                        {m.Menu?.MenuName}
                                        <p style={{textAlign:"right",marginRight:"15px"}}>จำนวน: {m.Quantity} ราคา: {m.TotalCost}</p>
                                    </p> 
                                </li>
                                )}
                            </ul>
                            <p style={{marginRight:"5%",textAlign:"right",borderBottom:"1px solid grey",borderTop:"1px solid grey"}}>Total : {total}</p> 
                            <p >กรอกส่วนลดได้ที่นี่</p>
                            <div style={{width:"100%",display:"flex",marginBottom:"10%"}}>
                                <input onInput={onInput} style={{backgroundColor:"#F0E9D2",textAlign:"center",fontSize:"18px",width:"60%",marginLeft:"5%"}}/>
                                <div onClick={getCode} style={{ backgroundColor:"silver",border:"1px solid black",cursor:"pointer",color:"black",marginLeft:"5%"}}>
                                    <FiSearch size={25} />
                                </div>
                            </div> 
                        </div>
                    </div>
                    <div onClick={onFinish} style={{backgroundColor:"#181D31",width:"100%",height:"19%",display:"flex",color:"whitesmoke",fontSize:"25px",justifyContent:"center",alignContent:"center",borderRadius:"0px 0px 15px 15px",cursor:"pointer"}}>
                        เสร็จสิ้น                
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Payment;