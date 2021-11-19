import { IBuyInCashType, IP2PCurrency } from "./customType";


export function getBuyInCurrency(e: IP2PCurrency): IBuyInCashType {
    if (e == 'CASH') {
        return 'REAL_CASH';
    }
    return e as IBuyInCashType;
}