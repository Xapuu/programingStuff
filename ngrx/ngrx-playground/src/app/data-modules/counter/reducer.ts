import { state } from '@angular/animations';
import { ActionCreator, createReducer, on } from '@ngrx/store';
import { decrementSuccess, incrementSuccess, reset } from './coutner.actions';

export interface CounterState {
    count: number;
}

export const initialState = {
    count: 0
};
 
const _counterReducer = createReducer(
  initialState,
  on(incrementSuccess, (state) => ({...state, count: state.count + 1})),
  on(decrementSuccess, (state) => ({...state, count: state.count - 1})),
  on(reset, (state) => initialState)
);
 
export function counterReducer(state: CounterState, action: ActionCreator) {
  return _counterReducer(state, action);
}