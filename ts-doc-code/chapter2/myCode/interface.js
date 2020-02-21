function createSquare(config) {
    var square = { color: 'white', 'area': 666 };
    if (config.color) {
        square.color = config.color;
    }
    if (config.width) {
        square.area = Math.pow(config.width, 2);
    }
    return square;
}
console.log(createSquare({}));
console.log(createSquare({ color: 'red', width: 4 }));
console.log(createSquare({ width: 4 }));
console.log(createSquare({ color: 'red' }));
// 只读
var list = [1, 2, 3, 4];
var roList = list;
var anyList = roList; // 类型断言
var mySearch = function (src, sub) {
    return src.search(sub) !== -1;
};
console.log(mySearch('12345', '234'));
console.log(mySearch('12345', '2344'));
var myArray = ['Bob', 'Lucy'];
console.log(myArray['0']);
var createClock = function (ctor, min, sec) {
    return new ctor(min, sec);
};
var DigitalClock = /** @class */ (function () {
    function DigitalClock(m, s) {
    } // 构造函数不受接口约束
    DigitalClock.prototype.click = function () {
        console.log('beep beep');
    };
    return DigitalClock;
}());
var AnalogClock = /** @class */ (function () {
    function AnalogClock(m, s) {
    }
    AnalogClock.prototype.click = function () {
        console.log('ding ding');
    };
    return AnalogClock;
}());
var digital = createClock(DigitalClock, 'fff2', 17); // 工厂模式构造
var analog = createClock(AnalogClock, 'fff2', 32);
digital.click();
analog.click();
