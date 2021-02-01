import { BehaviorSubject } from 'rxjs';

export class DirectStoreService<StateType> {
  protected readonly stateSubject$ = new BehaviorSubject<StateType>(
    this.initialState
  );
  readonly state$ = this.stateSubject$.asObservable();
  get state(): StateType {
    return this.mustCloneDeep
      ? this.deepClone(this.stateSubject$.value)
      : { ...this.stateSubject$.value };
  }
  set state(newState: StateType) {
    this.mustCloneDeep
      ? this.stateSubject$.next(this.deepClone(newState))
      : this.stateSubject$.next({ ...newState });
  }

  constructor(
    private readonly initialState: StateType,
    protected readonly mustCloneDeep = true
  ) {}

  private deepClone(source: StateType): StateType {
    // ToDo: optimize deep clone
    const sourceJson = JSON.stringify(source);
    return JSON.parse(sourceJson);
  }
}
