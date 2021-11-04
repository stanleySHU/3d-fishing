import { Languages } from "./customType";
import { getParameter } from "./queryString"
import is from 'is_js';
import { IAuthOptions } from "../services/base";
import { nowMillis } from "./date";
import { isBlank } from "./lang";

const getOperator = () => {
    let op = getParameter('op');
    return op === "w88" ? "1" : op;
}

const getLanguage = () => {
    let lang = getParameter("lang", Languages.English);
    switch (true) {
        case (lang.indexOf("us") >= 0):
        case (lang.indexOf("en") >= 0): lang = Languages.English; break;
        case (lang.indexOf("cn") >= 0):
        case (lang.indexOf("zh") >= 0):
        case (lang.indexOf("zn") >= 0):
        case (lang.indexOf("cs") >= 0): lang = Languages.Chinese; break;
        case (lang.indexOf("th") >= 0): lang = Languages.Thai; break;
        case (lang.indexOf("vi") >= 0):
        case (lang.indexOf("vn") >= 0): lang = Languages.Vietnamese; break;
        case (lang.indexOf("ko") >= 0):
        case (lang.indexOf("kr") >= 0): lang = Languages.Korean; break;
        case (lang.indexOf("km") >= 0):
        case (lang.indexOf("kh") >= 0): lang = Languages.Khmer; break;
        case (lang.indexOf("id") >= 0): lang = Languages.Indonesian; break;
        case (lang.indexOf("ja") >= 0):
        case (lang.indexOf("jp") >= 0): lang = Languages.Japanese; break;
        default: lang = Languages.English;
    }
    return lang;
}

const getPlatform = () => {
    let platform = "HTML5";
    if (is.mobile() || is.tablet()) {
        if (is.android()) {
            platform = "HTML5_ANDROID";
        } else if (is.windowsPhone()) {
        } else {
            platform = "HTML5_IOS";
        }
    } else if (is.desktop()) {
        platform = "HTML5_DESKTOP";
    }
    return platform;
}

export type IAppContextModel = {
    getAuthParams: () => IAuthOptions
}

export const createAppContext = (): IAppContextModel => {
    const username = getParameter('username'),
        password = getParameter('password'),
        token = getParameter('token') || getParameter('s'),
        operator = getOperator(),
        language = getLanguage(),
        platform = getPlatform(),
        funplay = getParameter('fun', '1') === '1';

    const getAuthParams = (): IAuthOptions => {
        let params: IAuthOptions = {
                operatorCode: "1",
                _platform: platform,
                v: nowMillis()
            };
        if (funplay || (isBlank(token) && isBlank(username))) {
            params["accessToken"] = "W88_Trial";
        } else {
            params.operatorCode = operator;
            if (isBlank(username)) {
                params["accessToken"] = token;
            } else {
                params["username"] = username;
                params["password"] = password;
            }
        }
        return params;
    }

    return {
        getAuthParams: getAuthParams
    }
}