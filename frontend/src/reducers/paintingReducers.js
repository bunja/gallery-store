import {
    PAINTING_LIST_REQUEST,
    PAINTING_LIST_SUCCESS,
    PAINTING_LIST_FAIL,

    PAINTING_DETAILS_REQUEST,
    PAINTING_DETAILS_SUCCESS,
    PAINTING_DETAILS_FAIL,


} from '../constants/paintingConstants'

export const paintingListReducer = (state = { paintings: [] }, action) => {
    console.log('whhhat');

    switch (action.type) {

        case PAINTING_LIST_REQUEST:
            console.log("gugug")
            return {
                loading: true,
                paintings: []
            }

        case PAINTING_LIST_SUCCESS:
            console.log("gugug sucec", action.payload)
            return {
                loading: false,
                paintings: action.payload
            }

        case PAINTING_LIST_FAIL:
            console.log("gugug ups", action.payload)
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}          

export const paintingDetailsReducer = (state = { painting: [] }, action) => {
    console.log("inside of paintings details reducer")
    switch (action.type) {
        
        case PAINTING_DETAILS_REQUEST:
            console.log("PAINTING_DETAILS_REQUEST")
            return {
                loading: true, ...state
            }

        case PAINTING_DETAILS_SUCCESS:
            console.log("PAINTING_DETAILS_Success", action.payload)
            return {
                loading: false,
                painting: action.payload
            }

        case PAINTING_DETAILS_FAIL:
            console.log("PAINTING_DETAILS_Fail")
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}          