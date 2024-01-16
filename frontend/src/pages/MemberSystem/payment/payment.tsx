import React, { useState, useEffect,useRef,ChangeEvent } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Divider,List,Table,Card } from "antd";
import { FaFileUpload  } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

function Payment(){
    const [showpayment,Setshowpayment] = useState<Boolean>(true);
    const [member,SetMember] = useState<test[]>([]);

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];

      if (selectedFile) {
        console.log('Selected File:', selectedFile);
      }
    };

    const openFilePicker = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };

    interface test{
        ID:number;
        Name:string;
        Age:number;
        Email:string;
    }
    function displayPayment(){
        Setshowpayment(!showpayment)
        SetMember([
            {
                ID : 1,
                Name : "alex",
                Age : 10,
                Email : "bbbbb"
            },
            {
                ID : 2,
                Name : "anna",
                Age : 89,
                Email : "k;n'k;"
            },
            {
                ID : 3,
                Name : "josh",
                Age : 61,
                Email : "ihihgwihg"
            },
            {
                ID : 4,
                Name : "josh",
                Age : 61,
                Email : "ihihgwihg"
            },
            {
                ID : 5,
                Name : "josh",
                Age : 61,
                Email : "ihihgwihg"
            },
        ])
    }
    return(
        <div style={{justifyContent:"center",width:"100%",height:"100%"}}>
            <div style={{width:"100%",height:"100%",position:'initial',filter:showpayment?"blur(4px)":"none"}}> 
            <button style={{backgroundColor:"red"}} onClick={displayPayment}>clickme</button>
            <img style={{width:"100%"}} src="https://imgur.com/Awd3zQC.jpg" alt="ts" />
            </div>    
            <div style={{backgroundColor:"green",width:"41%", height:"61%", position:"absolute",left:"30%",top:"20%",display:showpayment?"flex":"none",borderRadius:"15px 15px 15px 15px"}}>
                <div style={{backgroundColor:"black",width:"98%", height:"98%", position:"absolute",left:"1%",top:"1%",borderRadius:"15px 15px 15px 15px"}}>
                    <div style={{backgroundColor:"#F0E9D2",width:"50%",height:"87.5%",position:"absolute",top:"0%",right:"0px",textAlign:"center",borderRadius:"0px 15px 0px 0px"}}>
                        <p style={{fontSize:"25px"}}>รายการสินค้า</p>
                        <IoClose size={50} style={{position:"absolute",right:"1%",top:"1%",cursor:"pointer"}} onClick={displayPayment}/>
                        <Divider style={{margin:"0,0,0,0"}}/>
                        <ul style={{height:"50%",width:"90%",position:"absolute",overflow:"auto",listStyle:"none",marginTop:"1%"}}>
                            {member.map((m) =>
                            <li key={m.ID}>
                                <p>ID: {m.ID} : Name: {m.Name} Age: {m.Age} Email: {m.Email}</p>
                                <p>k</p>
                            </li>
                            )}
                        </ul>
                        <div style={{position:"absolute",top:"72%",width:"100%"}}>
                            <Divider style={{marginTop:"5px",marginBottom:"0px"}}/>
                            <p style={{width:"95%",textAlign:"right"}}>Total : 500</p>
                            <Divider style={{marginTop:"0px",marginBottom:"0px"}}/>
                        </div>
                        <div style={{position:"absolute",top:"83%",width:"100",display:"flex",marginLeft:"5%"}}>
                            <p>กรอกส่วนลดได้ที่นี่<input style={{marginLeft:"25px",backgroundColor:"whitesmoke",fontSize:"22px",textAlign:"center",fontWeight:"bold"}}/></p>
                        </div>
                            
                    </div>
                    <div style={{backgroundColor:"#F0E9D2",width:"50%",height:"87.5%",position:"absolute",textAlign:"center",borderRadius:"15px 0px 0px 0px"}}>
                        <p style={{fontSize:"25px"}}>ชำระเงิน</p>
                        <img style={{width:"65%",border:"1.5px solid black"}} src="https://i.imgur.com/YZ0f7Vs.jpg" 
                        alt="qr code" />
                        <p >Banna Cafe <br/> 670-238025-7 SCB</p>
                        <div onClick={openFilePicker} style={{display:"flex",marginLeft:"25%",marginTop:"5%",backgroundColor:"#c9c9c7",width:"53%",height:"8%",alignItems:"center",borderBlockStyle:"solid",border:"3px solid black",textAlign:'center', cursor:"pointer"}}>
                            <input ref={fileInputRef} type="file" accept=".png" style={{display:"none"}} onChange={handleFileChange}/>
                            กรุณาอัพโหลดหลักฐานการโอน
                            <FaFileUpload size={30} style={{marginLeft:"2%"}}/>
                        </div>
                    </div>
                    <div style={{backgroundColor:"#181D31",bottom:"0px",width:"100%",height:"12.5%",position:"absolute",color:"whitesmoke",fontSize:"25px",textAlign:"center",borderRadius:"0px 0px 15px 15px",cursor:"pointer"}}>
                        <p>เสร็จสิ้น</p>                
                    </div>
                </div>
            </div>
            
        </div>
    )
}
export default Payment;