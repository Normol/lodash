// Collection
let Common = require('./Common')
let Util = require('../index')

/**
 * conversion collection
 *
 * @param {[Array,Object]} collection
 * @returns {Array}
 */
function converCollection(collection) {
  if(collection == null) return []
  return Array.isArray(collection) ? collection : Object.keys(collection)
}

/**
 * Init Data
 *
 * @param {[Array,Object]} collection
 * @param {[Array,Function,Object,String]} predicate
 * @returns {Ojbect}
 */
function initData(collection, predicate, fromIndex) {
  let data = converCollection(collection),
      length = data.length,
      index = fromIndex < 0 || fromIndex == null
              ? -1
              : fromIndex > length
                ? length
                : fromIndex
  return {
    data,
    index,
    length,
    iteratee: Common.baseIteratee(predicate),
  };
}

/**
 *
 *
 * @param {[Array,Object]} collection
 * @param {[Array,Object,Function,String]} predicate
 * @param {Function} setter
 * @param {[Function,Null]} initializer
 * @returns
 */
function dataEach(collection, predicate, setter, fromIndex = -1, initializer) {
  let {data, index, length, iteratee} = initData(collection, predicate, fromIndex),
      accumulator = initializer ? initializer() : {}
  while(++index < length) {
      let key = Array.isArray(collection) ? index : data[index]
      setter(key, collection[key], collection, iteratee, accumulator)
  }
  return accumulator
}

/**
 * baseEach
 *
 * @param {[Array,Object]} collection
 * @param {Function} iteratee
 * @param {String} direction
 * @returns
 */
function baseEach(collection, predicate, direction, setter, fromIndex = -1) {
  let {data, index, length, iteratee} = initData(collection, predicate, fromIndex)
  while(direction === 'leftToRight' ? ++index < length : length--) {
    let key = direction === 'leftToRight' ? index : length,
        value = Array.isArray(collection) ? data[key] : collection[data[key]]
        if(setter && setter(value, key, collection, iteratee)) return value
  }
}

// _.countBy

/**
 * countBy
 *
 * @param {[Array,Object]} collection
 * @param {[Array,Object,Function,String]} predicate
 * @returns
 */
function countBy(collection, predicate) {
  function setter(key, value, collection, iteratee, accumulator) {
    let val = iteratee(value)
    val && accumulator.hasOwnProperty(val) ? accumulator[val]++ : (accumulator[val] = 1) 
  }
  return dataEach(collection, predicate, setter)
}


//_.forEach

function eachSetter(val, key, collection, iteratee) {
  if(!iteratee(val, key, collection)) return true;
}

/**
 * forEach
 *
 * @param {[Array,Object]} collection
 * @param {Function} iteratee
 * @returns
 */
function forEach(collection, predicate) {
  baseEach(collection, predicate, "leftToRight", eachSetter)
  return collection
}

/**
 * forEachRight
 *
 * @param {[Array,Object]} collection
 * @param {Function} iteratee
 * @returns
 */
function forEachRight(collection, predicate) {
  baseEach(collection, predicate, "rightToLeft", eachSetter)
  return collection
}

// _.every

/**
 * every
 *
 * @param {[Array,Object]} collection
 * @param {[Array,Object,Function,String]} predicate
 * @returns
 */
function every(collection, predicate) {
  let {data, index ,length, iteratee} = initData(collection, predicate)
  while(++index < length) {
    let key = Array.isArray(collection) ? index : data[index]
    if(!iteratee(collection[key])) return false
  }
  return true
}

// _.filter

/**
 * filter
 *
 * @param {[Array,Object]} collection
 * @param {[Array,Object,Function,String]} predicate
 * @returns
 */
function filter(collection, predicate) {
  function setter(key, value, collection, iteratee, accumulator) {
    if(iteratee(value, key, collection)) accumulator.push(value)
  }
  return dataEach(collection, predicate, setter, -1, () => [])
}


// _.find

/**
 *
 *
 * @param {*} val
 * @param {Number} key
 * @param {Array|Object} collection
 * @param {Function} iteratee
 * @returns
 */
function findSetter(val, key, collection, iteratee) {
  if(iteratee(val, key, collection)) return true
}

/**
 *  find
 *
 * @param {Array|Object} collection
 * @param {Array|Object|Function|String} predicate
 * @returns
 */
function find(collection, predicate) {
  return baseEach(collection, predicate, "leftToRight", findSetter)
}

/**
 * findLast
 *
 * @param {Array|Object} collection
 * @param {Array|Object|Function|String} predicate
 * @returns
 */
function findLast(collection, predicate) {
  return baseEach(collection, predicate, "rightToLeft", findSetter)
}

// baseFlatMap

function baseFlatMap(collection, predicate, depth) {
  let iteratee = Common.baseIteratee(predicate)
  return converCollection(collection).reduce(function(result, item) {
    let res = Util.baseFlatten(iteratee(item), depth);
    result = [...result, ...res];
    return result;
  }, []);
}

