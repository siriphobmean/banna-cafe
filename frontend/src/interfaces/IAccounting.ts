import { EmployeesInterface } from "./IEmployee"
import { PaymentInterface } from "./IPayment"
export interface Accounting{
    ID?: number;
    Date?: Date;
    Name?: string;
    Amount?: number;
    RemainAmount?: number;

    PaymentID?: number;
    Payment?: PaymentInterface;

    AccountTypeID?: number;
    AccountType?: AccoutType;

    EmployeeID?: number;
    Employee?: EmployeesInterface;
}

export interface AccoutType{
    ID?: number;
    Name?: string;
}