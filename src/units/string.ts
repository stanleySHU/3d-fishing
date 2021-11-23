export const firstUpperCase = (str: string): string => { return str.charAt(0).toUpperCase() + str.slice(1); }

export const padStart = (num: number | string, length: number) => {
    let str = num.toString();
    return new Array(length - str.length + 1).join("0") + str;
  }