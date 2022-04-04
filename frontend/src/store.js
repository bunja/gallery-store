import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { paintingListReducer, paintingDetailsReducer } from './reducers/paintingReducers'

const reducer = combineReducers({
    paintingList: paintingListReducer,
    paintingDetails: paintingDetailsReducer
})

const initialState = {}

const middleware = [thunk]
const store = createStore(reducer, initialState,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store 