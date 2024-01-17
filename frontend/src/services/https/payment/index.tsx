import  *  as i from "../../../interfaces/IPayment"; 
const apiUrl = "http://localhost:8080";


///////////////////GET/////////////////////
export async function GetPromotionByCode(data : string){
    const requestOptions = {
        method: "GET"
    };

    let res = await fetch(`${apiUrl}/payment/getpromo/${data}`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data){
                return res.data;
            }else{
                return false;
            }
        });
    return res
}

export async function GetPreorderMenuByPreorderID(id : number){
    const requestOptions ={
        method: "GET"
    };

    let res = await fetch(`${apiUrl}/payment/getpreordermenu/${id}`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if(res.data){
                return res.data
            }else{
                return false;
            }
        });
    return res;
}
/////////////////GET///////////////////

////////////////POST//////////////////
export async function CreatePayment(data : i.PaymentInterface){
    const requestOptions = {
        method: "POST",
        header: {"Content-Type": "application/json"},
        body: JSON.stringify(data),
    }

    let res = await fetch(`${apiUrl}/payments`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if(res.data){
                return {status: true, message: res.data};
            }else{
                return {status: false, message: res.error};
            }
        });
    return res
}



export async function CreateAccountingFromPayment(data:string) {
    const requestOptions= {
        method: "POST",
        header: {"Contemt-Type": "application/json"},
        body: JSON.stringify(data),
    };

    let res = await fetch(`${apiUrl}/payment/create_accounting/${data}`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if(res.data){
                return {status:true, message: res.data};
            }else{
                return {status:false, message: res.error};
            }
        });
    return res;
}
//////////////////POST/////////////////