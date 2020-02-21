function identity<T>(arg: T): T {
  return arg
}

let output = identity('123') // 推论


function loggingIdentity1<T>(arg: Array<T>): Array<T> {
  arg.length
  return arg
}
function loggingIdentity2<T>(arg: T[]): T[] {
  arg.length
  return arg
}


// 泛型函数类型 
let myIdentity1: <T>(arg: T) => T = identity
// 或（签名）=》 函数签名（或者类型签名，抑或方法签名）定义了函数或方法的输入与输出
let myIdentity2: { <T>(arg: T): T } = identity
// 使用接口
interface GenericIdentityFn {
  <T>(arg: T): T
}
let myIdentity3: GenericIdentityFn = identity
// T作为接口的参数, 在调用的时候就要指定类型
// 推荐方式
interface GenericIdentityFn2<T> {
  (arg: T): T
}
let myIdentity4: GenericIdentityFn2<number> = identity