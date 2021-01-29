import { queueScheduler } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { DirectStoreService } from './direct-store.service';
type Action<StateType> = (state: StateType) => StateType;

export class FunctionalStoreService<
  StateType
> extends DirectStoreService<StateType> {
  constructor(initialState: StateType) {
    super(initialState);
  }

  public dispatch(action: Action<StateType>) {
    queueScheduler.schedule(() => this.executeAction(action));
  }

  private executeAction(action: Action<StateType>) {
    const currentState = this.state;
    const newState = action(currentState);
    if (this.changesState(newState)) {
      this.state = newState;
    }
  }

  public select$<SelectionType>(selector: (state: StateType) => SelectionType) {
    return this.state$.pipe(
      map<StateType, SelectionType>(selector),
      distinctUntilChanged()
    );
  }

  private changesState(newState: StateType): boolean {
    const newStateString = JSON.stringify(newState);
    const stateString = JSON.stringify(this.state);
    return newStateString != stateString;
  }
  private areEqual<SelectionType>(a: SelectionType, b: SelectionType) {
    const aString = JSON.stringify(a);
    const bString = JSON.stringify(b);
    const areEqual = aString === bString;
    return areEqual;
  }
}
