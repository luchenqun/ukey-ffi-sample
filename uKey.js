var ffi = require('ffi');
var ref = require('ref');

// console.log(ref.types);

// 123345
var dwordPoint = ref.refType(ref.types.ulong);
var ukey = ffi.Library('./native/WDJuZhenAPIx64', {
    'J_BC_WD_OpenDevice': ['int', []],  // 01 √
    'J_BC_WD_CloseDevice': ['int', []],  // 02 √
    'J_BC_WD_VerifyPin': ['int', ['string', 'int']],  // 03 √
    'J_BC_WD_RSAGenKey': ['int', []],  // 04 √
    'J_BC_WD_ECCGenKey': ['int', []],  // 05 √
    'J_BC_WD_RSAGetPubKey': ['int', ['string', dwordPoint]],  // 06 √
    'J_BC_WD_ECCGetPubKey': ['int', ['string', dwordPoint]],  // 07 √
    'J_BC_WD_ImportRSACert': ['int', ['string']],  // 08 √
    'J_BC_WD_ExPortRSACert': ['int', ['string', dwordPoint]],  // 09 √
    'J_BC_WD_RSAEncrypt': ['int', ['string', 'int', 'string', dwordPoint]],  // 10 √
    'J_BC_WD_RSASign': ['int', ['int', 'string', 'int', 'string', dwordPoint]],  // 11 √
    'J_BC_WD_ECCSign': ['int', ['string', 'int', 'string', dwordPoint]],  // 12 ×
    'J_BC_WD_RSAVerifySign': ['int', ['int', 'string', 'int', 'string']], // 13 × 
    'J_BC_WD_ECCVerifySign': ['int', ['string']],  // 14 ×
    'J_BC_BE_Enc': ['int', ['string', 'int', 'int', 'string', 'string', dwordPoint]],  // 15 √
    'J_BC_BE_Dec': ['int', ['string', 'int', 'int', 'string', dwordPoint]],  // 16 ×
    'J_BC_GS_CheckKeyPair': ['int', []],  // 17 √
    'J_BC_GS_ImportMPubKey': ['int', ['string', 'int']],  // 18 ×
    'J_BC_GS_ImportUPriKey': ['int', ['string', 'int']],  // 19 ×
    'J_BC_GS_Sign': ['int', ['string', 'int', 'string', dwordPoint]],  // 20 ×
    'J_BC_GS_Verify': ['int', ['string', 'int', 'string', 'int']],  // 21 ×
    'J_BC_WD_TradeSignProtect': ['int', ['string', 'int', 'int', 'string', 'string', dwordPoint]],  // 22 ×
});

// 01 J_BC_WD_OpenDevice ()
console.log('J_BC_WD_OpenDevice', ukey.J_BC_WD_OpenDevice());

// 03 J_BC_WD_VerifyPin (IN BYTE *pbUserPin,IN DWORD dwUserPinLen)
// var pbUserPin = '123345';
// var dwUserPinLen = pbUserPin.length;
// console.log('J_BC_WD_VerifyPin', ukey.J_BC_WD_VerifyPin(pbUserPin, dwUserPinLen));

// 04 J_BC_WD_RSAGenKey ()
// console.log('J_BC_WD_RSAGenKey', ukey.J_BC_WD_RSAGenKey());

// 05 J_BC_WD_ECCGenKey ()
// console.log('J_BC_WD_ECCGenKey', ukey.J_BC_WD_ECCGenKey());

// 06 J_BC_WD_RSAGetPubKey ( OUT BYTE *pbPubKey, OUT DWORD *pdwPubKeyLen)
// var pbPubKey = Buffer.alloc(512);
// var pdwPubKeyLen = ref.alloc('ulong');
// pdwPubKeyLen.writeUInt32LE(512);
// console.log('J_BC_WD_RSAGetPubKey', ukey.J_BC_WD_RSAGetPubKey(pbPubKey, pdwPubKeyLen));
// pdwPubKeyLen = pdwPubKeyLen.readUInt32LE(0);
// console.log('RSA pbPubKey = ' + pbPubKey.toString('hex', 0, pdwPubKeyLen), 'pdwPubKeyLen = ' + pdwPubKeyLen);

// 07 J_BC_WD_ECCGetPubKey (OUT BYTE *pbPubKey, OUT DWORD *pdwPubKeyLen);
// var pbPubKey = Buffer.alloc(512);
// var pdwPubKeyLen = ref.alloc('ulong');
// pdwPubKeyLen.writeUInt32LE(512);
// console.log('J_BC_WD_ECCGetPubKey', ukey.J_BC_WD_ECCGetPubKey(pbPubKey, pdwPubKeyLen));
// pdwPubKeyLen = pdwPubKeyLen.readUInt32LE(0);
// console.log('ECC pbPubKey = ' + pbPubKey.toString('hex', 0, pdwPubKeyLen), 'pdwPubKeyLen = ' + pdwPubKeyLen);

