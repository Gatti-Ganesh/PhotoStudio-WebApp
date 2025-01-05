import {CREATE_BOOKING_REQUEST,CREATE_BOOKING_SUCCESS,CREATE_BOOKING_FAILURE,GET_USERS_BOOKING_REQUEST,GET_USERS_BOOKING_SUCCESS,GET_USERS_BOOKING_FAILURE, UPDATE_BOOKING_STATUS_RQUEST, UPDATE_BOOKING_STATUS_SUCCESS, UPDATE_BOOKING_STATUS_FAILURE, FIND_ALBUM_BY_BOOKING_EVENTID_RQUEST, FIND_ALBUM_BY_BOOKING_EVENTID_SUCCESS, FIND_ALBUM_BY_BOOKING_EVENTID_FAILURE} from "./ActionType"
import { api } from "../../config/api"


export const createBooking =(data)=>{
    
    return async (dispatch) => {
        dispatch({type:CREATE_BOOKING_REQUEST});
        
        try {
            const response = await api.post("/api/user/booking", data.booking,{
                headers:{
                    Authorization:`Bearer ${data.jwt}`,
                },
            });
            
            dispatch({type:CREATE_BOOKING_SUCCESS,payload:response});
        } catch (error) {
            dispatch({type:CREATE_BOOKING_FAILURE,payload:error.message});
        }
    }
};

export const getUserBookings =(jwt)=>{
    return async (dispatch) => {
        dispatch({type:GET_USERS_BOOKING_REQUEST});
        try {
            const {data} =await api.get("/api/user/bookings",{
                headers:{
                    Authorization:`Bearer ${jwt}`,
                },
            });
            dispatch({type:GET_USERS_BOOKING_SUCCESS,payload:data});
        } catch (error) {
            dispatch({type:GET_USERS_BOOKING_FAILURE,payload:error.message});
        }
    }
}

export const updateBookingStatus =({orderId,orderStatus,jwt}) =>{
    return async (dispatch) => {
        
        dispatch({type:UPDATE_BOOKING_STATUS_RQUEST});
        try{
            const {response} = await api.put(`/admin/bookings/booking/${orderId}/${orderStatus}`,{},{
                headers:{
                    Authorization:`Bearer ${jwt}`,
                },
            });

            const updateBooking =response.data;
            dispatch({type:UPDATE_BOOKING_STATUS_SUCCESS,payload:updateBooking});
        }catch(error){
            dispatch({type:UPDATE_BOOKING_STATUS_FAILURE,payload:error.message});
        }
    }
}

export const findAlbumByBookingEventId =({eventId,jwt})=>{
    return async (dispatch)=>{
        dispatch({type:FIND_ALBUM_BY_BOOKING_EVENTID_RQUEST});
       
        try {
            const response =await api.get(`api/user/bookings/${eventId}/album`,{
                headers:{
                    Authorization:`Bearer ${jwt}`,
                },
            })
           
            dispatch({type:FIND_ALBUM_BY_BOOKING_EVENTID_SUCCESS,payload:response.data});
        } catch (error) {
            dispatch({type:FIND_ALBUM_BY_BOOKING_EVENTID_FAILURE,payload:error.message});
        }
    }
}