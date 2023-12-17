export interface Pagination<T> {
  /* The page number */
  page: number;

  /* Number of items on each page */
  limit: number;

  /* Total number of items */
  total: number;

  /* The items for the current page */
  data: T[];
}

export interface PaginateParams {
  currentPage: number;
  rowsPerPage: number;
}