// 08 J_BC_WD_ImportRSACert( IN BYTE *pbCert)
// console.log("J_BC_WD_ImportRSACert", ukey.J_BC_WD_ImportRSACert('./data/ca.crt.pem'))

// 09 J_BC_WD_ExPortRSACert( OUT BYTE *pbCert,OUT DWORD *pdwCertLen);
// var pbCert = Buffer.alloc(128);
// var pdwCertLen = ref.alloc('ulong');
// pdwCertLen.writeUInt32LE(128);
// console.log('J_BC_WD_ExPortRSACert', ukey.J_BC_WD_ExPortRSACert(pbCert, pdwCertLen));
// pdwCertLen = pdwCertLen.readUInt32LE(0);
// console.log('PortRSA pbCert = ' + JSON.stringify(pbCert.toString('ascii', 0, pdwCertLen)), 'pdwCertLen = ' + pdwCertLen);

// 10 J_BC_WD_RSAEncrypt(IN BYTE *pbData, IN DWORD dwDataLen, OUT BYTE*pbCipher, OUT DWORD* pdwCipherLen)
// Note: pbCipher.length should equal pdwCipherLen
// var pbData = 'i love this world';
// var dwDataLen = pbData.length;
// var pbCipher = Buffer.alloc(512);
// var pdwCipherLen = ref.alloc('ulong');
// pdwCipherLen.writeUInt32LE(512);
// console.log('J_BC_WD_RSAEncrypt', ukey.J_BC_WD_RSAEncrypt(pbData, dwDataLen, pbCipher, pdwCipherLen));
// pdwCipherLen = pdwCipherLen.readUInt32LE(0);
// console.log('RSAEncrypt pbCipher = ' + pbCipher.toString('hex', 0, pdwCipherLen), 'pdwCipherLen = ' + pdwCipherLen);

// 11 J_BC_WD_RSASign (IN DWORD dwHashAlg, IN BYTE* pbData, IN DWORD dwDataLen, OUT BYTE* pbSign, OUT DWORD* pdwSignLen)
var dwHashAlg = 3;
var pbData = 'hello';
var dwDataLen = pbData.length;
var pbSign = Buffer.alloc(512);
var pdwSignLen = ref.alloc('ulong');
pdwSignLen.writeUInt32LE(512);
console.log('J_BC_WD_RSASign', ukey.J_BC_WD_RSASign(dwHashAlg, pbData, dwDataLen, pbSign, pdwSignLen));
pdwSignLen = pdwSignLen.readUInt32LE(0);
console.log('RSASign pbSign = ' + pbSign.toString('hex', 0, pdwSignLen), 'pdwSignLen = ' + pdwSignLen);

// 12 J_BC_WD_ECCSign (IN BYTE* pbMsgRlp,IN DWORD dwMsgRlpLen, OUT BYTE*pbSignRlp, OUT DWORD*pdwSignLen);
// var pbMsgRlp = 'F901FA808504E3B292008502540BE3FF941176FD5DC45001002EB2B893E5EF7C488475640780B901D4B1498E290000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000018A7B226964223A227371732D31222C226E616D65223A22535153222C22706172656E744964223A2261646D696E222C226465736372697074696F6E223A22626C6F636B636861696E20706C6174222C22636F6D6D6F6E4E616D65223A225465737431222C2273746174654E616D65223A224744222C22636F756E7472794E616D65223A22434E222C22656D61696C223A227465737431403132362E636F6D222C2274797065223A312C22656E6F64654C697374223A5B7B227075626B6579223A2230783331643137376235623261626133396531633330366331623333383334643234356538356435373763343332366237363162373334323365636139303063616536366638376432333430633135356634303238353832303663396533656566653830376363323433616636323864623138363064393965373132653535343862222C226970223A223139322E3136382E31302E3335222C22706F7274223A223130303031227D5D2C22726F6C6549644C697374223A5B5D2C2266696C6549644C697374223A5B5D7D000000000000';
// var dwMsgRlpLen = pbMsgRlp.length;
// var pbSignRlp = Buffer.alloc(1024);
// var pdwSignLen = ref.alloc('ulong');
// pdwSignLen.writeUInt32LE(pbSignRlp.length);
// console.log('J_BC_WD_ECCSign begin', dwMsgRlpLen);
// console.log('J_BC_WD_ECCSign', ukey.J_BC_WD_ECCSign(pbMsgRlp, dwMsgRlpLen, pbSignRlp, pdwSignLen));
// console.log('J_BC_WD_ECCSign end');
// pdwSignLen = pdwSignLen.readUInt32LE(0);
// console.log('ECCSign pbSign = ' + pbSignRlp.toString('hex', 0, pdwSignLen), 'pdwSignLen = ' + pdwSignLen);

