export interface AnyObject<T = any> {
  [key: string | number | symbol]: T;
}
