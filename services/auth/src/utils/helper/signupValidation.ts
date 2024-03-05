import { checkValidPassword } from "./validate";
import {isEmail} from 'validator'
export const validateSignupData = (body: {
  firstname?: string;
  lastname?: string;
  email:string;
  password: string;
  name?:string
  role: "admin" | "user" | "company";
}): { status: boolean; message: string } => {
  if (!body.firstname && !body.lastname && !body.name) {
    return {status:true,message:"Please Provide firstname"}
  }
  if(!body.password){
    return {status:true,message:"Please provide password"}
  }
  if(!body.email){
    return {status:true,message:"Please provide email"}
  }
  if(!checkValidPassword(body.password)){
    return {status:true,message:"Password must be contain atleast 2 digits , atleast one charecter and must be contain 8 letters"}
  }
  if(!isEmail(body.email)){
    return {status:true,message:"Provide valid email"}
  }

  return {status:false,message:"Success"}
};
