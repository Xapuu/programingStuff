import { createAction } from '@ngrx/store';

export const increment = createAction('[Counter Component] Increment');
export const incrementSuccess = createAction('[Counter Component] Increment Success');
export const incrementFailed = createAction('[Counter Component] Increment Failed');

export const decrement = createAction('[Counter Component] Decrement');
export const decrementSuccess = createAction('[Counter Component] Decrement Success');
export const decrementFailed = createAction('[Counter Component] Decrement Failed');
export const reset = createAction('[Counter Component] Reset');