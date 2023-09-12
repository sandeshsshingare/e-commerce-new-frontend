import { cartReducer } from '../states/cart.reducer';
import { CartState } from '../states/cart.state';

export interface appState {
  cart: CartState;
}

export const appReducer = {
  cart: cartReducer,
};
