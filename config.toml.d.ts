export type Purchase = {
  username: string;
  deducted: number;
  for: string;
};
export type Stop = {
  usernames: string[];
  name: string;
  slug: string;
};
export type Item = {
  id: string;
  name: string;
  price: number;
};
export type Config = {
  item: Item[];
  stop: Stop[];
  buy: Purchase[];
};
declare const exports: Config;
export default exports;
