import assert, { throws } from 'assert'
const uniqueKey = Symbol('userName')
const user = {}
user[uniqueKey] = 'Value in symbol index'
console.log(uniqueKey)
console.log(Object.getOwnPropertySymbols(user)[0])
assert.deepStrictEqual(uniqueKey,Object.getOwnPropertySymbols(user)[0])
const obj = {
  //iterators
  [Symbol.iterator]: () =>({
    items:[1,2,3],
    next(){
      return {
        done: this.items.length === 0,
        value: this.items.pop()
      }
    }
  })
}
for(const item of obj){
  console.log(item)
}
console.log([...obj])

//Gerando datas e atribuindo a um indice privado
const kItems = Symbol('kItems')
class MyDate{
  constructor(...args){
    this[kItems] = args.map((arg)=>new Date(...arg)) 
  }
  [Symbol.toPrimitive](coercionType){
    //Devo travar pq as datas devem estar somente em string
    if(coercionType!=='string') throw new TypeError()
    const items = this[kItems].map(item => new Intl.DateTimeFormat("pt-BR", {month:"long", day:"2-digit", year:'numeric'}).format(item))
    return new Intl.ListFormat("pt-BR", { style: "long", type: "conjunction"}).format(items)
  }

  *[Symbol.iterator](){
    for (const item of this[kItems]){
      yield item
    }
  }
  async *[Symbol.asyncIterator]() {
    const timeout = ms => new Promise(r => setTimeout(r, ms))
    for( const item of this[kItems]) {
        await timeout(100)
        yield item.toISOString()
    }
  }
}

const myDates = new MyDate(
  [2022,4,24],
  [2022,4,24]
)

console.log(myDates)

//Testing block
// console.log(myDates+1)

//chamando coerção explicita para ser intercepctado pelo Symbol.toPrimitive
console.log(String(myDates)) 

//Chamando iterator
console.log('iterator',[...myDates]) 

//Chamando async iterators
;(async()=>{
  for await (const item of myDates){
   console.log('async iterator',item)
  }
})()

// const myPrivateMethod = Symbol('privateMethod')
// class MyClass{
  
//   [myPrivateMethod](parameter){
//     console.log(parameter)
//   }
//   logParam(parameter){
//     this[myPrivateMethod](parameter)
//   }
 
// }

// const testClass = new MyClass()
// testClass.logParam('Symbol testing')