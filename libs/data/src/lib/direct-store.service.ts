import { BehaviorSubject } from 'rxjs';

export class DirectStoreService<StateType> {
  protected readonly stateSubject$ = new BehaviorSubject<StateType>(
    this.initialState
  );
  readonly state$ = this.stateSubject$.asObservable();
  get state(): StateType {
    return this.deepClone(this.stateSubject$.value);
  }
  set state(newState: StateType) {
    // ToDo: write to local storage
    this.stateSubject$.next(this.deepClone(newState));
  }

  constructor(private readonly initialState: StateType) {
    // ToDo: read from local storage
  }

  private deepClone(source: StateType): StateType {
    // ToDo: optimize using fast-deep-clone
    const sourceString = JSON.stringify(source);
    return JSON.parse(sourceString);
  }
}
