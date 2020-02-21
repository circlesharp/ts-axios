// 基本的类
class Greeter { // 在类中引用某一个成员，用 this
  // 属性
  greeting: string
  // 构造函数
  constructor (message: string) {
    this.greeting = message
  }
  // 方法
  greet (): string {
    return 'Hello, ' + this.greeting
  }
}

let greeter = new Greeter('world')
greeter.greet()


// 类的继承
class Animal { // 基类 / 超类
  move(distance: number = 0): void {
    console.log(`Animal move ${distance}m`)
  }
}

class Dog extends Animal { // 派生类 / 子类
  bark (): void {
    console.log('Woof! Woof!')
  }
}

const dog = new Dog()
dog.bark()
dog.move(10)


// 更复杂的类的继承
class Animal2 {
  name: string
  constructor (name: string) {
    this.name = name
  }
  move(distance: number = 0) {
    console.log(`${this.name} moved ${distance}m.`)
  }
}

class Snake2 extends Animal2 {
  constructor (name: string) {
    super(name)
  }
  move (distance: number = 5) {
    console.log('Slithering...')
    super.move(distance) // 如果还要访问其他成员，super 要写在前面
  }
}

class Horse2 extends Animal2 {
  constructor (name: string) {
    super(name)
  }
  move (distance: number = 45) {
    console.log('Galloping...')
    super.move(distance)
  }
}

let sam = new Snake2('Sammy')
let tom: Animal2 = new Horse2('tommy')

sam.move()
tom.move(34)


// 修饰符 private, public
class Animal3 {
  private name: string
  constructor(name: string) { // 不是 private 就默认 public
    this.name = name
  }
  move (distance: number = 0) {
    console.log(`${this.name} moved ${distance}m.`)
  }
}

class Rhino3 extends Animal3 {
  constructor() {
    super('Rhino')
  }
}

class Employee3 {
  private name: string
  constructor(name: string) {
    this.name = name
  }
  move (): void {}
}

let animal3 = new Animal3('Goat')
let rhino3 = new Rhino3()
let employee3 = new Employee3('Bob')

animal3 = rhino3
// animal3 = employee3 // error


// 修饰符 protected
class Person4 {
  protected name: string
  protected constructor(name: string) {
    this.name = name
  }
}

class Employee4 extends Person4 {
  private department: string
  constructor (name: string, department: string) {
    super(name)
    this.department = department
  }
  getElevatorPitch () {
    return `Hello, I am ${this.name}, and I work in ${this.department}.`
  }
}

let howard = new Employee4('Howard', 'Sales')
console.log(howard.getElevatorPitch())
// console.log(howard.name) // error, 受保护，只能在子类访问
// let john = new Person4('John') // error，Person4的构造函数受保护


// 只读属性
class Person5 {
  readonly name: string
  constructor (name: string) {
    this.name = name
  }
}

let john5 = new Person5('John')
// john5.name = 'Amy' // error，只读


// 参数属性，但是看得不是很清晰
class Person6 {
  constructor (readonly name: string) { }
}

let john6 = new Person6('John')
// john5.name = 'Amy' // error，只读


// 存取器（getter, setter）
let password = '123456'

class Employee6 {
  private _fullName: string
  get fullName (): string {
    return this._fullName
  }
  set fullName (newVal: string) {
    if (password && password === '123456') {
      this._fullName = newVal
    } else {
      console.log('Error: Unauthorized update of employee')
    }
  }
}

let employee6 = new Employee6()
employee6.fullName = 'John Smith'
password = ''
employee6.fullName = 'John Smith'


// 静态属性
class Grid {
  static origin = { x: 0, y: 0 } // 静态方法
  scale: number
  constructor (scale: number) {
    this.scale = scale
  }
  calculateDistanceFromOrigin (point: { x: number, y: number }) {
    let xDist = point.x - Grid.origin.x // 使用静态方法
    let yDist = point.y - Grid.origin.y
    return Math.sqrt(xDist ** 2 + yDist ** 2) * this.scale
  }
}

let grid1 = new Grid(1)
let grid2 = new Grid(3)

console.log(grid1.calculateDistanceFromOrigin({ x: 3, y: 4}))
console.log(grid2.calculateDistanceFromOrigin({ x: 3, y: 4}))


// 抽象类
abstract class Department { // 定义抽象类
  name: string
  constructor (name: string) {
    this.name = name
  }
  printName (): void {
    console.log(this.name)
  }
  // 抽象方法签名
  abstract printMeeting (): void
}

class AccountDepartment extends Department {
  constructor () {
    super('Account ad Auditing')
  }
  printMeeting () {
    console.log('The Accounting Department meets each Monday 10am.')
  }
  generateReports (): void {
    console.log('Generating accounting reports...')
  }
}

let department7: Department // 指定了类型
// department7 = new Department() // error -> 抽象类不能实例化
department7 = new AccountDepartment() // 可以事先派生类
department7.printName()
department7.printMeeting()
// department7.generateReports() // error -> 指定了类型为 Department


// 类的高级技巧
class Greeter8 {
  // 静态方法
  static standardGreeting = 'Hello, there'

  // 成员属性 / 实例属性
  greeting: string

  constructor (message?: string) {
    this.greeting = message
  }

  greet (): string {
    if (this.greeting) {
      return `Hello, ${this.greeting}.`
    } else {
      return Greeter8.standardGreeting
    }
    
  }
  
}

let greeter8: Greeter8
greeter8 = new Greeter8()
console.log(greeter8.greet())

// 产生了一个新的构造器
let GreeterMaker: typeof Greeter8 = Greeter8 // :typeof -> "告诉我 `Greeter` 标识符的类型"
GreeterMaker.standardGreeting = 'Hey, Guys!'
let greeter82: Greeter8 = new GreeterMaker()
console.log(greeter82.greet())
