import { Credential } from "../types/Auth";
import axios, { AxiosAdapter, AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders } from "axios";
import { ls } from "../utils/Ls";
import { useDispatch } from "react-redux";

axios.interceptors.request.use((req:any)=>{
    let accessToken = ls.$get("accessToken")
    if(accessToken){
        req.headers.common.Authorization = `Bearer ${accessToken}`;
        
    }
    return req;
})
 
export const AccountService = {

    getProfile:()=>{
        return axios.get(import.meta.env.VITE_API_URL+"/account/profile")
    },

    changePassword:(data:any)=>{
        return axios.post(import.meta.env.VITE_API_URL+"/account/change-password",data)
    }


    
}