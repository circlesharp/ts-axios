var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
for (var i = 0; i < 10; i++) {
    (function (i) {
        setTimeout(function () {
            console.log(i);
        }, i * 100);
    })(i); // 立即执行的闭包，内部的函数可以使用内部的变量
}
var obj = {
    food: 1,
    good: 2,
    bar: 3,
    foo: 4
};
var loo = __assign({}, obj); // 需要一个容器承载 
console.log(loo);
