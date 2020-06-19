// Array


let Common = require('./Common')


function arrPush(array, value) {
  let arrLength = array.length,
    valLength = value.length,
    index = 0;
  while (index < valLength) {
    array[arrLength + index] = value[index];
    index++;
  }
  return array;
}

function baseFlatten(arr, depth, result) {
  let length = arr.length,
    index = -1;
  result || (result = []);
  while (++index < length) {
    let value = arr[index];
    if (depth > 0 && Array.isArray(value)) {
      if (depth > 1) {
        baseFlatten(value, depth - 1, result);
      } else {
        arrPush(result, value);
      }
    } else {
      result[result.length] = value;
    }
  }
  return result;
}

//_.chunk
function chunk(arry, size) {
  const len = arry.length;
  if (size <= 0 || size >= len) return arry;
  const newLen = len / size;
  !len % size && ++newLen;
  let arr = [];
  let k = -1;
  for (let i = 0; i < newLen; i++) {
    ++k;
    let innerArr = [];
    for (k; k < len; k++) {
      innerArr.push(arry[k]);
      if (innerArr.length === size) break;
    }
    arr.push(innerArr);
  }
  console.log(arr);
  return arr;
}

function chunk1(arry, size) {
  let arr = [];
  const len = arry.length;
  if (size <= 0 || size >= len) return arry;
  const newLen = Math.ceil(len / size);
  for (let i = 0; i < newLen; i++) {
    if (arry.length > size) {
      arr[i] = arry.splice(0, size);
    } else {
      arr[i] = arry;
    }
  }
}

//_.compact

function compact(arr) {
  const newArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (!!arr[i]) newArr.push(arr[i]);
  }
  return newArr;
}

//_.concat
function concat() {
  let length = arguments.length;
  if (!length) return [];
  let arr = arguments[0];
  let newArr = [];
  let newIndex = 1;
  while (newIndex < length) {
    newArr.push(arguments[newIndex]);
    newIndex++;
  }
  return arrPush(arr, baseFlatten(newArr, 1));
}

//_.difference
function difference() {
  let length = arguments.length;
  if (!length) return [];
  if (length === 1) return arguments[0];
  let arr = arguments[0];
  let newArr = [];
  while (--arr.length) {
    if (arguments[1].indexOf(arr[index]) === -1) newArr.push(arr[index]);
    index++;
  }
  return newArr;
}

//_.drop
function drop() {
  let length = arguments.length;
  if (!length) return [];
  let start = arguments[1] ? arguments[1] : arguments[1] === 0 ? 0 : 1,
    arr = arguments[0],
    newArr = [];
  while (start < arr.length) {
    if (arr[start]) newArr.push(arr[start]);
    start++;
  }
  return newArr;
}

//_.dropRight
function dropRight(arry, n) {
  let len = arry === null ? 0 : arry.length;
  if (!len) return [];
  let arr = [],
    end = n ? n : n === 0 ? 0 : 1,
    length = len - end < 0 ? 0 : len - end;
  while (length--) {
    arr[length] = arry[length];
  }
  return arr;
}

//_.fill
function fill(array, value, start, end) {
  let length = array === null ? 0 : array.length;
  if (!length) return [];
  let startIdx = start ? start : 0,
    endIdx = end >= 0 ? (end > length ? ength : end) : length + end;
  end ? endIdx : (endIdx = length);
  while (startIdx < endIdx) {
    array[startIdx] = value;
    startIdx++;
  }
}

//_.findIndex
function findIndex(array, predicate, fromIndex) {
  let length = array === null ? 0 : array.length;
  if (!length) return -1;
  let fromIdx =
    fromIndex === undefined
      ? 0
      : fromIndex < 0
      ? fromIndex + length
      : fromIndex;
  while (fromIdx < length) {
    if (predicate(array[fromIdx], fromIdx, array)) {
      return fromIdx;
    }
    fromIdx++;
  }
  return -1;
}

//_.findLastIndex
function findLastIndex(array, predicate, fromIndex) {
  let length = array === null ? 0 : array.length;
  if (!length) return -1;
  let endIdx =
    fromIndex === undefined
      ? length - 1
      : fromIndex < 0
      ? fromIndex + length
      : fromIndex;
  while (endIdx) {
    if (predicate(array[endIdx], endIdx, array)) {
      return endIdx;
    }
    endIdx--;
  }
  return -1;
}

//_.first
function first(array) {
  let length = array === null ? 0 : array.length;
  if (!length) return;
  return array[0];
}

//_.flatten
function flatten(array) {
  let length = array === null ? 0 : array.length;
  if (!length) return [];
  return Array.prototype.concat.apply([], array);
}

//_.flattenDep
function flattenDep(array, res = []) {
  let length = array === null ? 0 : array.length;
  if (!length) return [];
  let index = -1;
  while (++index < length) {
    if (Array.isArray(array[index])) {
      flattenDep(array[index], res);
    } else {
      res.push(array[index]);
    }
  }
  return res;
}

