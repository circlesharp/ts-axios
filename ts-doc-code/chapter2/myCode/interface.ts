// 对象的接口
interface Square {
  color: string
  area: number
}

interface SquareConfig {
  color?: string
  width?: number
}

function createSquare (config: SquareConfig): Square {
  let square = { color: 'white', 'area': 666 }
  if (config.color) {
    square.color = config.color
  }
  if (config.width) {
    square.area = config.width ** 2
  }
  return square
}

console.log(createSquare({}))
console.log(createSquare({ color: 'red', width: 4 }))
console.log(createSquare({ width: 4 }))
console.log(createSquare({ color: 'red' }))

// 只读

let list: number[] = [1, 2, 3, 4]
let roList: ReadonlyArray<number> = list
let anyList = roList as number[] // 类型断言


// 函数的接口
interface SearchFunc {
  // (*params): return
  (source: string, subString: string): boolean
}

let mySearch: SearchFunc = function (src, sub) {
  return src.search(sub) !== -1
}

console.log(mySearch('12345', '234'))
console.log(mySearch('12345', '2344'))

// 索引签名
interface StringArr {
  [index: number]: string
}

let myArray: StringArr = ['Bob', 'Lucy']

console.log(myArray['0'])

// 类类型

interface ClockConstructor { // 构造函数接口
  new (min: number, sec: number): ClockInterface
}

interface ClockInterface { // 类接口
  click()
}

let createClock = function (ctor: ClockConstructor, min: number, sec: number): ClockInterface { // 工厂过程中限制了 ctor
  return new ctor(min, sec)
}

class DigitalClock implements ClockInterface { // 类满足类接口
  constructor(m: number, s: number) {} // 构造函数不受接口约束
  click () { // 实例方法收到约束
    console.log('beep beep')
  }
}

class AnalogClock implements ClockInterface {
  constructor(m: number, s: number) {}
  click () {
    console.log('ding ding')
  }
}

let digital = createClock(DigitalClock, 22, 17) // 工厂模式构造
let analog = createClock(AnalogClock, 12, 32)

digital.click()
analog.click()

// 接口的继承

interface Shape2 {
  color: string
}

interface PenStroke2 {
  penWidth: number
}

interface Square2 extends Shape2, PenStroke2 {
  sideLength: number
}

// let square: Square2 = {
//   color: 'blue',
//   sideLength: 10
// }

let square2 = {} as Square2
square2.color = 'blue'
square2.penWidth = 2
square2.sideLength = 5


// 混合类型

interface Counter {
  (start: number): string
  interval: number
  reset(): void // reset不需要参数，不需要返回
}

function getCounter (): Counter {
  let counter = ((star: number) => {}) as Counter
  counter.interval = 123
  counter.reset = () => {}
  return counter
}

let c = getCounter()
c(10)
c.interval = 2
c.reset()
