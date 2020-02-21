var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// 基本的类
var Greeter = /** @class */ (function () {
    // 构造函数
    function Greeter(message) {
        this.greeting = message;
    }
    // 方法
    Greeter.prototype.greet = function () {
        return 'Hello, ' + this.greeting;
    };
    return Greeter;
}());
var greeter = new Greeter('world');
greeter.greet();
// 类的继承
var Animal = /** @class */ (function () {
    function Animal() {
    }
    Animal.prototype.move = function (distance) {
        if (distance === void 0) { distance = 0; }
        console.log("Animal move " + distance + "m");
    };
    return Animal;
}());
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Dog.prototype.bark = function () {
        console.log('Woof! Woof!');
    };
    return Dog;
}(Animal));
var dog = new Dog();
dog.bark();
dog.move(10);
// 更复杂的类的继承
var Animal2 = /** @class */ (function () {
    function Animal2(name) {
        this.name = name;
    }
    Animal2.prototype.move = function (distance) {
        if (distance === void 0) { distance = 0; }
        console.log(this.name + " moved " + distance + "m.");
    };
    return Animal2;
}());
var Snake2 = /** @class */ (function (_super) {
    __extends(Snake2, _super);
    function Snake2(name) {
        return _super.call(this, name) || this;
    }
    Snake2.prototype.move = function (distance) {
        if (distance === void 0) { distance = 5; }
        console.log('Slithering...');
        _super.prototype.move.call(this, distance); // 如果还要访问其他成员，super 要写在前面
    };
    return Snake2;
}(Animal2));
var Horse2 = /** @class */ (function (_super) {
    __extends(Horse2, _super);
    function Horse2(name) {
        return _super.call(this, name) || this;
    }
    Horse2.prototype.move = function (distance) {
        if (distance === void 0) { distance = 45; }
        console.log('Galloping...');
        _super.prototype.move.call(this, distance);
    };
    return Horse2;
}(Animal2));
var sam = new Snake2('Sammy');
var tom = new Horse2('tommy');
sam.move();
tom.move(34);
// 修饰符 private, public
var Animal3 = /** @class */ (function () {
    function Animal3(name) {
        this.name = name;
    }
    Animal3.prototype.move = function (distance) {
        if (distance === void 0) { distance = 0; }
        console.log(this.name + " moved " + distance + "m.");
    };
    return Animal3;
}());
var Rhino3 = /** @class */ (function (_super) {
    __extends(Rhino3, _super);
    function Rhino3() {
        return _super.call(this, 'Rhino') || this;
    }
    return Rhino3;
}(Animal3));
var Employee3 = /** @class */ (function () {
    function Employee3(name) {
        this.name = name;
    }
    Employee3.prototype.move = function () { };
    return Employee3;
}());
var animal3 = new Animal3('Goat');
var rhino3 = new Rhino3();
var employee3 = new Employee3('Bob');
animal3 = rhino3;
// animal3 = employee3 // error
// 修饰符 protected
var Person4 = /** @class */ (function () {
    function Person4(name) {
        this.name = name;
    }
    return Person4;
}());
var Employee4 = /** @class */ (function (_super) {
    __extends(Employee4, _super);
    function Employee4(name, department) {
        var _this = _super.call(this, name) || this;
        _this.department = department;
        return _this;
    }
    Employee4.prototype.getElevatorPitch = function () {
        return "Hello, I am " + this.name + ", and I work in " + this.department + ".";
    };
    return Employee4;
}(Person4));
var howard = new Employee4('Howard', 'Sales');
console.log(howard.getElevatorPitch());
// console.log(howard.name) // error, 受保护，只能在子类访问
// let john = new Person4('John') // error，Person4的构造函数受保护
// 只读属性
var Person5 = /** @class */ (function () {
    function Person5(name) {
        this.name = name;
    }
    return Person5;
}());
var john5 = new Person5('John');
// john5.name = 'Amy' // error，只读
// 参数属性，但是看得不是很清晰
var Person6 = /** @class */ (function () {
    function Person6(name) {
        this.name = name;
    }
    return Person6;
}());
var john6 = new Person6('John');
// john5.name = 'Amy' // error，只读
// 存取器（getter, setter）
var password = '123456';
var Employee6 = /** @class */ (function () {
    function Employee6() {
    }
    Object.defineProperty(Employee6.prototype, "fullName", {
        get: function () {
            return this._fullName;
        },
        set: function (newVal) {
            if (password && password === '123456') {
                this._fullName = newVal;
            }
            else {
                console.log('Error: Unauthorized update of employee');
            }
        },
        enumerable: true,
        configurable: true
    });
    return Employee6;
}());
var employee6 = new Employee6();
employee6.fullName = 'John Smith';
password = '';
employee6.fullName = 'John Smith';
// 静态属性
var Grid = /** @class */ (function () {
    function Grid(scale) {
        this.scale = scale;
    }
    Grid.prototype.calculateDistanceFromOrigin = function (point) {
        var xDist = point.x - Grid.origin.x; // 使用静态方法
        var yDist = point.y - Grid.origin.y;
        return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2)) * this.scale;
    };
    Grid.origin = { x: 0, y: 0 }; // 静态方法
    return Grid;
}());
var grid1 = new Grid(1);
var grid2 = new Grid(3);
console.log(grid1.calculateDistanceFromOrigin({ x: 3, y: 4 }));
console.log(grid2.calculateDistanceFromOrigin({ x: 3, y: 4 }));
// 抽象类
var Department = /** @class */ (function () {
    function Department(name) {
        this.name = name;
    }
    Department.prototype.printName = function () {
        console.log(this.name);
    };
    return Department;
}());
var AccountDepartment = /** @class */ (function (_super) {
    __extends(AccountDepartment, _super);
    function AccountDepartment() {
        return _super.call(this, 'Account ad Auditing') || this;
    }
    AccountDepartment.prototype.printMeeting = function () {
        console.log('The Accounting Department meets each Monday 10am.');
    };
    AccountDepartment.prototype.generateReports = function () {
        console.log('Generating accounting reports...');
    };
    return AccountDepartment;
}(Department));
var department7; // 指定了类型
// department7 = new Department() // error -> 抽象类不能实例化
department7 = new AccountDepartment(); // 可以事先派生类
department7.printName();
department7.printMeeting();
// department7.generateReports() // error -> 指定了类型为 Department
// 类的高级技巧
var Greeter8 = /** @class */ (function () {
    function Greeter8(message) {
        this.greeting = message;
    }
    Greeter8.prototype.greet = function () {
        if (this.greeting) {
            return "Hello, " + this.greeting + ".";
        }
        else {
            return Greeter8.standardGreeting;
        }
    };
    // 静态方法
    Greeter8.standardGreeting = 'Hello, there';
    return Greeter8;
}());
var greeter8;
greeter8 = new Greeter8();
console.log(greeter8.greet());
// :typeof -> "告诉我 `Greeter` 标识符的类型"
var GreeterMaker = Greeter8;
GreeterMaker.standardGreeting = 'Hey, Guys!';
var greeter82 = new GreeterMaker();
console.log(greeter82.greet());