//_.fromPairs
function fromPairs(pairs) {
  let length = pairs === null ? 0 : pairs.length;
  if (!length) return null;
  let index = -1,
    res = {};
  while (++index < length) {
    let val = pairs[index];
    if (Array.isArray(val) && val.length === 2) {
      res[val[0]] = val[1];
    }
  }
  return res;
}

//_.indexOf
function indexOf(array, value, fromIndex) {
  let length = array === null ? 0 : array.length;
  if (!length) return -1;
  let fromIdx =
    fromIndex < 0 || fromIndex === undefined
      ? fromIndex < 0
        ? length
        : 0
      : fromIndex;
  while (fromIndex < 0 ? --fromIdx : fromIdx++ < length) {
    if (array[fromIdx] === value) return fromIdx;
  }
  return -1;
}

//_.initial
function initial(array) {
  let length = array === null ? 0 : array.length;
  if (!length) return [];
  let res = [],
    index = -1;
  while (++index < length - 1) {
    res.push(array[index]);
  }
  return res;
}

//_.intersection
function intersectionES6() {
  return Array.from(arguments).reduce(function (result, current) {
    let set = new Set(current);
    let res = Array.from(new Set(result.filter((val) => set.has(val))));
    if (!res.length) return;
    return res;
  });
}

function intersectionES7() {
  return Array.from(arguments).reduce(function (result, current) {
    let res = result.filter((val) => current.includes(val));
    if (!res.length) return;
    return res;
  });
}

//_.join
function join(array, separator) {
  let length = array === null ? 0 : array.length;
  if (!length) return;
  let str = "",
    index = -1;
  while (++index < length) {
    if (index === length - 1) {
      str += array[index];
    } else {
      str += array[index] + separator;
    }
  }
  return str;
}

//_.last
function last(array) {
  let length = array === null ? 0 : array.length;
  return length ? array[length - 1] : undefined;
}

//_.lastIndexOf
function lastIndexOf(array, value, fromIndex) {
  let length = array === null ? 0 : array.length;
  let fromIdx =
    fromIndex === undefined
      ? length
      : fromIndex > length
      ? length
      : fromIndex < -length
      ? Math.max(length + fromIndex, 0)
      : ++fromIndex;
  while (fromIdx--) {
    if (array[fromIdx] === value) return fromIdx;
  }
  return -1;
}

//_.nth
function nth(array, index) {
  let length = array === null ? 0 : array.length;
  if (!length) return;
  let idx = parseInt(index);
  idx = idx < 0 ? idx + length : idx;
  return idx > length ? undefined : array[idx];
}

//_.pull
function pull(array, ...values) {
  let arrayLength = array === null ? 0 : array.length;
  if (!arrayLength) return [];
  let valLength = values && values.length,
    index = -1;
  while (++index < arrayLength) {
    if (!!valLength && values.indexOf(array[index]) !== -1) {
      array.splice(index, 1);
      --index;
      --arrayLength;
    }
  }
}

//_.remove
function remove(array, predicate) {
  let length = array === null ? 0 : array.length;
  if (!length) return;
  let newArr = [],
    index = -1;
  while (++index < length) {
    if (predicate(array[index])) {
      newArr.push(array[index]);
      array.splice(index, 1);
      --index;
    }
  }
  return newArr;
}

//_.reverse
function reverse(array) {
  let length = array === null ? 0 : array.length;
  if (!length) return [];
  let index = -1,
    newArr = array.slice();
  while (length--) {
    array[++index] = newArr[length];
  }
}

function reverse1(array) {
  let length = array === null ? 0 : array.length,
      halfLength = parseInt(length / 2),
      index = -1
  while(++index < halfLength) {
    let temp = array[index]
    array[index] = array[length-index-1]
    array[length-index-1] = temp
  }
  return array
}


//_.slice
function slice(array, start, end) {
  let length = array === null ? 0 : array.length;
  if (!length) return [];
  let startIdx =
      start === undefined
        ? 0
        : start >= 0
        ? start
        : Math.max(start + length, 0),
    endIdx =
      end === undefined || end > length
        ? length
        : end >= 0
        ? end
        : Math.max(end + length, 0),
    newArray = [],
    index = -1;
  if (startIdx > endIdx) return [];
  while (startIdx < endIdx) {
    newArray[++index] = array[startIdx];
    startIdx++;
  }
  return newArray;
}

//_.tail
function tail(array) {
  let length = array === null ? 0 : array.length;
  if (!length) return [];
  let newArr = Array(length - 1),
    start = 1,
    index = -1;
  while (++index < length - start) {
    newArr[index] = array[index + start];
  }
  return newArr;
}

//_.take
function take(array, n) {
  let length = array === null ? 0 : array.length;
  if (!length) return [];
  let num =
      n === undefined
        ? 1
        : n >= 0
        ? Math.min(n, length)
        : Math.max(n + length, 1),
    newArr = Array(num),
    index = -1;
  while (++index < num) {
    newArr[index] = array[index];
  }
  return newArr;
}

