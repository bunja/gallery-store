import {
    PAINTING_LIST_REQUEST,
    PAINTING_LIST_SUCCESS,
    PAINTING_LIST_FAIL,

    PAINTING_DETAILS_REQUEST,
    PAINTING_DETAILS_SUCCESS,
    PAINTING_DETAILS_FAIL,

    PAINTING_DELETE_REQUEST,
    PAINTING_DELETE_SUCCESS,
    PAINTING_DELETE_FAIL,

    PAINTING_CREATE_REQUEST,
    PAINTING_CREATE_SUCCESS,
    PAINTING_CREATE_FAIL,
    PAINTING_CREATE_RESET,


} from '../constants/paintingConstants'

export const paintingListReducer = (state = { paintings: [] }, action) => {
   

    switch (action.type) {

        case PAINTING_LIST_REQUEST:
            
            return {
                loading: true,
                paintings: []
            }

        case PAINTING_LIST_SUCCESS:
            // console.log("gugug sucec", action.payload)
            return {
                loading: false,
                paintings: action.payload
            }

        case PAINTING_LIST_FAIL:
            // console.log("gugug ups", action.payload)
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}          

export const paintingDetailsReducer = (state = { painting: [] }, action) => {
    // console.log("inside of paintings details reducer")
    switch (action.type) {
        
        case PAINTING_DETAILS_REQUEST:
            // console.log("PAINTING_DETAILS_REQUEST")
            return {
                loading: true, ...state
            }

        case PAINTING_DETAILS_SUCCESS:
            // console.log("PAINTING_DETAILS_Success", action.payload)
            return {
                loading: false,
                painting: action.payload
            }

        case PAINTING_DETAILS_FAIL:
            // console.log("PAINTING_DETAILS_Fail")
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}          

export const paintingDeleteReducer = (state = { }, action) => {
    
    switch (action.type) {
        
        case PAINTING_DELETE_REQUEST:
            return {
                loading: true,
            }

        case PAINTING_DELETE_SUCCESS:
            return {
                loading: false,
                success: true
            }

        case PAINTING_DELETE_FAIL:
           return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
} 

export const paintingCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PAINTING_CREATE_REQUEST:
            return { loading: true }

        case PAINTING_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                painting: action.payload
            }

        case PAINTING_CREATE_FAIL:
            return { loading: false, error: action.payload }

        case PAINTING_CREATE_RESET:
            return {}

        default:
            return state
    }
}