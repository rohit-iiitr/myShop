import { useEffect, useState } from "react";
import { useAuth } from "../../context/Auth";
import axios from 'axios';
import { Outlet } from "react-router-dom";
import { Spinner } from "../layout/Spinner";

export default function PrivateRoute(){
  const [ok,setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(()=>{
    const authCheck = async()=>{
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/auth/user-auth`,{
          headers:{
            "Authorization":auth?.token
          }
        })
        if(res.data.ok){
          setOk(true);
        }else{
          setOk(false);
        }
    }
    if(auth?.token) authCheck();
  },[auth?.token])

  return ok? <Outlet/>:<Spinner/>

}