// 类型推断 简化代码
var myAdd;
// myAdd = function (a: number, b: number): number {
myAdd = function (a, b) {
    return a + b;
};
console.log(myAdd(2, 5));
// 参数: 可选， 默认， （剩余参数 ...）
var buildName;
buildName = function (firstName, lastName, extraName) {
    if (lastName === void 0) { lastName = 'Smith'; }
    return firstName + " " + lastName + " " + (extraName || '');
};
var res0 = buildName('bob');
var res1 = buildName('bob', undefined); // 可以明确传 undefined 占位
var res2 = buildName('bob', 'j');
var res3 = buildName('bob', 'j', 'amy');
console.log(res0, res1, res2, res3);
// this
var deck = {
    suits: ['heart', 'spades', 'clubs', 'dismonds'],
    cards: Array(52),
    createCardPicker: function () {
        // 这里用箭头函数也行，因为调用 pickedCard 是全局的
        var that = this;
        return function () {
            var pickedCard = Math.floor(Math.random() * 52);
            var pickedSuid = pickedCard / 13 | 0; // 取整
            return {
                suit: that.suits[pickedSuid],
                card: pickedCard % 13 // 取余
            };
        };
    }
};
var cardPicker = deck.createCardPicker();
var pickedCard = cardPicker();
console.log("card: " + pickedCard.card + " of " + pickedCard.suit + ".");
var deck2 = {
    suits: ['heart', 'spades', 'clubs', 'dismonds'],
    cards: Array(52),
    createCardPicker: function () {
        var _this = this;
        return function () {
            var pickedCard = Math.floor(Math.random() * 52);
            var pickedSuid = pickedCard / 13 | 0; // 取整
            return {
                suit: _this.suits[pickedSuid],
                card: pickedCard % 13 // 取余
            };
        };
    }
};
var cardPicker2 = deck2.createCardPicker();
var pickedCard2 = cardPicker2();
console.log("card: " + pickedCard2.card + " of " + pickedCard2.suit + ".");
var Handler = /** @class */ (function () {
    function Handler() {
    }
    Handler.prototype.onClickBad = function (e) {
    };
    return Handler;
}());
