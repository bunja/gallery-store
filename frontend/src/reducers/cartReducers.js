import { 
    CART_ADD_ITEM, 
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,

    CART_SAVE_PAYMENT_METHOD,
    CART_CLEAR_ITEMS,
} from '../constants/cartConstants'



export const cartReducer = (state = { cartItems: [], shippingAddress: {} }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload
            // console.log('add cart to item reducer', item)
            const existItem = state.cartItems.find(x => x.painting === item.painting)
            if (existItem) {
                return state
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }

        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x.painting !== action.payload)
            }

        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload  
            }

        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload  
            }

        case CART_CLEAR_ITEMS:
            return {
                ...state,
                cartItems: []
            }
        default:
            return state
    }
}