//_.union 数组合并
function union(...arys) {
  let length = arys === null ? 0 : arys.length;
  if (!length) return [];
  let index = -1,
    newArr = [];
  while (++index < length) {
    if (Array.isArray(arys[index])) {
      let aryIdx = -1,
        aryLength = arys[index].length;
      while (++aryIdx < aryLength) {
        let item = arys[index][aryIdx];
        if (newArr.indexOf(item) === -1) {
          newArr.push(item);
        }
      }
    }
  }
  return newArr;
}

// _.uniq 数组去重
function uniq(array) {
  let length = array === null ? 0 : array.length;
  if (!length) return [];
  let index = -1,
    newArray = [];
  while (++index < length) {
    if (newArray.indexOf(array[index]) === -1) newArray.push(array[index]);
  }
  return newArray;
}

function uniqEs6(array) {
  let length = array === null ? 0 : array.length;
  if (!length) return [];
  let set = new Set(array);
  return [...set];
}

//_.zip
function zip() {
  let length = arguments.length;
  if (!length) return [];
  let index = -1,
    maxlength = 0,
    result = [];
  while (++index < length) {
    if (Array.isArray(arguments[index])) {
      let len = arguments[index].length;
      maxlength = Math.max(maxlength, len);
    }
  }
  while (maxlength--) {
    let arr = [],
      arrIndex = -1;
    while (++arrIndex < length) {
      if (
        Array.isArray(arguments[arrIndex]) &&
        arguments[arrIndex][maxlength] !== undefined
      )
        arr.push(arguments[arrIndex][maxlength]);
    }
    result[maxlength] = arr;
  }
  return result;
}

//_.without
function without(array, ...res) {
  let length = array === null ? 0 : array.length;
  if (!length) return [];
  let index = -1,
    result = [];
  while (++index < length) {
    let item = array[index];
    if (res.indexOf(item) === -1) {
      result.push(item);
    }
  }
  return result;
}

// 冒泡排序
function sort(array) {
  let length = array === null ? 0 : array.length - 1;
  if (!length) return;
  let outIdx = -1;
  while (++outIdx < length) {
    let done = true;
    insideIdx = -1;
    while (++insideIdx < length - outIdx) {
      if (array[insideIdx] > array[insideIdx + 1]) {
        let temp = array[insideIdx];
        array[insideIdx] = array[insideIdx + 1];
        array[insideIdx + 1] = temp;
        done = false;
      }
    }
    if (done) {
      break;
    }
  }
  return array;
}



//.get
function get(object, path, defaultVal) {
  let pathArr = path.split("."),
    index = -1,
    length = pathArr.length,
    result = object;
  while (++index < length) {
    let key = pathArr[index];
    if (key != null && result.hasOwnProperty(key)) result = result[key];
    else return defaultVal;
  }
  return result;
}

function xor(array) {
  let length = array == null ? [] : array.length,
      index = -1,
      obj = {}
  while(++index < length) {
    array[index] in obj ? obj[array[index]]++ : (obj[array[index]] = 0)
  }
  return Object.values(obj).filter(o => !o)
}


/**
 *
 *
 * @param {Array} props
 * @param {Array} values
 */
function zipObjectDeep(props, values) {
  let propLength = props == null ? 0 : props.length,
      valuesLength = values == null ? 0 : values.length,
      index = -1,
      result = {}
  while(++index < propLength) {
    let currentVal = valuesLength > index ? values[index] : undefined,
        val = props[index].replace(/\[|\]/g, '.').split('.').filter(val => val),
        innerIndex = -1
    zipIteratee(val, result, currentVal, innerIndex)
  }
  
}

function isNumber(val) {
  let num = Number(val)
  return(num === num)
}

function zipIteratee(val, result, currentVal, innerIndex) {
  innerIndex++
  let length = val.length
  if(innerIndex <= length -1) {
    let key = val[innerIndex],
        value = innerIndex === length - 1
                ? currentVal
                : isNumber(val[innerIndex + 1])
                  ? []
                  : {}
    !(key in result) && Object.defineProperty(result, key, {value})
    if(innerIndex < length - 1) zipIteratee(val, result[key], currentVal, innerIndex)
  }else return
}



const deepChars = (string) => string.replace(/\[|\]/g, '.').split('.').filter((char) => char)


/**
 *
 *
 * @param {*} props
 * @param {*} values
 */
const zipObjectDeep1 = (props, values) => props.reduce((p, c, i) => {
  const prop = deepChars(c)
  const result = Object.assign(p, objectDeep(prop, values[i]))
  console.log('result: ', JSON.stringify(result))
  return result
}, {})


const objectDeep = (prop, value) => {
  let leng = prop.length
  const i = -1
  while (--leng > i) {
    const cur = prop[leng]
    let result = {}
    result = isNumber(cur)
      ? new Array(+cur+1).fill(value, +cur, +cur+1)
      : {[cur]: value}
    value = result
  }
  return value
}


module.exports = {
}