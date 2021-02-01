import { Item } from '../../../core/models/Item';

export interface Search {
  params: {
    term: string;
    sortBy: string;
  };
  results: {
    data: Item[];
  };
  status: {
    type: string;
    message: string;
  };
}
