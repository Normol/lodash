
let Collection = require('./Collection')

/**
 *countByData
 *
 */
function testCountBy() {
  let data = [6.1, 4.2, 6.3]
  console.log(Collection.countBy(data, Math.floor))
}

function testForEach() {
  let data1 = [1,0,3]
      console.log(  Collection.forEach(data1,(val, key ,collection) => {
         console.log(val)
         return val
      }))
}


function testEvery() {
  let everyData = [
    { 'user': 'barney', 'age': 36, 'active': false },
    { 'user': 'fred',   'age': 40, 'active': false }
  ]
  console.log(Collection.every(everyData, 'active'))
}

function testFilter() {
  var data = [
    { 'user': 'barney', 'age': 36, 'active': true },
    { 'user': 'fred',   'age': 40, 'active': false }
  ]
  console.log(Collection.filter(data, (o) => !o.active))
  console.log(Collection.filter(data, { 'age': 36, 'active': true }))
}

function testFind() {
  var data = [
    { 'user': 'barney',  'age': 36, 'active': true },
    { 'user': 'fred',    'age': 40, 'active': false },
    { 'user': 'pebbles', 'age': 1,  'active': true }
  ]
  console.log(Collection.find(data, function(o) { return o.age < 40; }))
}


function testFindLast() {
  console.log(Collection.findLast([1,2,3,4], function(n) { return n % 2 == 0}))
}

function testFlatMap() {
  let res = Collection.flatMap([1,2], function(n) { return [n, n] })
  console.log(res)
}


function testGroupBy() {
  console.log(Collection.groupBy(['one', 'two', 'three'], 'length'))
}

function testIncludes() {
  console.log(Collection.includes([1, 2, 3], 1))
}

testIncludes()