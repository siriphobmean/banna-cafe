import { RolesInterface } from "./IRole";

export interface EmployeesInterface {
  ID?: number;
  FirstName?: string;
  LastName?: string;
  Email?: string;
  Password?: string;
  Gender?: string;
  Age?: number;
  Salary: number;
  RoleID?: number;
  Role?: RolesInterface;
}
