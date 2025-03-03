export type example = {
  keyName: string;
  optionalKey?: string;
};
export interface StockMetaData {
  symbol: string,
  interval: string,
  currency: string,
  exchange_timezone: string,
  exchange: string,
  mic_code: string,
  type: string
}
export interface StockValue {
  datetime: string,
  open: string,
  high: string,
  low: string,
  close: string,
  volume: string
}
export interface StockData {
  meta: StockMetaData,
  values: StockValue[],
  status: string
}