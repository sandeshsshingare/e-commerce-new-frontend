import { createReducer, on } from '@ngrx/store';
import { initialState } from './cart.state';
import {
  addProduct,
  quantityChange,
  removeAllProduct,
  removeProduct,
} from './cart.action';
export const cartReducer = createReducer(
  initialState,

  on(addProduct, (state, action) => {
    console.log('add product called');
    let a: any = { ...action };
    localStorage.setItem('cartItems', JSON.stringify([...state.cartItems, a]));
    return { ...state, cartItems: [...state.cartItems, a] };
  }),
  on(quantityChange, (state, action: any) => {
    console.log('reducer action is', action);
    let allItemsFromLocal = JSON.parse(
      localStorage.getItem('cartItems') || '[]'
    );

    let arr = allItemsFromLocal.map((element: any, index: number) => {
      if (element.cartObj.productId === action.productId) {
        element.cartObj.qty = action.quantity;
        element.cartObj.subTotal = action.quantity * element.cartObj.price;
        return element;
      }
      return element;
    });
    localStorage.setItem('cartItems', JSON.stringify(arr));

    return { ...state, cartItems: arr };
  }),

  on(removeProduct, (state, action: any) => {
    let allItemsFromLocal = JSON.parse(
      localStorage.getItem('cartItems') || '[]'
    );

    let filteredData = allItemsFromLocal.filter(
      (data: any) => data.cartObj.productId !== action.productId
    );
    localStorage.setItem('cartItems', JSON.stringify(filteredData));

    return { ...state, cartItems: filteredData };
  }),
  on(removeAllProduct, (state, action) => {
    let arr: any[] = [];
    localStorage.removeItem('cartItems');
    return { ...state, cartItems: arr };
  })
);

export function CartReducer(state: any, action: any) {
  return cartReducer(state, action);
}
