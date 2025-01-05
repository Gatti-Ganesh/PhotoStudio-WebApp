import { GET_ALL_PUBLISHED_ALBUMS_FAILURE, GET_ALL_PUBLISHED_ALBUMS_REQUEST, GET_ALL_PUBLISHED_ALBUMS_SUCCESS } from "./ActionType";

const initialState={
    loading:false,
    publishAlbums:[],
    error:null
    
}

export const publishAlbumsReducer =(state=initialState,{type,payload})=>{
    switch (type) {
        case GET_ALL_PUBLISHED_ALBUMS_REQUEST:
            return {...state,error:null,loading:true};
        case GET_ALL_PUBLISHED_ALBUMS_SUCCESS:
            return {...state,error:null,loading:false,publishAlbums:payload};
        case GET_ALL_PUBLISHED_ALBUMS_FAILURE:
            return {...state, error:payload,loading:false};
          
        default:
            return state;
    }
}