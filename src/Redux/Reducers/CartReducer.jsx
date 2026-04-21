import { CREATE_CART_RED, DELETE_CART_RED, GET_CART_RED, UPDATE_CART_RED } from "../Constants";

export function CartReducer(state = [], action) {
    switch (action.type) {
        case CREATE_CART_RED:
            return [...state, action.payload]
        case GET_CART_RED:
            return action.payload
        case UPDATE_CART_RED:
            let index = state.findIndex(x => x.id === action.payload.id)
            state[index].name = action.payload.name
            state[index].pic = action.payload.pic
            state[index].active = action.payload.active
            return state
        case DELETE_CART_RED:
            return state.filter(x => x.id !== action.payload.id)
        default: return state

    }
}