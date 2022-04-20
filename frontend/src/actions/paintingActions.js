import axios from 'axios'
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


} from '../constants/paintingConstants'

export const listPaintings = () => async(dispatch) => {
    try {
        dispatch({ type: PAINTING_LIST_REQUEST })

        const { data } = await axios.get('/api/paintings')

        dispatch({
            type: PAINTING_LIST_SUCCESS,
            payload: data
        })

    } catch(error){
        dispatch({
            type: PAINTING_LIST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
}

export const listPaintingDetails = (id) => async(dispatch) => {
    try {
        dispatch({ type: PAINTING_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/paintings/${id}`)

        dispatch({
            type: PAINTING_DETAILS_SUCCESS,
            payload: data
        })

    } catch(error){
        dispatch({
            type: PAINTING_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
}

export const deletePainting = (id) => async (dispatch, getState) => {
    try {
        
        dispatch({
            type: PAINTING_DELETE_REQUEST
        })

        const { 
            userLogin: {userInfo}, 
        } = getState()

        
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(
            `/api/painting/delete/${id}`,
            config
        )

        
        dispatch({
            type: PAINTING_DELETE_SUCCESS,
            
        })
              
        
    } catch (error) {
        dispatch({
            type: PAINTING_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}