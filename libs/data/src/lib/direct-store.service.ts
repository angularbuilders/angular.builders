import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DirectStoreService<T> {
  private readonly stateSubject$ = new BehaviorSubject<T>(this.initialState);
  readonly state$ = this.stateSubject$.asObservable();
  get state(): T {
    return this.deepClone(this.stateSubject$.value);
  }
  set state(newState: T) {
    this.stateSubject$.next(this.deepClone(newState));
  }

  constructor(private readonly initialState: T) {}

  private deepClone(source: T): T {
    if (Array.isArray(source)) {
      return ([...source] as unknown) as T;
    } else {
      return { ...source };
    }
  }
}
