var ffi = require('ffi');
var ref = require('ref');

// console.log(ref.types);
// C++ 提供的dll 请看native/hellp.cpp文件

var test = ffi.Library('./native/hello', {
    'add': ['int', ['int', 'int']],
    'updateNum': ['void', ['int *', 'int']],
    'mystrcpy': ['void', ['string', 'string']],
    'getString': ['void', ['string', ref.refType(ref.types.ulong)]],
});

// add
console.log(test.add(1, 69));

// updateNum
var num = ref.alloc(ref.types.int, 4);
test.updateNum(num, 1);
console.log('num = ', num.readInt32LE());

// mystrcy
var dest = new Buffer(100).fill(' ');
test.mystrcpy(dest, '1234567890');
console.log(dest.toString())

// getString
var data = new Buffer(128).fill(' ');
var len = ref.alloc('ulong');
test.getString(data, len);
len = len.readUInt32LE();
console.log('data = ' + data.toString('hex', 0, len), 'len = ' + len);