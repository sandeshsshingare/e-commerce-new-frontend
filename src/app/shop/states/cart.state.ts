import { Cart } from '../interfaces/cart.interface';
import { CartReducer } from './cart.reducer';

export interface CartState {
  cartItems: Cart[];
}

const a = localStorage.getItem('cartItems') || '[]';
const b = JSON.parse(a);

export const initialState: CartState = {
  cartItems: b,
};

export const cartReducer1 = {
  cartItems: CartReducer,
};
