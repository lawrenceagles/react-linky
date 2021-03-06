import { memo, createElement, Fragment, isValidElement, cloneElement } from 'react';

var domainRegex = /(?<![@#\-\w])(http(?:s)?:\/\/)?((?:[\w.-]+)(?:\.[\w.-]+))+([/\w?.\-=&:#]*)/gi;
var emailRegex = /(([a-zA-Z0-9._-]+)@([\w.-]+))/gi;
var Parse = function (_a) {
    var text = _a.text, email = _a.email, className = _a.className;
    var textList = text.split(" ");
    var contents = textList.reduce(function (list, part) {
        var domainPart = part.match(domainRegex);
        var emailPart = email && part.match(emailRegex);
        var item = part;
        if (part.length === 0) {
            item = " ";
        }
        else if (!!domainPart) {
            var withoutHTTP = part.indexOf("https://") === -1 || part.indexOf("http://") === -1;
            var safeURL = withoutHTTP ? "http://" + part : part;
            item = (createElement("a", { href: safeURL, className: className }, part));
        }
        else if (!!emailPart) {
            item = (createElement("a", { href: "mailto:" + part, className: className }, part));
        }
        var lastChild = list[list.length - 1];
        if (list.length === 0) {
            list.push(item);
        }
        else if (typeof lastChild === "string") {
            if (typeof item === "string") {
                list[list.length - 1] = lastChild + " " + item;
            }
            else {
                list[list.length - 1] = lastChild + " ";
                list.push(item);
            }
        }
        else {
            if (typeof item === "string") {
                list.push(" " + item);
            }
            else {
                list.push(" ");
                list.push(item);
            }
        }
        return list;
    }, []);
    return createElement(Fragment, null, contents);
};
var Parse$1 = memo(Parse);

var Linky = function (_a) {
    var children = _a.children, className = _a.className, _b = _a.email, email = _b === void 0 ? true : _b;
    if (typeof children === "string") {
        return createElement(Parse$1, { email: email, className: className, text: children });
    }
    else if (isValidElement(children) &&
        children.type !== "a" &&
        children.type !== "button") {
        return cloneElement(children, undefined, createElement(Linky, { email: email, className: className }, children.props.children));
    }
    else if (Array.isArray(children)) {
        return (createElement(Fragment, null, children.map(function (child) { return (createElement(Linky, { email: email, className: className }, child)); })));
    }
    return createElement(Fragment, null, children);
};

export default Linky;
