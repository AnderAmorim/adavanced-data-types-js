import assert from 'assert'
function* calculation(arg1, arg2){
  yield arg1 * arg2
}

function *main(){
  yield 'Hello'
  yield '-'
  yield 'World'
  yield* calculation(1,1)
}

const generator = main()
// assert.deepStrictEqual(generator.next(), {value:'Hello', done:false})
// assert.deepStrictEqual(generator.next(), {value:'-', done:false})
// assert.deepStrictEqual(generator.next(), {value:'World', done:false})
// assert.deepStrictEqual(generator.next(), {value:1, done:false})
// assert.deepStrictEqual(generator.next(), {value:undefined, done:true})

// console.log('array from', Array.from(main()))
// console.log('spread operator', [...main()])

// async iterators
import { readFile, stat, readdir } from 'fs/promises'
function* promisified(){
  yield readFile(__filename)
  yield Promise.resolve('Hey Jude')
}

async function* systemInfo(){
  const file = await readFile(__filename)
  yield {file:file.toString()}
  const {size} = await stat(__filename)
  yield {size}
  const dir = await readdir(__dirname)
  yield {dir}
}

// ; (async()=>{
//   for await (const item of systemInfo()){
//     console.log('systemInfo', item)
//   }
// })()

const gen = myGenerator()