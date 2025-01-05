import axios from "axios"
import { GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType"
import { api, API_URL } from "../../config/api"

export const registerUser=(reqData) =>async (dispatch) => {
    dispatch({type:REGISTER_REQUEST})
    try{
        const data =await axios.post(`${API_URL}/auth/signup`,reqData.userData)
        if(data.jwt) localStorage.setItem("jwt",data.jwt);
        if(data.role === "ROLE_ADMIN"){
            reqData.navigate("/admin/")
        }else{
            reqData.navigate("/")
        }
        dispatch({type:REGISTER_SUCCESS,payload:data.jwt})
    }catch(error){
        
        dispatch({type:REGISTER_FAILURE,payload:error.message})
    }
}

export const loginUser=(reqData)=>async(dispatch)=>{
    dispatch({type:LOGIN_REQUEST})
    try{
       const {data}=await axios.post(`${API_URL}/auth/login`,reqData.userData)
       if(data.jwt) localStorage.setItem("jwt",data.jwt);
       if(data.role==="ROLE_ADMIN"){
        reqData.navigate("/admin/")
       }else{
        reqData.navigate("/")
       }
       dispatch({type:LOGIN_SUCCESS,payload:data.jwt})
       
    }catch(error){
        
        dispatch({ type: LOGIN_FAILURE, payload: error.message });
        throw error;
    }
}


export const getUser=(jwt)=>async(dispatch)=>{
    
    dispatch({type:GET_USER_REQUEST})
    try{
       const {data}=await api.get(`/api/user/profile`,{
          headers:{
            Authorization:`Bearer ${jwt}`
          }
       })
       
       dispatch({type:GET_USER_SUCCESS,payload:data})
       
    }catch(error){
        dispatch({type:GET_USER_FAILURE,payload:error.message})
        
    }
}

export const logoutUser=()=>async(dispatch)=>{
    
    try{
       localStorage.clear();
       dispatch({type:LOGOUT})
    }catch(error){
        console.log("error",error.message)
    }
}