// Array 

//_.chunk
function chunk(arry, size) {
    const len = arry.length
    if(size<=0 || size>=len) return arry
    const newLen = len / size
    !len%size &&  (++newLen)
    let arr = []
    let k = -1
    for(let i=0; i<newLen; i++) {
        ++k
        let innerArr = []
        for(k; k<len; k++) {
            innerArr.push(arry[k])
            if(innerArr.length === size) break
        }
        arr.push(innerArr)
    }
    console.log(arr)
    return arr
}

function chunk1(arry, size) {
    let arr = []
    const len = arry.length
    if(size<=0 || size>=len) return arry
    const newLen = Math.ceil(len / size)
    for(let i=0; i<newLen; i++) {
        if(arry.length > size) {
            arr[i] = arry.splice(0, size)
        }else {
            arr[i] = arry
        }
    }
    console.log('chunk', arr)
}
chunk1([1,2,3,4], 2)

//_.compact

function compact(arr) {
    const newArr = []
    for(let i=0; i<arr.length; i++) {
        if(!!arr[i]) newArr.push(arr[i])
    }
    return newArr
}

let Compact = compact([0,1,false, 2, '', 3])
console.log('compact', Compact)

//_.concat

//ES5 
function concatEs5() {
    let length = arguments.length
    if(!length) return []
    let arr = arguments[0]
    args = Array(length -1)
    while()
}