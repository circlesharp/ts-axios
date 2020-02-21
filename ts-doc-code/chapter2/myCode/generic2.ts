// 泛型类，泛型在实例化的时候定义
class GenericNumber<T> {
  zeroValue: T
  add: (x: T, y: T) => T
}

let myGenericNumber = new GenericNumber<number>()
myGenericNumber.zeroValue = 0
myGenericNumber.add = function (x, y) {
  return x + y
}

let stringNumeric = new GenericNumber<string>()
stringNumeric.zeroValue = ''
stringNumeric.add = function (x, y) {
  return x + y
}


// 泛型约束, 通过接口约束 T
interface Lengthwise {
  length: number
}

function loggingIdentity<T extends Lengthwise> (arg: T): T {
  console.log(arg.length)
  return arg
}

loggingIdentity({ length: 1 }) // 需要带 length 属性，因为T收到接口约束


// 或者
function getProperty<T, K extends keyof T> (obj: T, key: K) {
  console.log(obj[key])
}

let x = { a: 1, b: 2, c: 3 }

getProperty(x, 'a')
// getProperty(x, 'd') // error -> d 不是 extends keyof a


// 工厂构造函数，c 就是构造函数
function create<T> (c: { new(): T }): T { // 表示 new 的实例的类型就是 工厂函数返回的类型
  return new c()
}


// 动物管理员
class BeeKeeper {
  hasMask: boolean
}

class LionKeeper {
  nametag: string
}

class Animal {
  nemLengs: number
}

class Bee extends Animal {
  keeper: BeeKeeper
}

class Lion extends Animal {
  keeper: LionKeeper
}

function createInstance<T extends Animal> (c: new() => T): T {
  return new c()
}

let lion = createInstance(Lion) // 这个工厂只能给 Animal 的子类构造
lion.keeper.nametag
let bee = createInstance(Bee)
bee.keeper.hasMask