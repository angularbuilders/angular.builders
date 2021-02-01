import { queueScheduler } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { DirectStoreService } from './direct-store.service';
type Action<StateType> = (state: StateType) => StateType;

export class FunctionalStoreService<
  StateType
> extends DirectStoreService<StateType> {
  constructor(initialState: StateType, mustCloneDeep = true) {
    super(initialState, mustCloneDeep);
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
      distinctUntilChanged(this.areEqual.bind(this))
    );
  }

  private areEqual<SelectionType>(a: SelectionType, b: SelectionType) {
    if (this.mustCloneDeep) {
      const aJson = JSON.stringify(a);
      const bJson = JSON.stringify(b);
      return aJson === bJson;
    } else {
      return a === b;
    }
  }
}
