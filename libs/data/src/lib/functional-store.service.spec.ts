import { FunctionalStoreService } from './functional-store.service';

interface Item {
  id: string;
  name: string;
}

class ItemsStore extends FunctionalStoreService<Item[]> {
  constructor() {
    super([]);
  }
  addItem(item: Item) {
    const addAction = (state: Item[]) => [...state, item];
    this.dispatch(addAction);
  }
}

fdescribe('FunctionalStoreService', () => {
  it('should be extendible', () => {
    const itemsStore: ItemsStore = new ItemsStore();
    expect(itemsStore).toBeTruthy();
  });
  it('should have initial state', () => {
    const itemsStore: ItemsStore = new ItemsStore();
    expect(itemsStore.state).toEqual([]);
  });
  it('should add a new item', () => {
    const itemsStore: ItemsStore = new ItemsStore();
    itemsStore.addItem({ id: '', name: '' });
    expect(itemsStore.state).toEqual([{ id: '', name: '' }]);
  });
  it('should emit changes', (done) => {
    const itemsStore: ItemsStore = new ItemsStore();
    itemsStore.addItem({ id: '', name: '' });
    itemsStore.state$.subscribe({
      next: (result) => expect(result).toEqual([{ id: '', name: '' }]),
      complete: done(),
    });
  });
  it('should emit changes on a full selection', (done) => {
    const itemsStore: ItemsStore = new ItemsStore();
    itemsStore.addItem({ id: '', name: '' });
    const selector = (items: Item[]) => items;
    itemsStore.select$(selector).subscribe({
      next: (result) => expect(result).toEqual([{ id: '', name: '' }]),
      complete: done(),
    });
  });
  it('should emit changes of length ', (done) => {
    const itemsStore: ItemsStore = new ItemsStore();
    itemsStore.addItem({ id: '', name: '' });
    const selector = (items: Item[]) => items.length;
    itemsStore.select$(selector).subscribe({
      next: (result) => expect(result).toEqual(1),
      complete: done(),
    });
  });
});
