import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { decrement, increment } from "./coutner.actions";

@Injectable({ providedIn: 'root' })
export class CounterModel {

    couter$ = this.store.pipe(select((state) => state.count))

    increment() {
        this.store.dispatch(increment())
    }

    decrement() {
        this.store.dispatch(decrement())
    }



    constructor(private store: Store) { }
}