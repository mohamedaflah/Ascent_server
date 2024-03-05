import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
export const checkAuthentication=async(req:Request,res:Response,next:NextFunction) => {
    console.log("🚀 ~ checkAuthentication ~ req:",req.cookies)

    const token=req.cookies.access_token
    if(!token){
        return res.status(400).json({status:false,user:null,message:"not autherized"})
    }
    jwt.verify(token,String(process.env.JWT_KEY),(err:Error|any,decoded:any)=>{
        if(err) throw err
        if(decoded){
            next()
        }else{
            return res.status(400).json({status:false,user:null,message:"not autherized"})
        }
    })
}