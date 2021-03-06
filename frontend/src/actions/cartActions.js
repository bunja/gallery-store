import axios from 'axios'
import { 
    CART_ADD_ITEM, 
    CART_REMOVE_ITEM, 
    CART_SAVE_SHIPPING_ADDRESS,

    CART_CLEAR_SHIPPING_ADDRESS,

    CART_SAVE_PAYMENT_METHOD,
} from '../constants/cartConstants'

export const addToCart = (id) => async(dispatch, getState) => {
    // console.log('gugug addToCart', id)
    const { data } = await axios.get(`/api/paintings/${id}`)
    // console.log('gugug', data)
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            painting: data._id,
            name: data.name,
            images: data.images[0].imageUrl,
            price: data.price,

        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) => {
    // console.log(" REMOVE MOVE MOVE BEATCH!!!")
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id,
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
    
}

export const saveShippingAddress = (data) => (dispatch) => {
    // console.log(" save shiping data!!!")
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data,
    })

    localStorage.setItem('shippingAddress', JSON.stringify(data))
    
}

export const clearShippingAddress = () => (dispatch) => {
    // console.log(" save shiping data!!!")
    dispatch({
        type: CART_CLEAR_SHIPPING_ADDRESS,
        
    })

    localStorage.removeItem('shippingAddress', JSON.stringify())
    
}

export const savePaymentMethod = (data) => (dispatch) => {
    // console.log(" save payment method!!!")
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data,
    })

    localStorage.setItem('paymentMethod', JSON.stringify(data))
    
}