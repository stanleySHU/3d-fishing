import { IBuyInCashType, IP2PCurrency } from "./customType";
import { Decimal } from 'decimal.js';

export function getBuyInCurrency(e: IP2PCurrency): IBuyInCashType {
    if (e == 'CASH') {
        return 'REAL_CASH';
    }
    return e as IBuyInCashType;
}

export function getFCChipAmount(amount: number, mul: number = 1000): string {
    return `${Decimal.mul(amount, mul).toPrecision(2, 0)}`;
}