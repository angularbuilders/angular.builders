import { skip } from 'rxjs/operators';
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

class ItemStore extends FunctionalStoreService<Item> {
  constructor() {
    super({ id: '1', name: '1' });
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
      next: (result) => {
        expect(result).toEqual([{ id: '', name: '' }]);
        done();
      },
    });
  });
  it('should emit changes on a full selection', (done) => {
    const itemsStore: ItemsStore = new ItemsStore();
    itemsStore.addItem({ id: '', name: '' });
    const selector = (items: Item[]) => items;
    itemsStore.select$(selector).subscribe({
      next: (result) => {
        expect(result).toEqual([{ id: '', name: '' }]);
        done();
      },
    });
  });
  it('should emit changes of length', (done) => {
    const itemsStore: ItemsStore = new ItemsStore();
    itemsStore.addItem({ id: '', name: '' });
    const selector = (items: Item[]) => items.length;
    itemsStore.select$(selector).subscribe({
      next: (result) => {
        expect(result).toEqual(1);
        done();
      },
    });
  });
  it('should be used with single objects', (done) => {
    const itemStore: ItemStore = new ItemStore();
    const selector = (item: Item) => item.name;
    itemStore
      .select$(selector)
      .pipe(skip(1))
      .subscribe({
        next: (result) => {
          expect(result).toEqual('changed');
          done();
        },
      });
    itemStore.dispatch((item) => ({ ...item, name: 'changed' }));
  });
});
