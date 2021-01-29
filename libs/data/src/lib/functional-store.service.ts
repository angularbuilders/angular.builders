import { Injectable } from '@angular/core';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { DirectStoreService } from './direct-store.service';
@Injectable({
  providedIn: 'root',
})
export class FunctionalStoreService<
  StateType
> extends DirectStoreService<StateType> {
  constructor(initialState: StateType) {
    super(initialState);
  }

  public dispatch(action: (state: StateType) => StateType) {
    const currentState = this.deepClone(this.stateSubject$.value);
    const newState = action(currentState);
    this.stateSubject$.next(this.deepClone(newState));
  }

  public select$<SelectionType>(selector: (state: StateType) => SelectionType) {
    return this.stateSubject$.pipe(
      map<StateType, SelectionType>(selector),
      distinctUntilChanged()
    );
  }
}
