interface Bird {
  fly()
  layEggs()
}

interface Fish {
  swim()
  layEggs()
}

function getUnionPet (): Fish | Bird {
  return
}

let pet = getUnionPet()

// 类型谓词
// 谓词为 parameterName is Type这种形式
// parameterName必须是来自于当前函数签名里的一个参数名。
// ps. 函数签名 -> 函数的参数以及返回值 -> https://developer.mozilla.org/zh-CN/docs/Glossary/Signature/Function
function isFish (pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined
}

if (isFish(pet)) {
  pet.swim()
} else {
  pet.fly()
}

// 另一个更直接的类型保护
// 使用 typeof, instanceof
class CBird {
  fly () {
    console.log('bird fly')
  }
  layEggs () {
    console.log('bird layEggs')
  }
}

class CFish {
  swim () {
    console.log('fish swim')
  }
  layEggs () {
    console.log('fish layEggs')
  }
}

function getRandomPet (): CFish | CBird {
  return Math.random() > 0.5 ? new CFish() : new CBird()
}

let randomPet = getRandomPet()
if (randomPet instanceof CBird) {
  randomPet.fly()
}
if (randomPet instanceof CFish) {
  randomPet.swim()
}
