class User {
  // 先申明好，为public
  fullName: string
  firstName: string
  lastName: string

  constructor (firstName: string, lastName: string) {
    this.firstName = firstName
    this.lastName = lastName
    this.fullName = `${firstName} ${lastName}`
  }
}

interface Person {
  firstName: string
  lastName: string
} // 接口可以理解为 -> 对象级的描述

function greeter (person: Person) {
  return 'Hello ' + person.firstName + ' ' + person.lastName
}

let user = new User('Rong', 'tan')
console.log(greeter(user))
