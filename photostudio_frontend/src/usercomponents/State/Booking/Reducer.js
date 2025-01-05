import { FIND_ALBUM_BY_BOOKING_EVENTID_FAILURE, FIND_ALBUM_BY_BOOKING_EVENTID_RQUEST, FIND_ALBUM_BY_BOOKING_EVENTID_SUCCESS, GET_USERS_BOOKING_FAILURE, GET_USERS_BOOKING_REQUEST, GET_USERS_BOOKING_SUCCESS, UPDATE_BOOKING_STATUS_FAILURE, UPDATE_BOOKING_STATUS_RQUEST, UPDATE_BOOKING_STATUS_SUCCESS } from "./ActionType";

const initialState={
    loading:false,
    bookings:[],
    albumByEventId:null,
    error:null
    
}

export const bookingsReducer =(state=initialState,{type,payload})=>{
    switch (type) {
        case GET_USERS_BOOKING_REQUEST:
            case UPDATE_BOOKING_STATUS_RQUEST:
            return {...state,error:null,loading:true};
        case GET_USERS_BOOKING_SUCCESS:
            return {...state,error:null,loading:false,bookings:payload};
        case UPDATE_BOOKING_STATUS_SUCCESS:
            const updateBooking = state.bookings.map((booking)=>
            booking.eventId === payload.id?payload:booking);
            return {...state, loading:false,bookings:updateBooking};
        case GET_USERS_BOOKING_FAILURE:
            case UPDATE_BOOKING_STATUS_FAILURE:
            return {...state, error:payload,loading:false};
          
        default:
            return state;
    }
}

export const albumByEventIdReducer =(state=initialState,{type,payload})=>{
    switch (type) {
        case FIND_ALBUM_BY_BOOKING_EVENTID_RQUEST:
            return {...state,error:null,loading:true};
        case FIND_ALBUM_BY_BOOKING_EVENTID_SUCCESS:
            return {...state,error:null,loading:false,albumByEventId:payload};
        case FIND_ALBUM_BY_BOOKING_EVENTID_FAILURE:
            return {...state,error:payload,loading:false};
            
        default:
            return state;
    }
}