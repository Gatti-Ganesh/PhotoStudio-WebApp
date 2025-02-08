import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { authReducer } from "./Authentication/Reducer";
import { thunk } from "redux-thunk";
import { albumByEventIdReducer, bookingsReducer} from "./Booking/Reducer";
import { allAlbumsReducer, publishAlbumsReducer } from "./ClientAlbums/Reducer";

const rooteReducer=combineReducers({
    auth:authReducer,
    bookings:bookingsReducer,
    publishAlbums:publishAlbumsReducer,
    albumByEventId:albumByEventIdReducer,
    allAlbums:allAlbumsReducer
})

export const store=legacy_createStore(rooteReducer,applyMiddleware(thunk));