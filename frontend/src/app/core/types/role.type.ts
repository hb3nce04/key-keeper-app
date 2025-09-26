import {Page} from './page.type';

export type TableOperation = 'create' | 'update' | 'delete';
export type Operation = TableOperation | 'view';

export type Can = {
  [M in Page]: {
    [O in Operation]?: boolean;
  };
};

export type TableCan = {
  [O in TableOperation]?: boolean;
}
