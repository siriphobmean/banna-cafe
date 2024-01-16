import { EmployeesInterface } from "./IEmployee"
import { PreOrderInterface } from "./IManagepreorder"
interface PaymentInterface{
    ID?: number,
    Image?: string,
    Time?: Date,
    Code?: string,
    TotalAmount?: number
    // PromotionID?: number,
    // Promotion?: 
    PreorderID?: number,
    Preorder?: PreOrderInterface,
    EmployeeID?: number,
    Employee?: EmployeesInterface,
    StatusPaymentID?: number,
    StatusPayment?: StatusPaymentInterface
}

interface StatusPaymentInterface{
    ID?: number,
    Name?: string
}