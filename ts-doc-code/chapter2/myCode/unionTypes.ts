// intersection -> &; union -> |
function padLeft (value: string, padding: string | number): string {
  if (typeof padding === 'number') {
    return Array(padding + 1).join(' ') + value
  } else {
    return padding + value
  }
  throw new Error(`Expected string or number got ${padding}`)
}

// 另一个例子
interface Bird {
  fly()
  layEggs()
}

interface Fish {
  swim()
  layEggs()
}

function unionPet (): Fish | Bird {
  
}
let uPet = unionPet()
uPet.layEggs()
// uPet.swim() // error

function intersectionPet (): Fish & Bird {

}
let iPet = intersectionPet()
iPet.layEggs()
iPet.swim()