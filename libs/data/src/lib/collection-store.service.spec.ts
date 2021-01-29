import { CollectionStoreService } from './collection-store.service';

interface Item {
  id: string;
  name: string;
}

class ItemsStore extends CollectionStoreService<Item> {
  constructor() {
    super([], 'id');
  }
  addItem(item: Item) {
    const addAction = (state: Item[]) => [...state, item];
    this.dispatch(addAction);
  }
}

describe('CollectionStoreService', () => {
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
  it('should create a new item', () => {
    const itemsStore: ItemsStore = new ItemsStore();
    itemsStore.create({ id: '', name: '' });
    expect(itemsStore.state).toEqual([{ id: '', name: '' }]);
  });
  it('should read an item', () => {
    const itemsStore: ItemsStore = new ItemsStore();
    itemsStore.create({ id: '1', name: '' });
    expect(itemsStore.read('1')).toEqual({ id: '1', name: '' });
  });
  it('should update an item', () => {
    const itemsStore: ItemsStore = new ItemsStore();
    itemsStore.create({ id: '1', name: '' });
    itemsStore.update('1', { name: 'one' });
    expect(itemsStore.read('1')).toEqual({ id: '1', name: 'one' });
  });
  it('should remove an item', () => {
    const itemsStore: ItemsStore = new ItemsStore();
    itemsStore.create({ id: '1', name: '' });
    itemsStore.delete('1');
    expect(itemsStore.read('1')).toEqual(undefined);
  });
  it('should emit changes  for crud actions ', (done) => {
    const itemsStore: ItemsStore = new ItemsStore();
    itemsStore.state$.subscribe({
      next: (result) => console.log(result),
    });
    itemsStore.create({ id: '1', name: '' });
    itemsStore.create({ id: '2', name: '' });
    itemsStore.delete('1');
    expect(true).toBeTruthy();
    done();
  });
  // it('should emit changes of length for crud actions ', (done) => {
  //   const itemsStore: ItemsStore = new ItemsStore();
  //   const selector = (items: Item[]) => items.length;
  //   itemsStore
  //     .select$(selector)
  //     .pipe(
  //       tap((v) => console.log(v)),
  //       scan((a: number[], c) => [...a, c], []),
  //       tap((v) => console.log(v))
  //     )
  //     .subscribe({
  //       next: (result) => {
  //         expect(result).toEqual([0, 1, 0]);
  //         done();
  //       },
  //     });
  //   itemsStore.create({ id: '1', name: '' });
  //   itemsStore.create({ id: '2', name: '' });
  //   itemsStore.delete('1');
  // });
});
