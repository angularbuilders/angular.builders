import { DirectStoreService } from './direct-store.service';

interface Item {
  id: string;
  name: string;
}

class ItemsStore extends DirectStoreService<Item[]> {
  constructor() {
    super([]);
  }
  addItem(item: Item) {
    const currentItems = this.state;
    currentItems.push(item);
    this.state = currentItems;
  }
}

fdescribe('DirectStoreService', () => {
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
});
