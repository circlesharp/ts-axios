for (var i = 0; i < 10; i++) {
  ((i) => {
    setTimeout(() => {
      console.log(i)
    }, i * 100)
  })(i) // 立即执行的闭包，内部的函数可以使用内部的变量
}

let obj = {
  food: 1,
  good: 2,
  bar: 3,
  foo: 4
}

let loo = { ...obj } // 需要一个容器承载 
console.log(loo)