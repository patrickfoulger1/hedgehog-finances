import { Prisma } from "@prisma/client";

export type Watchlist = Prisma.WatchlistCreateInput;
export type User = Prisma.UserCreateInput;

export interface WatchlistStock {
    addedAt: Date;
    id: string;
    stockSymbol: string;
    userId: string;
}
export interface StockMetaData {
    symbol: string;
    interval: string;
    currency: string;
    exchange_timezone: string;
    exchange: string;
    mic_code: string;
    type: string;
}
export interface StockValue {
    datetime: string;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
}
export interface StockData {
    meta: StockMetaData;
    values: StockValue[];
    status: string;
}
export interface DividendInformation {
    symbol: String;
    date: String;
    recordDate: String;
    paymentDate: String;
    declarationDate: String;
    adjDividend: Number;
    dividend: Number;
    yield: Number;
    frequency: String;
}

export interface StockError {
    error: any;
    symbol: string;
}

export interface FailedStockFetch {
    status: string;
    reason: StockError;
}

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name?: string | null;
            email: string;
            image?: string | null;
        };
    }
}

export interface Tab {
    label: string;
    filter: { tags: string[] };
}
[] = [];
