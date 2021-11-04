export function debounce(func, wait = 0) {
    let timeid = null;
    let result;
    return function () {
        let context = this;
        let args = arguments;
        if (timeid) {
            clearTimeout(timeid);
        }
        timeid = setTimeout(function () {
            result = func.apply(context, args);
        }, wait);
        return result;
    }
}

export function throttle(func, delay) {
    var timer = null;
    return function () {
        var context = this;
        var args = arguments;
        if (!timer) {
            timer = setTimeout(function () {
                func.apply(context, args);
                timer = null;
            }, delay);
        }
    }
}