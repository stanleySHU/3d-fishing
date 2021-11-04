export function parse(str: string): Object {
    let ret = Object.create(null);
    str = str.trim().replace(/^(\?|#|&)/, "");
    if (!str) {
      return ret;
    }
    str.split("&").forEach(param => {
      let parts = param.replace(/\+/g, " ").split("=");
      let key = parts.shift();
      let val = parts.length > 0 ? parts.join("=") : undefined;
      key = decodeURIComponent(key);
      val = val === undefined ? null : decodeURIComponent(val);
      if (ret[key] === undefined) {
        ret[key] = val;
      } else if (Array.isArray(ret[key])) {
        ret[key].push(val);
      } else {
        ret[key] = [ret[key], val];
      }
    });
    return ret;
  }
  
  export function from(args: Object): string {
    let queryString = "";
    let argCount = 0;
    for (let key in args) {
      if (args[key]) {
        if (argCount++) {
          queryString += "&";
        }
        queryString += encodeURIComponent(key) + "=" + encodeURIComponent(args[key]);
      }
    }
    return queryString;
  }
  
  export function toString(queryString?: any) {
    if (queryString === undefined) queryString = get();
    return `${window.location.protocol}//${window.location.host}${window.location.pathname}?` + from(queryString);
  }
  
  export function getDomainByUrl(url: string) {
    return url.split('?')[0];
  }
  
  export function getParamsByUrl(url: string) {
    return this.parse(extract(url));
  }
  
  export function getUrl(domain: string, params) {
    return domain + '?' + from(params);
  }
  
  export function get() {
    return parse(window.location.search);
  }
  
  export function setParameter(paramName, paramValue) {
    let queryString = get();
    queryString[paramName] = paramValue;
    return toString(queryString);
  }
  
  export function getParameter(k: string, v?): string {
    let queryString = get();
    return queryString[k] ? queryString[k] : v;
  }
  
  function extract(str: string) {
    return str.split("?")[1] || "";
  }
  
  
  
  