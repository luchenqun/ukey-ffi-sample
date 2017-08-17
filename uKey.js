var ffi = require('ffi');
var ref = require('ref');

// console.log(ref.types);

// 123345
var dwordPoint = ref.refType(ref.types.ulong);
var ukey = ffi.Library('./native/WDJuZhenAPIx64', {
    'J_BC_WD_OpenDevice': ['int', []],
    'J_BC_WD_CloseDevice': ['int', []],
    'J_BC_WD_VerifyPin': ['int', ['string', 'int']],
    'J_BC_WD_RSAGenKey': ['int', []],
    'J_BC_WD_ECCGenKey': ['int', []],
    'J_BC_WD_RSAGetPubKey': ['int', ['string', dwordPoint]],
    'J_BC_WD_ECCGetPubKey': ['int', ['string', dwordPoint]],
    'J_BC_WD_ImportRSACert': ['int', ['string']],
    'J_BC_WD_ExPortRSACert': ['int', ['string', dwordPoint]],
    'J_BC_WD_RSAEncrypt': ['int', ['string', 'int', 'string', dwordPoint]],
    'J_BC_WD_RSASign': ['int', ['int', 'string', 'int', 'string', dwordPoint]],
    'J_BC_WD_ECCSign': ['int', ['string', 'int', 'string', dwordPoint]],
    'J_BC_WD_RSAVerifySign': ['int', ['int', 'string', 'int', 'string', dwordPoint]], // 注释跟头文件生命不一致
    'J_BC_WD_ECCVerifySign': ['int', ['string']],
    'J_BC_BE_Enc': ['int', ['string', 'int', 'int', 'string', 'string', dwordPoint]],
    'J_BC_BE_Dec': ['int', ['string', 'int', 'int', 'string', dwordPoint]],
    'J_BC_GS_CheckKeyPair': ['int', []],
    'J_BC_GS_ImportMPubKey': ['int', ['string', 'int']],
    'J_BC_GS_ImportUPriKey': ['int', ['string', 'int']],
    'J_BC_GS_Sign': ['int', ['string', 'int', 'string', dwordPoint]],
    'J_BC_GS_Verify': ['int', ['string', 'int', 'string', 'int']],
    'J_BC_WD_TradeSignProtect': ['int', ['string', 'int', 'int', 'string', 'string', dwordPoint]],
});

console.log('J_BC_WD_OpenDevice', ukey.J_BC_WD_OpenDevice());
// console.log('J_BC_WD_VerifyPin', ukey.J_BC_WD_VerifyPin('123345', 6));
// console.log('J_BC_WD_RSAGenKey', ukey.J_BC_WD_RSAGenKey());

// var pbPubKey = new Buffer(512).fill(' ');
// var pdwPubKeyLen = ref.alloc('ulong');
// pdwPubKeyLen.writeUInt32LE(512);
// console.log('J_BC_WD_RSAGetPubKey', ukey.J_BC_WD_RSAGetPubKey(pbPubKey, pdwPubKeyLen));
// pdwPubKeyLen = pdwPubKeyLen.readUInt32LE(0);
// console.log('RSA pbPubKey = ' + pbPubKey.toString('hex', 0, pdwPubKeyLen), 'pdwPubKeyLen = ' + pdwPubKeyLen);

// var pbPubKey = new Buffer(512).fill(' ');
// var pdwPubKeyLen = ref.alloc('ulong');
// pdwPubKeyLen.writeUInt32LE(512);
// console.log('J_BC_WD_ECCGetPubKey', ukey.J_BC_WD_ECCGetPubKey(pbPubKey, pdwPubKeyLen));
// pdwPubKeyLen = pdwPubKeyLen.readUInt32LE(0);
// console.log('ECC pbPubKey = ' + pbPubKey.toString('hex', 0, pdwPubKeyLen), 'pdwPubKeyLen = ' + pdwPubKeyLen);

// console.log("J_BC_WD_ImportRSACert", ukey.J_BC_WD_ImportRSACert('./data/ca.crt.pem'))

// ToDo pwdCertLen is wrong
// var pbCert = new Buffer(512).fill(' ');
// var pdwCertLen = ref.alloc('ulong');
// pdwCertLen.writeUInt32LE(0);
// console.log('J_BC_WD_ExPortRSACert', ukey.J_BC_WD_ExPortRSACert(pbCert, pdwCertLen));
// pdwCertLen = pdwCertLen.readUInt32LE(0);
// console.log('PortRSA pbCert = ' + pbCert.toString('hex', 0, pdwCertLen), 'pdwCertLen = ' + pdwCertLen);

// ToDo return -2
// var pbData = 'i love this world';
// var pbCipher = new Buffer(512).fill(' ');
// var pdwCipherLen = ref.alloc('ulong');
// pdwCipherLen.writeUInt32LE(0);
// console.log('J_BC_WD_RSAEncrypt', ukey.J_BC_WD_RSAEncrypt(pbData, pbData.length, pbCipher, pdwCipherLen));
// pdwCipherLen = pdwCipherLen.readUInt32LE(0);
// console.log('RSAEncrypt pbCipher = ' + pbCipher.toString('hex', 0, pdwCipherLen), 'pdwCipherLen = ' + pdwCipherLen);

// ToDo return -1
// var dwHashAlg = 1;
// var pbData = 'i love this world';
// var pbSign = new Buffer(512).fill(' ');
// var pdwSignLen = ref.alloc('ulong');
// pdwSignLen.writeUInt32LE(0);
// console.log('J_BC_WD_RSASign', ukey.J_BC_WD_RSASign(dwHashAlg, pbData, pbData.length, pbSign, pdwSignLen));
// pdwSignLen = pdwSignLen.readUInt32LE(0);
// console.log('RSASign pbSign = ' + pbSign.toString('hex', 0, pdwSignLen), 'pdwSignLen = ' + pdwSignLen);

console.log('J_BC_WD_CloseDevice', ukey.J_BC_WD_CloseDevice());
