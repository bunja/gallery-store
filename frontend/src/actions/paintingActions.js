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

    PAINTING_CREATE_REQUEST,
    PAINTING_CREATE_SUCCESS,
    PAINTING_CREATE_FAIL,
    PAINTING_CREATE_RESET,

    PAINTING_UPDATE_REQUEST,
    PAINTING_UPDATE_SUCCESS,
    PAINTING_UPDATE_FAIL,
    PAINTING_UPDATE_RESET,



} from '../constants/paintingConstants'

export const listPaintings = (keyword = '') => async(dispatch) => {
    try {
        dispatch({ type: PAINTING_LIST_REQUEST })

        const { data } = await axios.get(`/api/paintings${keyword}`)

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
            `/api/paintings/delete/${id}`,
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

export const createPainting = () => async (dispatch, getState) => {
    try {
        
        dispatch({
            type: PAINTING_CREATE_REQUEST
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

        const { data } = await axios.post(
            `/api/paintings/create/`,
            {},
            config
        )

        
        dispatch({
            type: PAINTING_CREATE_SUCCESS,
            payload: data
        })
              
        
    } catch (error) {
        dispatch({
            type: PAINTING_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const updatePainting = (painting) => async (dispatch, getState) => {
    try {
        
        dispatch({
            type: PAINTING_UPDATE_REQUEST
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

        const { data } = await axios.put(
            `/api/paintings/update/${painting._id}/`,
            painting,
            config
        )

        
        dispatch({
            type: PAINTING_UPDATE_SUCCESS,
            payload: data
        })

        dispatch({
            type: PAINTING_DETAILS_SUCCESS,
            payload: data
        })
              
        
    } catch (error) {
        dispatch({
            type: PAINTING_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

