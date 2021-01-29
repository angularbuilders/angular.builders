import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DirectStoreService<StateType> {
  protected readonly stateSubject$ = new BehaviorSubject<StateType>(
    this.initialState
  );
  readonly state$ = this.stateSubject$.asObservable();
  get state(): StateType {
    return this.deepClone(this.stateSubject$.value);
  }
  set state(newState: StateType) {
    this.stateSubject$.next(this.deepClone(newState));
  }

  constructor(private readonly initialState: StateType) {}

  protected deepClone(source: StateType): StateType {
    if (Array.isArray(source)) {
      return ([...source] as unknown) as StateType;
    } else {
      return { ...source };
    }
  }
}
