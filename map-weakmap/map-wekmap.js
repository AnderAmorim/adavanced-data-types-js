import assert from 'assert'

//Atribuindo valores atraves do set
const myMap = new Map()
myMap
  .set('valor',1234)

//Atribuindo valores atraves do constructor
const myOtherMap = new Map([
  ['valor', 1234]
])

//Pegando valores
assert.deepStrictEqual(myMap.get('valor'), 1234)

//Objeto como chave
const worksOnlyWithReference = {id:1}
const myMapObj = new Map()
myMapObj.set(worksOnlyWithReference, {name:"Anderson Amorim"})
myMapObj.set({id:2}, {name:"Anderson Santos"})

assert.deepStrictEqual(myMapObj.get({id:1}), undefined)//not works
assert.deepStrictEqual(myMapObj.get(worksOnlyWithReference), {name:"Anderson Amorim"})//works fine

//Para saber quantas chaves tem
// - object -> Object.keys({a:1}).length
assert.deepStrictEqual(myMapObj.size,2)

//Verificar se um metodo existe
// 0bject - obj.key -> if() implica em coerção implicita para boolean e retorna true ou false
// Ou -> obj.hasOwnProperty('key')
assert.ok(myMap.has('valor'),true)

//Para remover um item
// object - delete myObj.key - extremamente imperformatico 
assert.ok(myMap.delete('valor'), true)

//Para iterar valores
// - object -> não daria sem utilizar um Object.entries 
console.log('iterator',...myMapObj)
//Ou pelo for of
for(const [key,value] of myMapObj){
  console.log([key,value])
}


//limpando um map
const valor1 = Symbol('valor1')
const mapBeforeClear = new Map([
  [valor1,1234],
  ['valor2',4321]
])
console.log('before clear', mapBeforeClear)
mapBeforeClear.clear()
console.log('after clear', mapBeforeClear)

//verificando se a chave existe
const objIndex = {teste:'valor'}
const mapVerification = new Map()
mapVerification.set('teste',123)
mapVerification.set(objIndex, {valor:123})
console.log('has method',mapVerification.has('teste'))
console.log('has method obj',mapVerification.has(objIndex))
console.log('has method obj literal',mapVerification.has({teste:'valor'}))