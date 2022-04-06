import axios from 'axios'
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants'

export const addToCart = (id) => async(dispatch, getState) => {
    console.log('gugug addToCart', id)
    const { data } = await axios.get(`/api/paintings/${id}`)
    console.log('gugug', data)
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            painting: data._id,
            name: data.name,
            image: data.image,
            price: data.price,

        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) => {
    console.log(" REMOVE MOVE MOVE BEATCH!!!")
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id,
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
    
}