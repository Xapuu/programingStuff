import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action, ActionCreator } from "@ngrx/store";
import { of } from "rxjs";
import { mergeMap, map, catchError } from "rxjs/operators";
import { decrement, decrementFailed, decrementSuccess, increment, incrementFailed, incrementSuccess } from "./coutner.actions";

@Injectable()
export class CounterEffects {

    increment$ = createEffect(() => this.actions$.pipe(
        ofType(increment),
        mergeMap(() => of(true)
            .pipe(
                map((_val) => incrementSuccess()),
                catchError(() => [incrementFailed()])
            ))
    )
    );

    decrement$ = createEffect(() => this.actions$.pipe(
        ofType(decrement),
        mergeMap(() => of(true)
            .pipe(
                map((_val) => decrementSuccess()),
                catchError(() => [decrementFailed()])
            ))
    )
    );

    constructor(
        private actions$: Actions,
    ) { 
        console.log('registered')
    }
}