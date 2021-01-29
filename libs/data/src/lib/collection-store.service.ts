import { Injectable } from '@angular/core';
import { FunctionalStoreService } from './functional-store.service';

@Injectable({
  providedIn: 'root',
})
export class CollectionStoreService<
  ElementsType
> extends FunctionalStoreService<ElementsType[]> {
  constructor(
    initialState: ElementsType[],
    private keyName: keyof ElementsType
  ) {
    super(initialState);
  }

  create(newValue: ElementsType) {
    const addAction = (state: ElementsType[]) => [...state, newValue];
    this.dispatch(addAction);
  }
  read(keyValue: unknown): ElementsType | undefined {
    const currentState = this.state;
    return this.findByKey(currentState, keyValue);
  }
  update(keyValue: unknown, changed: Partial<ElementsType>) {
    const udpateAction = (state: ElementsType[]) => {
      const currentItem = this.findByKey(state, keyValue);
      if (currentItem) {
        Object.assign(currentItem, changed);
      }
      return state;
    };
    this.dispatch(udpateAction);
  }
  delete(keyValue: unknown) {
    const deleteAction = (state: ElementsType[]) =>
      state.filter((element) => element[this.keyName] !== keyValue);
    this.dispatch(deleteAction);
  }

  private findByKey(
    state: ElementsType[],
    keyValue: unknown
  ): ElementsType | undefined {
    return state.find((element) => element[this.keyName] === keyValue);
  }
}
