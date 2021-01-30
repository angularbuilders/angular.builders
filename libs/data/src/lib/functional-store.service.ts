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
    const state = this.state;
    queueScheduler.schedule(() => this.executeAction(action, state));
  }

  private executeAction(action: Action<StateType>, state: StateType) {
    const newState = action(state);
    // ToDo: write to an instumental log
    this.state = newState;
  }

  public select$<SelectionType>(selector: (state: StateType) => SelectionType) {
    return this.state$.pipe(
      map<StateType, SelectionType>(selector),
      distinctUntilChanged()
      // distinctUntilChanged(this.areEqual)
    );
  }

  private areEqual<SelectionType>(a: SelectionType, b: SelectionType) {
    const aString = JSON.stringify(a);
    const bString = JSON.stringify(b);
    const areEqual = aString === bString;
    return areEqual;
  }
}
