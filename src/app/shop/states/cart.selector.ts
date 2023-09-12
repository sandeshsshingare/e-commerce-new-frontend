import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CartState } from "./cart.state";

export const getAllFromCart = createFeatureSelector<CartState>('cartItems')

export const getCartItems = createSelector(getAllFromCart,(state)=>{
    return state.cartItems
})