// 13 J_BC_WD_RSAVerifySign(IN DWORD dwHashAlg, IN  BYTE* pbData, IN DWORD dwDataLen, IN BYTE* pbSign); 注释跟头文件生命不一致
// var dwHashAlg = 3;  // MD5:1,SHA1:2,SHA256:3,SHA3:4
// var pbData = '16cd0206ff94e8dd106e9c9a813c8b38fbb30407b2449d8d4b4b21afdd8bf3b423d73d13414fee8bf3ef149809c8a093bbe76c0b055483820c4b877496c438ecdae39840b306ca77cf25cce05a2d487ae05a6a14b5bf521112c0c67d05eae3d43b4ec6e966b615483d6299b010ad80e2585e8d63de188e774a92ed176392c417a31829986155003396adfe3b8950dc7217e97ca8d95ab2a62774c1b0a0ee421d37875da07b87c21e123fca2e6e585f27bc72c9257936ce4607064b092fdb5b29238351b24247c33729c2cd222bf211f85e1b351dcb0d12368e011ba4a7786f95abee2d8518c2d57ee88e5e73d5be1e52fd1cf4274ca7102dddb807d1b6851ac7';
// var dwDataLen = pbData.length;
// var pbSign = Buffer.alloc(512).fill('0');
// console.log('J_BC_WD_RSAVerifySign', ukey.J_BC_WD_RSAVerifySign(dwHashAlg, pbData, dwDataLen, pbSign));
// console.log('RSAVerifySign pbSign = ' + pbSign.toString('ascii', 0, pbSign.length));

// 14 J_BC_WD_ECCVerifySign(IN BYTE* pbSignRlp)
// var pbSignRlp = 'ilovethisworld';
// console.log('J_BC_WD_ECCVerifySign begin')
// console.log('J_BC_WD_ECCVerifySign', ukey.J_BC_WD_ECCVerifySign(pbSignRlp));
// console.log('J_BC_WD_ECCVerifySign end')

// 15 J_BC_BE_Enc(IN BYTE*pbMessage, IN DWORD dwMessage_Len, IN DWORD dwGroupNum, IN BYTE*pbGroup_PubKey, OUT BYTE*pbCipherText, OUT DWORD *pdwCipherText_Len)
// var pbMessage = 'hello';
// var dwMessage_Len = pbMessage.length;
// var dwGroupNum = 2;
// var pbGroup_PubKey = 'world';
// var pbCipherText = Buffer.alloc(512).fill('0');
// var pdwCipherText_Len = ref.alloc('ulong');
// pdwCipherText_Len.writeUInt32LE(pbCipherText.length)
// console.log('J_BC_BE_Enc', ukey.J_BC_BE_Enc(pbMessage, dwMessage_Len, dwGroupNum, pbGroup_PubKey, pbCipherText, pdwCipherText_Len));
// pdwCipherText_Len = pdwCipherText_Len.readUInt32LE(0);
// console.log('BE_Enc pbCipherText = ' + pbCipherText.toString('hex', 0, pdwCipherText_Len), 'pdwCipherText_Len = ' + pdwCipherText_Len);

// 16 J_BC_BE_Dec(IN BYTE*pbCipherText, IN DWORD dwCipherText_Len, IN DWORD dwGroupNum, OUT BYTE*pbMessage, OUT DWORD*pdwMessage_Len)
// var pbCipherText = "hello";
// var dwCipherText_Len = pbCipherText.length;
// var dwGroupNum = 2;
// var pbMessage = Buffer.alloc(1024).fill('0');
// var pdwMessage_Len = ref.alloc('ulong');
// pdwMessage_Len.writeUInt32LE(1024);
// console.log('J_BC_BE_Dec', ukey.J_BC_BE_Dec(pbCipherText, dwCipherText_Len, dwGroupNum, pbMessage, pdwMessage_Len));
// pdwMessage_Len = pdwMessage_Len.readUInt32LE(0);
// console.log('BE_Dec pbMessage = ' + pbMessage.toString('hex', 0, pdwMessage_Len), 'pdwMessage_Len = ' + pdwMessage_Len);

// 17 J_BC_GS_CheckKeyPair()
// console.log('J_BC_GS_CheckKeyPair', ukey.J_BC_GS_CheckKeyPair());

