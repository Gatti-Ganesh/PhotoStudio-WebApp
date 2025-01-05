import axios from "axios";
import { api,API_URL } from "../../config/api";
import { GET_ALL_PUBLISHED_ALBUMS_FAILURE, GET_ALL_PUBLISHED_ALBUMS_REQUEST, GET_ALL_PUBLISHED_ALBUMS_SUCCESS } from "./ActionType";


export const getPublishedAlbums =()=>{
    return async (dispatch) => {
        dispatch({type:GET_ALL_PUBLISHED_ALBUMS_REQUEST});
        
        try {
           
            const {data} =await axios.get(`${API_URL}/publish/albums`,{});
            
            dispatch({type:GET_ALL_PUBLISHED_ALBUMS_SUCCESS,payload:data});
        } catch (error) {
            dispatch({type:GET_ALL_PUBLISHED_ALBUMS_FAILURE,payload:error.message});
            console.log("error ",error)
        }
    }
}