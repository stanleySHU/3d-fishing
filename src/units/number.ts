export function moneyFormat(amount: number, decimals: number = 2, dec_point: string = '.', thousands_sep: string = ',', roundtag: 'ceil' | 'floor' | 'round' = 'floor') {
    let value = `${amount}`.replace(/[^0-9+-Ee.]/g, '');
    var n = !isFinite(+value) ? 0 : +value,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        toFixed = function (n, prec) {
            var k = Math.pow(10, prec);
            return `${parseFloat(Math[roundtag](parseFloat((n * k).toFixed(prec*2))).toFixed(prec*2)) / k}`;
        };
    let s = (prec ? toFixed(n, prec) : '' + Math.round(n)).split('.');
    var re = /(-?\d+)(\d{3})/;
    while (re.test(s[0])) {
        s[0] = s[0].replace(re, '$1' + thousands_sep + '$2');
    }

    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec_point);
}