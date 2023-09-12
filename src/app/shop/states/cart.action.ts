import { createAction, props } from '@ngrx/store';

export const addProduct = createAction(
  '[one product] add product',
  props<{ cartObj: any }>()
);

export const quantityChange = createAction(
  '[one product] quantity change',
  props<{ productId: string; quantity: number }>()
);

export const removeProduct = createAction(
  '[one product], remove product from cart',
  props<{ productId: any }>()
);

export const removeAllProduct = createAction(
  '[one product], remove all product from cart'
);
