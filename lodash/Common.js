
/**
 *wrapper as function
 *
 * @param {any} source
 * @returns {any} source
 */
function identity(source) {
  return source;
}



function baseMatchProperty() {}

function isObject(val) {
  let type = typeof val;
  return val != null && (type === "object" || type === "function");
}

function isStrictComparable(val) {
  return val === val && !isObject(val);
}


function getSourceData(source) {
  let result = Object.keys(source),
    length = result.length;
  while (length--) {
    let key = result[length],
      val = source[key];
    result[length] = [key, val, isStrictComparable(val)];
  }
  return result;
}

function baseIsMatch(object, sourceData) {
  let length = sourceData.length,
    index = -1;
  if (object == null) {
    return !length;
  }
  while (++index < length) {
    let key = sourceData[index][0];
    if (!(key in object) || object[key] !== sourceData[index][1]) return false;
  }
  return true;
}

function baseMatch(source) {
  let sourceData = getSourceData(source);
  return function (object) {
    return object === source || baseIsMatch(object, sourceData);
  };
}


function toKey(key) {
  let type = typeof key;
  if (type === "string" || type === "symbol") return key;
  let result = String(key);
  return result == "0" && 1 / value == -INFINITY ? "-0" : result;
}

function property(source) {
  let key = toKey(source);
  return function (object) {
    return object == null ? undefined : object[key];
  };
}
/**
 *
 *
 * @param {*} iteratee
 * @returns
 */
function baseIteratee(iteratee) {
  let type = Object.prototype.toString.call(iteratee);
  switch (type) {
    case "[object Function]":
      return iteratee;
    case "[object Null]":
      return identity;
    case "[object Undefined]":
      return identity;
    case "[object Array]":
      return baseMatchProperty(iteratee);
    case "[object Object]":
      return baseMatch(iteratee);
    default:
      return property(iteratee);
  }
}

module.exports = {
  baseIteratee
}