import { Credential } from "../types/Auth";
import axios from "axios";

export const AuthService = {

    doLogin:(credential:Credential)=>{
        return axios.post(import.meta.env.VITE_API_URL+"/auth/login",credential)
    }
}