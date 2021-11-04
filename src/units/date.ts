export type IMonth = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export function create(year: number, month: number = 1, day: number = 1, hour: number = 0,
  minutes: number = 0, seconds: number = 0, milliseconds: number = 0): Date {
  return new Date(year, month - 1, day, hour, minutes, seconds, milliseconds);
}
export function fromISOString(str: string): Date { return new Date(str); }
export function fromMillis(ms: number): Date { return new Date(ms); }
export function toMillis(date: Date): number { return date.getTime(); }
export function now(): Date { return new Date(); }
export function nowMillis(): number { return now().getTime(); }
export function toJson(date: Date): string { return date.toJSON(); }
// export function getTimeStrInGMT(gmt, timeonly?:boolean) {  
//   let date = now();
//   let hours = date.getUTCHours()+gmt;
//   if(hours > 23) hours = hours-24;
//   let mins = date.getUTCMinutes();
//   let secs = date.getSeconds();
//   let time = pad(hours,2) + ':' + pad(mins,2);
//   if(timeonly) return time + ' (+'+gmt+')';
//   return time + ':' + pad(secs,2) + ' (GMT+'+gmt+')';
// }

export function format(date: Date, format: string) {
  let map = {
    'M': date.getMonth() + 1, 
    'd': date.getDate(), 
    'h': date.getHours(), 
    'm': date.getMinutes(),
    's': date.getSeconds(),
    'q': Math.floor((date.getMonth() + 3) / 3), 
    'S': date.getMilliseconds() 
  };
  format = format.replace(/([yMdhmsqS])+/g, function (all, t) {
    var v = map[t];
    if (v !== undefined) {
      if (all.length > 1) {
        v = '0' + v;
        v = v.substr(v.length - 2);
      }
      return v;
    } else if (t === 'y') {
      return (date.getFullYear() + '').substr(4 - all.length);
    }
    return all;
  });
  return format;
}