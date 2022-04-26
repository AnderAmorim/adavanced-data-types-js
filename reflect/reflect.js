'use strict'

// apply subtitui o comportamento e contexto de funções de uma classe ou objeto
const applyTestObj = {
  add(myValue){
    return this.arg1 + this.arg2 + myValue
  }
}
const result = applyTestObj.add.apply({arg1:2, arg2:2}, [2])
console.log('with apply',result)
//Usando reflect

//apply
const resultWithReflect = Reflect.apply(applyTestObj.add, {arg1:2, arg2:2}, [2])
console.log('with reflect apply', resultWithReflect)


//verificando se a chave existe em um objeto
const keyInObj = 'keyInObj' in {keyInObj:'teste'}
console.log('keyInObj',keyInObj)

const keyInObjReflect = Reflect.has({keyInObj:'teste'},'keyInObj')
console.log('keyInObjReflect',keyInObjReflect)

//Buscando chaves e simbols de uma unica vez - ownKeys
const symb = Symbol('key')
const myObjWithSymbol = {
  [symb]:'test',
  'anyValue':1234
}
const objKeys = {
  ...Object.getOwnPropertyNames(myObjWithSymbol),
  ...Object.getOwnPropertySymbols(myObjWithSymbol)
}

console.log('objKeys',objKeys)
console.log('objKeysWithReflect',Reflect.ownKeys(myObjWithSymbol))