// 类型推断 简化代码
let myAdd: (baseVal: number, increment: number) => number
// myAdd = function (a: number, b: number): number {
myAdd = function (a, b)  {
  return a + b
}

console.log(myAdd(2, 5))


// 参数: 可选， 默认， （剩余参数 ...）
let buildName: (firstName: string, lastName?: string, extraName?: string) => string
buildName = (firstName, lastName = 'Smith', extraName) => {
  return `${firstName} ${lastName} ${extraName || ''}`
}

let res0 = buildName('bob')
let res1 = buildName('bob', undefined) // 可以明确传 undefined 占位
let res2 = buildName('bob', 'j')
let res3 = buildName('bob', 'j', 'amy')

console.log(res0, res1, res2, res3)


// this
let deck = {
  suits: ['heart', 'spades', 'clubs', 'dismonds'],
  cards: Array(52),
  createCardPicker: function () {
    // 这里用箭头函数也行，因为调用 pickedCard 是全局的
    let that = this
    return function () {
      let pickedCard = Math.floor(Math.random() * 52)
      let pickedSuid = pickedCard / 13 | 0 // 取整
      return {
        suit: that.suits[pickedSuid],
        card: pickedCard % 13 // 取余
      }
    }
  }
}

let cardPicker = deck.createCardPicker()
let pickedCard = cardPicker()
console.log(`card: ${pickedCard.card} of ${pickedCard.suit}.`)


// 重构deck
interface Card {
  suit: string
  card: number
}

interface Deck {
  suits: string[]
  cards: number[]
  createCardPicker (this: Deck): () => Card
}

let deck2: Deck = {
  suits: ['heart', 'spades', 'clubs', 'dismonds'],
  cards: Array(52),
  createCardPicker: function (this: Deck) { // 显式指定 this, 还得使用箭头函数
    return () => {
      let pickedCard = Math.floor(Math.random() * 52)
      let pickedSuid = pickedCard / 13 | 0 // 取整
      return {
        suit: this.suits[pickedSuid],
        card: pickedCard % 13 // 取余
      }
    }
  }
}

let cardPicker2 = deck2.createCardPicker()
let pickedCard2 = cardPicker2()
console.log(`card: ${pickedCard2.card} of ${pickedCard2.suit}.`)


// 回调函数中使用 this
interface UIElement {
  addClickListener (onclick: (this: void, e: Event) => void): void
}

class Handler {
  type: string
  onClickBad = (e: Event) => { // 如果接口约定了this, 用箭头函数解决 
    this.type = e.type
  }
}

let h = new Handler()

let uiElement: UIElement = {
  addClickListener() {

  }
}

uiElement.addClickListener(h.onClickBad)


// 重载: 参数和返回值都会不一样
let suits = ['heart', 'spades', 'clubs', 'dismonds']

// 2次重载
// { suit: string, card: number }[] -> 表示是一个数组，项是这个样子的对象
function pickedCard3(x: { suit: string, card: number }[]): number
function pickedCard3(x: number): { suit: string, card: number }

// 重载函数从实现
function pickedCard3 (x): any {
  if (Array.isArray(x)) {
    let pickedCard = Math.floor(Math.random() * x.length)
    return pickedCard
  } else if (!isNaN(x)) {
    let pickedSuid = Math.floor(x / 13)
    return { suit: suits[pickedSuid], card: x % 13 }
  }
}

let myDeck11 = [
  { suit: 'diamonds', card: 2 },
  { suit: 'spades', card: 10 },
  { suit: 'hearts', card: 4 }
]
let pickedCard11 = myDeck11[pickedCard3(myDeck11)]
let pickedCard22 = pickedCard3(15)

console.log('card: ' + pickedCard11.card + ' of ' + pickedCard11.suit)
console.log('card: ' + pickedCard22.card + ' of ' + pickedCard22.suit)