// 18 J_BC_GS_ImportMPubKey(IN BYTE* pbMPubKey,IN DWORD dwMPubKey)
// var pbMPubKey = '248aa357395507e74130bf7e38196be8c000f279b1d0a1984ac098077db89a8f3c3e1a8f68c970041cabaf744baf408c6fd16eb1716f7a7ff6e0a4f61b6f7145aedb4830f347e9a8a97c573304cd80709e99356a5aec51574c0c42b9a2bae8a912ea5b0a7ee8dddfad3743f150cdee36b53b95f32220c13251cb8ee5dcbb76323377537273baf0e75381b828cd962ad7b662fac1ddc63ec38db198bf09105b0a551059faf7c013c3839b2d56cc360ae679b5c0df6e45a87b0a90c52152435ace732122c0d6fd9ffc1c3542b04fb938c900781185a1cce6c38670b85001d2220626bcd16c2ab8a00a91ef70e83d4db0e77cc9ddc8ce64844aa087b4c8c041a077';
// var dwMPubKey = pbMPubKey.length;
// console.log('J_BC_GS_ImportMPubKey', ukey.J_BC_GS_ImportMPubKey(pbMPubKey, dwMPubKey));

// 19 J_BC_GS_ImportUPriKey(IN BYTE  *pbUPriKey,IN DWORD dwUPriKey)
// var pbUPriKey = '3349fbeff062de101f8f43dc04fb4b523ea665c39b1f76fb7fd85d06d85287a5674fa519e2f89de5d81aca267aa00a3ef6590a532270b0142059e46641898b538be96503a2c72ff19af2c1a923b79a719258a7c22d3c0d2c817d629f79d7c7e7';
// var dwUPriKey = pbUPriKey.length;
// console.log('J_BC_GS_ImportUPriKey', ukey.J_BC_GS_ImportUPriKey(pbUPriKey, dwUPriKey));

// 20 J_BC_GS_Sign(IN BYTE* pbHash, IN DWORD dwHash, OUT BYTE*pbSign, OUT DWORD* pdwSignLen)
// var pbHash = 'f848368504e3b292008502540be3ff941176fd5dc45001002eb2b893e5ef7c488475640780a440a5737f000000000000000000000000000000000000000000000000000000000000001e';
// var dwHash = pbHash.length;
// var pbSign = Buffer.alloc(512);
// var pdwSignLen = ref.alloc('ulong');
// pdwSignLen.writeUInt32LE(512);
// console.log('J_BC_GS_Sign', ukey.J_BC_GS_Sign(pbHash, dwHash, pbSign, pdwSignLen));
// pdwSignLen = pdwSignLen.readUInt32LE(0);
// console.log('GSSign pbSign = ' + pbSign.toString('hex', 0, pdwSignLen), 'pdwSignLen = ' + pdwSignLen);

// 21 J_BC_GS_Verify(IN BYTE* pbHash, IN DWORD dwHash, IN BYTE* pbSign, IN DWORD dwSignLen)
// var pbHash = 'i love this world';
// var dwHash = pbHash.length;
// var pbSign = 'i love this world';
// var pdwSignLen = pbSign.length;
// console.log('J_BC_GS_Verify', ukey.J_BC_GS_Verify(pbHash, dwHash, pbSign, pdwSignLen));

// 22 J_BC_WD_TradeSignProtect(IN  BYTE *pbMsg, IN DWORD dwMsg, IN DWORD dwGroupNum, IN BYTE *pbGroup_PubKey, OUT BYTE *pbSign, OUT DWORD *pdwSignLen)
// var pbMsg = 'f84b488504e3b292008502540be3ff941176fd5dc45001002eb2b893e5ef7c488475640780a440a5737f000000000000000000000000000000000000000000000000000000000000001e1c8080';
// var dwMsg = pbMsg.length;
// var dwGroupNum = 2;
// var pbGroup_PubKey = 'xxxxxx';
// var pbSign = Buffer.alloc(128);
// var pdwSignLen = ref.alloc('ulong');
// pdwSignLen.writeUInt32LE(128);
// console.log('J_BC_WD_TradeSignProtect', ukey.J_BC_WD_TradeSignProtect(pbMsg, dwMsg, dwGroupNum, pbGroup_PubKey, pbSign, pdwSignLen));
// pdwSignLen = pdwSignLen.readUInt32LE(0);
// console.log('TradeSignProtect pbSign = ' + pbSign.toString('hex', 0, pdwSignLen), 'pdwSignLen = ' + pdwSignLen);

// 02 J_BC_WD_CloseDevice()
console.log('J_BC_WD_CloseDevice', ukey.J_BC_WD_CloseDevice());