//.flatMap

function flatMap(collection, predicate) {
  let iteratee = baseIteratee(predicate);
  return getCollection(collection).reduce(function (result, item) {
    result = [...result, ...iteratee(item)];
    return result;
  }, []);
}

function flatMapExtendsEach(collection, predicate) {
  function setter(key, value, collection, iteratee, accumulator) {
    let val = iteratee(value, key, collection)
    accumulator.splice(accumulator.length, 0 ,...Util.flattenDep(val))
  }
  return dataEach(collection, predicate, setter, -1, () => [])
}

function flatMapExtendsBase(collection, predicate) {
  return baseFlatMap(collection, predicate, 1);
}

//.flatMapDeep
function flatMapDeep(collection, predicate) {
  let iteratee = Common.baseIteratee(predicate);
  return converCollection(collection).reduce(function (result, item) {
    let res = Util.flattenDep(iteratee(item));
    result = [...result, ...res];
    return result;
  }, []);
}

function flatMapDeepExtendsBase(collection, predicate) {
  return baseFlatMap(collection, predicate, Infinity);
}

//.flatMapDepth
function flatMapDepthExtendsBase(collection, predicate, depth) {
  return baseFlatMap(collection, predicate, depth);
}

//.groupBy

/**
 * groupBy
 *
 * @param {Array|Object} collection
 * @param {Array|Object|Function|String} predicate
 * @returns
 */
function groupBy(collection, predicate) {
  let { data, iteratee } = initData(collection, predicate);
  return data.reduce((res, currentVal) => {
    let key = iteratee(currentVal),
      val = Array.isArray(collection) ? currentVal : collection[currentVal];
    res.hasOwnProperty(key) ? res[key].push(val) : (res[key] = [val]);
    return res;
  }, {});
}

function groupByextendsEach(collection, predicate) {
  function setter(key, val, collection, iteratee, accumulator) {
    let aorKey = iteratee(val)
    accumulator.hasOwnProperty(aorKey) ? accumulator[aorKey].push(val) : (accumulator[aorKey] = [val])
  }
  return dataEach(collection, predicate, setter, -1)
}

//.includes

/**
 * includes
 *
 * @param {Array|Object|String} collection
 * @param {*} value
 * @param {Number} [fromIndex=-1]
 * @returns
 */
function includes(collection, value, fromIndex = 0) {
  return typeof collection === "string"
    ? collection.indexOf(value, fromIndex) > -1
    : indexOf(collection, value) > -1
}

//.invokMap
function invokMap(collection, path, ...args) {
	let res = Array.isArray(collection) ? collection : Object.keys(collection),
			index = -1,
			length = res.length
	while(++index < length) {
		res[index] = path.apply(res[index], args)
	}
	return res
}

//.keyBy
function keyBy(collection, predicate) {
  let { result, iteratee } = initData(collection, predicate)
  return result.reduce((res,item) => {
    let val = Array.isArray(collection) ? item : collection[item],
        key = iteratee(val)
    res[key] = val
    return res
  }, {})
}

//.map 
function map(collection, predicate) {
  let {result, index, length, iteratee} = initData(collection, predicate),
      res = Array(length)
      while(++index < length) {
        let val = Array.isArray(collection) ? result[index] : collection[result[index]]
        res[index] = iteratee(val)
      }
  return res
}


// _.partition
function partition(collection, predicate) {
  let {result, index, length, iteratee} = initData(collection, predicate),
      truthyArray = [],
      falseyArray = []
  while(++index < length) {
    let val = Array.isArray(collection) ? result[index] : collection[result[index]]
    iteratee(val) ? truthyArray.push(val) : falseyArray.push(val)
  }
  return [truthyArray, falseyArray]
}

//_.reject
function reject(collection, predicate) {
  let {result, index, length, iteratee} = initData(collection, predicate),
      res = []
  while(++index < length) {
    let val = Array.isArray(collection) ? result[index] : collection[result[index]]
    !iteratee(val) && res.push(val)
  }
  return res
}
// get radom numbers
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max))
}
//_.sample
function sample(collection) {
  return baseSample(collection)
}

function sampleSize(collection, n) {
  return baseSample(collection, n)
}

function baseClamp(number, lower, upper) {
  if (number === number) {
    if (upper !== undefined) {
      number = number <= upper ? number : upper;
    }
    if (lower !== undefined) {
      number = number >= lower ? number : lower;
    }
  }
  return number;
}

function baseSample(collection, n) {
  n = n == null ? 1 : baseClamp(n)
  let res = getCollection(collection),
      result = []
  while(n--) {
    let index = getRandomInt(res.length),
        val = Array.isArray(collection) ? res[index] : collection[res[index]]
    result.push(val)
    res.splice(index, 1)
  }
  return result
}

module.exports = {
  countBy,
  forEach,
  forEachRight,
  every,
  filter,
  find,
  findLast,
  flatMap,
  groupBy,
  groupByextendsEach,
  includes
}