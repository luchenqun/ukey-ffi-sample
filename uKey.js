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
    'J_BC_WD_ECCSign': ['int', ['string', 'int', 'string', dwordPoint]],  // 12 √
    'J_BC_WD_RSAVerifySign': ['int', ['int', 'string', 'int', 'string']], // 13 × 
    'J_BC_WD_ECCVerifySign': ['int', ['string']],  // 14 √
    'J_BC_BE_Enc': ['int', ['string', 'int', 'int', 'string', 'string', dwordPoint]],  // 15 √
    'J_BC_BE_Dec': ['int', ['string', 'int', 'int', 'string', dwordPoint]],  // 16 ×
    'J_BC_GS_CheckKeyPair': ['int', []],  // 17 √
    'J_BC_GS_ImportMPubKey': ['int', ['string', 'int']],  // 18 √
    'J_BC_GS_ImportUPriKey': ['int', ['string', 'int']],  // 19 ×
    'J_BC_GS_Sign': ['int', ['string', 'int', 'string', dwordPoint]],  // 20 ×
    'J_BC_GS_Verify': ['int', ['string', 'int', 'string', 'int']],  // 21 ×
    'J_BC_WD_TradeSignProtect': ['int', ['string', 'int', 'int', 'string', 'string', dwordPoint]],  // 22 √
});

// 01 J_BC_WD_OpenDevice ()
var J_BC_WD_OpenDevice = () => {
    console.log('J_BC_WD_OpenDevice', ukey.J_BC_WD_OpenDevice());
}

// 02 J_BC_WD_CloseDevice()
var J_BC_WD_CloseDevice = () => {
    console.log('J_BC_WD_CloseDevice', ukey.J_BC_WD_CloseDevice());
}

// 03 J_BC_WD_VerifyPin (IN BYTE *pbUserPin,IN DWORD dwUserPinLen)
var J_BC_WD_VerifyPin = () => {
    var pbUserPin = 'wa1111';
    var dwUserPinLen = pbUserPin.length;
    console.log('J_BC_WD_VerifyPin', ukey.J_BC_WD_VerifyPin(pbUserPin, dwUserPinLen));
}

// 04 J_BC_WD_RSAGenKey ()
var J_BC_WD_RSAGenKey = () => {
    console.log('J_BC_WD_RSAGenKey', ukey.J_BC_WD_RSAGenKey());
}

// 05 J_BC_WD_ECCGenKey ()
var J_BC_WD_ECCGenKey = () => {
    console.log('J_BC_WD_ECCGenKey', ukey.J_BC_WD_ECCGenKey());
}

// 06 J_BC_WD_RSAGetPubKey ( OUT BYTE *pbPubKey, OUT DWORD *pdwPubKeyLen)
var J_BC_WD_RSAGetPubKey = () => {
    var pbPubKey = Buffer.alloc(512);
    var pdwPubKeyLen = ref.alloc('ulong');
    pdwPubKeyLen.writeUInt32LE(512);
    console.log('J_BC_WD_RSAGetPubKey', ukey.J_BC_WD_RSAGetPubKey(pbPubKey, pdwPubKeyLen));
    pdwPubKeyLen = pdwPubKeyLen.readUInt32LE();
    console.log('RSA pbPubKey = ' + pbPubKey.toString('hex', 0, pdwPubKeyLen), 'pdwPubKeyLen = ' + pdwPubKeyLen);
}

// 07 J_BC_WD_ECCGetPubKey (OUT BYTE *pbPubKey, OUT DWORD *pdwPubKeyLen);
var J_BC_WD_ECCGetPubKey = () => {
    var pbPubKey = Buffer.alloc(512);
    var pdwPubKeyLen = ref.alloc('ulong');
    pdwPubKeyLen.writeUInt32LE(512);
    console.log('J_BC_WD_ECCGetPubKey', ukey.J_BC_WD_ECCGetPubKey(pbPubKey, pdwPubKeyLen));
    pdwPubKeyLen = pdwPubKeyLen.readUInt32LE();
    console.log('ECC pbPubKey = ' + pbPubKey.toString('hex', 0, pdwPubKeyLen), 'pdwPubKeyLen = ' + pdwPubKeyLen);
}

// 08 J_BC_WD_ImportRSACert( IN BYTE *pbCert)
var J_BC_WD_ImportRSACert = () => {
    console.log("J_BC_WD_ImportRSACert", ukey.J_BC_WD_ImportRSACert('./data/ca.crt.pem'))
}

// 09 J_BC_WD_ExPortRSACert( OUT BYTE *pbCert,OUT DWORD *pdwCertLen);
var J_BC_WD_ExPortRSACert = () => {
    var pbCert = Buffer.alloc(128);
    var pdwCertLen = ref.alloc('ulong');
    pdwCertLen.writeUInt32LE(128);
    console.log('J_BC_WD_ExPortRSACert', ukey.J_BC_WD_ExPortRSACert(pbCert, pdwCertLen));
    pdwCertLen = pdwCertLen.readUInt32LE();
    console.log('PortRSA pbCert = ' + JSON.stringify(pbCert.toString('ascii', 0, pdwCertLen)), 'pdwCertLen = ' + pdwCertLen);
}

// 10 J_BC_WD_RSAEncrypt(IN BYTE *pbData, IN DWORD dwDataLen, OUT BYTE*pbCipher, OUT DWORD* pdwCipherLen)
var J_BC_WD_RSAEncrypt = () => {
    // Note: pbCipher.length should equal pdwCipherLen
    var pbData = 'i love this world';
    var dwDataLen = pbData.length;
    var pbCipher = Buffer.alloc(512);
    var pdwCipherLen = ref.alloc('ulong');
    pdwCipherLen.writeUInt32LE(512);
    console.log('J_BC_WD_RSAEncrypt', ukey.J_BC_WD_RSAEncrypt(pbData, dwDataLen, pbCipher, pdwCipherLen));
    pdwCipherLen = pdwCipherLen.readUInt32LE();
    console.log('RSAEncrypt pbCipher = ' + pbCipher.toString('hex', 0, pdwCipherLen), 'pdwCipherLen = ' + pdwCipherLen);
}

// 11 J_BC_WD_RSASign (IN DWORD dwHashAlg, IN BYTE* pbData, IN DWORD dwDataLen, OUT BYTE* pbSign, OUT DWORD* pdwSignLen)
var J_BC_WD_RSASign = () => {
    var dwHashAlg = 3;
    var pbData = 'hello';
    var dwDataLen = pbData.length;
    var pbSign = Buffer.alloc(512);
    var pdwSignLen = ref.alloc('ulong');
    pdwSignLen.writeUInt32LE(pbSign.length);
    console.log('J_BC_WD_RSASign', ukey.J_BC_WD_RSASign(dwHashAlg, pbData, dwDataLen, pbSign, pdwSignLen));
    pdwSignLen = pdwSignLen.readUInt32LE();
    console.log('RSASign pbSign = ' + pbSign.toString('hex', 0, pdwSignLen), 'pdwSignLen = ' + pdwSignLen);
}

// 12 J_BC_WD_ECCSign (IN BYTE* pbMsgRlp,IN DWORD dwMsgRlpLen, OUT BYTE*pbSignRlp, OUT DWORD*pdwSignLen);
var J_BC_WD_ECCSign = () => {
    // pbMsgRlp 是rlp编码
    var tmp = 'F901FA808504E3B292008502540BE3FF941176FD5DC45001002EB2B893E5EF7C488475640780B901D4B1498E290000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000018A7B226964223A227371732D31222C226E616D65223A22535153222C22706172656E744964223A2261646D696E222C226465736372697074696F6E223A22626C6F636B636861696E20706C6174222C22636F6D6D6F6E4E616D65223A225465737431222C2273746174654E616D65223A224744222C22636F756E7472794E616D65223A22434E222C22656D61696C223A227465737431403132362E636F6D222C2274797065223A312C22656E6F64654C697374223A5B7B227075626B6579223A2230783331643137376235623261626133396531633330366331623333383334643234356538356435373763343332366237363162373334323365636139303063616536366638376432333430633135356634303238353832303663396533656566653830376363323433616636323864623138363064393965373132653535343862222C226970223A223139322E3136382E31302E3335222C22706F7274223A223130303031227D5D2C22726F6C6549644C697374223A5B5D2C2266696C6549644C697374223A5B5D7D000000000000';
    var pbMsgRlp = Buffer.from(tmp, 'hex');
    var dwMsgRlpLen = pbMsgRlp.length;
    var pbSignRlp = Buffer.alloc(1024);
    var pdwSignLen = ref.alloc('ulong');
    pdwSignLen.writeUInt32LE(pbSignRlp.length);
    console.log('J_BC_WD_ECCSign', ukey.J_BC_WD_ECCSign(pbMsgRlp, dwMsgRlpLen, pbSignRlp, pdwSignLen));
    pdwSignLen = pdwSignLen.readUInt32LE();
    console.log('ECCSign pbSign = ' + pbSignRlp.toString('hex', 0, pdwSignLen), 'pdwSignLen = ' + pdwSignLen);
}

// 13 J_BC_WD_RSAVerifySign(IN DWORD dwHashAlg, IN  BYTE* pbData, IN DWORD dwDataLen, IN BYTE* pbSign); 注释跟头文件生命不一致
var J_BC_WD_RSAVerifySign = () => {
    var dwHashAlg = 3;  // MD5:1,SHA1:2,SHA256:3,SHA3:4
    var ret = 0;
    var tmp = '560b6b3757fccd62882f5a5830c5482668c5e98226fb92219b0063bd6f1808d7b34171115ea8695120f77f3a6dc5f002e09c5c192c2642e8886fb61c3c10d0736cee98677399fb9299b419bba0ffa3d31ce8422c4242783a698712071f56325c9b0ce5570918f5ac2392d21ff9f507ba7bea7e5dd45fc0fa02713642dcaa68c8c78286313e1d48072be08374f9c0f1d36b49473a9bcefa79eeedf93cb2e2c73d75685652776600fc6ce444db182c14df0a4ab90810b65098d849129098ee84e573d95c1a5069549a9656b3f5c00fa999aa2e7e99f9c62773b75d41bda5209ade0d24b44071a217d0cc2a50ac5cc7f1d3ffc6085e432b7e43488feed247d73b0a';
    var pbData = Buffer.from(tmp, 'hex');
    var dwDataLen = pbData.length;
    var pbSign = Buffer.alloc(dwDataLen);
    console.log('J_BC_WD_RSAVerifySign', ret = ukey.J_BC_WD_RSAVerifySign(dwHashAlg, pbData, dwDataLen, pbSign));
    if (ret === 1) {
        console.log('RSAVerifySign pbSign = ' + pbSign.toString('hex', 0, pbSign.length));
    }
}

// 14 J_BC_WD_ECCVerifySign(IN BYTE* pbSignRlp)
var J_BC_WD_ECCVerifySign = () => {
    var tmp = 'f9023d808504e3b292008502540be3ff941176fd5dc45001002eb2b893e5ef7c488475640780b901d4b1498e290000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000018a7b226964223a227371732d31222c226e616d65223a22535153222c22706172656e744964223a2261646d696e222c226465736372697074696f6e223a22626c6f636b636861696e20706c6174222c22636f6d6d6f6e4e616d65223a225465737431222c2273746174654e616d65223a224744222c22636f756e7472794e616d65223a22434e222c22656d61696c223a227465737431403132362e636f6d222c2274797065223a312c22656e6f64654c697374223a5b7b227075626b6579223a2230783331643137376235623261626133396531633330366331623333383334643234356538356435373763343332366237363162373334323365636139303063616536366638376432333430633135356634303238353832303663396533656566653830376363323433616636323864623138363064393965373132653535343862222c226970223a223139322e3136382e31302e3335222c22706f7274223a223130303031227d5d2c22726f6c6549644c697374223a5b5d2c2266696c6549644c697374223a5b5d7d0000000000001ca0198b7f3a66019b8ba18da1d5dccd4c4b57281a4b5672a908bfcc0f957e7dbe08a069c688174d3d548ba3568640108a33cbd9ea14a14d2eba4887b74aae6c05248d';
    var pbSignRlp = Buffer.from(tmp, 'hex');
    console.log('J_BC_WD_ECCVerifySign', ukey.J_BC_WD_ECCVerifySign(pbSignRlp));
}

// 15 J_BC_BE_Enc(IN BYTE*pbMessage, IN DWORD dwMessage_Len, IN DWORD dwGroupNum, IN BYTE*pbGroup_PubKey, OUT BYTE*pbCipherText, OUT DWORD *pdwCipherText_Len)
var J_BC_BE_Enc = () => {
    var tmp = '3349fbeff062de101f8f43dc04fb4b523ea665c39b1f76fb7fd85d06d85287a5674fa519e2f89de5d81aca267aa00a3ef6590a532270b0142059e46641898b538be96503a2c72ff19af2c1a923b79a719258a7c22d3c0d2c817d629f79d7c7e7';
    var pbMessage = Buffer.from(tmp, 'hex');
    var dwMessage_Len = pbMessage.length;
    var dwGroupNum = 2;
    var pbGroup_PubKey = 'world';
    var pbCipherText = Buffer.alloc(512);
    var pdwCipherText_Len = ref.alloc('ulong');
    pdwCipherText_Len.writeUInt32LE(pbCipherText.length)
    console.log('J_BC_BE_Enc', ukey.J_BC_BE_Enc(pbMessage, dwMessage_Len, dwGroupNum, pbGroup_PubKey, pbCipherText, pdwCipherText_Len));
    pdwCipherText_Len = pdwCipherText_Len.readUInt32LE();
    console.log('BE_Enc pbCipherText = ' + pbCipherText.toString('hex', 0, pdwCipherText_Len), 'pdwCipherText_Len = ' + pdwCipherText_Len);
}

// 16 J_BC_BE_Dec(IN BYTE*pbCipherText, IN DWORD dwCipherText_Len, IN DWORD dwGroupNum, OUT BYTE*pbMessage, OUT DWORD*pdwMessage_Len)
var J_BC_BE_Dec = () => {
    var tmp = '227dcd62b2dc32fd2117e38f9c80d110b5df4b70cbe0bf770a6f954eb5d0da01da63b121ac4aca028a50e6718b44d43375ffad810962c6ece6c11718fd7a52d76efdb55b115fac7eb4bf288567a480362104bb19494c848dc62b0e237c92e58d16d45bcef4c56c33283b926f60b158c619b1b7eb5c9ffca19688e39d6d6cb603ea798098b23cf977876f3d2bd5a9506960707d8c89e22a8345851b8d85a20d282a29613d9ce1342774e35db6548bede9df3851557e3569cde0a521cb4fb695e09d00502290c38586f89a60dc7a1189534f05629810a4ad6464b696890e815cd3f6fffff4ffecf8812c02627399168621c1e83c241184e64dc970680588b21f98ea35b6aba54dcc624d7c07aad2434b4b136688e722a8fc19ea24e15dfc6f5246dcdbb3b8be2f4baf2b12b1e29bd575637c33618d3bd1c6b8a4494dbf9a80491cb43267af474b7607dbdf198c9ce23e24';
    var ret = 0;
    var pbCipherText = Buffer.from(tmp, 'hex');
    var dwCipherText_Len = pbCipherText.length;
    var dwGroupNum = 2;
    var pbMessage = Buffer.alloc(1024);
    var pdwMessage_Len = ref.alloc('ulong');
    pdwMessage_Len.writeUInt32LE(1024);
    console.log('J_BC_BE_Dec', ret = ukey.J_BC_BE_Dec(pbCipherText, dwCipherText_Len, dwGroupNum, pbMessage, pdwMessage_Len));
    if (ret === 1) {
        pdwMessage_Len = pdwMessage_Len.readUInt32LE();
        console.log('BE_Dec pbMessage = ' + pbMessage.toString('hex', 0, pdwMessage_Len), 'pdwMessage_Len = ' + pdwMessage_Len);
    }
}

// 17 J_BC_GS_CheckKeyPair()
var J_BC_GS_CheckKeyPair = () => {
    console.log('J_BC_GS_CheckKeyPair', ukey.J_BC_GS_CheckKeyPair());
}

// 18 J_BC_GS_ImportMPubKey(IN BYTE* pbMPubKey,IN DWORD dwMPubKey)
var J_BC_GS_ImportMPubKey = () => {
    var tmp = '248aa357395507e74130bf7e38196be8c000f279b1d0a1984ac098077db89a8f3c3e1a8f68c970041cabaf744baf408c6fd16eb1716f7a7ff6e0a4f61b6f7145aedb4830f347e9a8a97c573304cd80709e99356a5aec51574c0c42b9a2bae8a912ea5b0a7ee8dddfad3743f150cdee36b53b95f32220c13251cb8ee5dcbb76323377537273baf0e75381b828cd962ad7b662fac1ddc63ec38db198bf09105b0a551059faf7c013c3839b2d56cc360ae679b5c0df6e45a87b0a90c52152435ace732122c0d6fd9ffc1c3542b04fb938c900781185a1cce6c38670b85001d2220626bcd16c2ab8a00a91ef70e83d4db0e77cc9ddc8ce64844aa087b4c8c041a077';
    var pbMPubKey = Buffer.from(tmp, 'hex');
    var dwMPubKey = pbMPubKey.length;
    console.log('J_BC_GS_ImportMPubKey', ukey.J_BC_GS_ImportMPubKey(pbMPubKey, dwMPubKey));
}

// 19 J_BC_GS_ImportUPriKey(IN BYTE  *pbUPriKey,IN DWORD dwUPriKey)
var J_BC_GS_ImportUPriKey = () => {
    var tmp = '3349fbeff062de101f8f43dc04fb4b523ea665c39b1f76fb7fd85d06d85287a5674fa519e2f89de5d81aca267aa00a3ef6590a532270b0142059e46641898b538be96503a2c72ff19af2c1a923b79a719258a7c22d3c0d2c817d629f79d7c7e7';
    var pbUPriKey = Buffer.from(tmp, 'hex');
    var dwUPriKey = pbUPriKey.length;
    console.log('J_BC_GS_ImportUPriKey', ukey.J_BC_GS_ImportUPriKey(pbUPriKey, dwUPriKey));
}

// 20 J_BC_GS_Sign(IN BYTE* pbHash, IN DWORD dwHash, OUT BYTE*pbSign, OUT DWORD* pdwSignLen)
var J_BC_GS_Sign = () => {
    var tmp = 'f848368504e3b292008502540be3ff941176fd5dc45001002eb2b893e5ef7c488475640780a440a5737f000000000000000000000000000000000000000000000000000000000000001e';
    var ret = 0;
    var pbHash = Buffer.from(tmp, 'hex');
    var dwHash = pbHash.length;
    var pbSign = Buffer.alloc(512);
    var pdwSignLen = ref.alloc('ulong');
    pdwSignLen.writeUInt32LE(pbSign.length);
    console.log('J_BC_GS_Sign', ret = ukey.J_BC_GS_Sign(pbHash, dwHash, pbSign, pdwSignLen));
    if (ret === 1) {
        pdwSignLen = pdwSignLen.readUInt32LE();
        console.log('GSSign pbSign = ' + pbSign.toString('hex', 0, pdwSignLen), 'pdwSignLen = ' + pdwSignLen);
    }
}

// 21 J_BC_GS_Verify(IN BYTE* pbHash, IN DWORD dwHash, IN BYTE* pbSign, IN DWORD dwSignLen)
var J_BC_GS_Verify = () => {
    var tmp = 'f848368504e3b292008502540be3ff941176fd5dc45001002eb2b893e5ef7c488475640780a440a5737f000000000000000000000000000000000000000000000000000000000000001e';
    var pbHash = Buffer.from(tmp, 'hex');
    var dwHash = pbHash.length;
    var pbSign = 'i love this world';
    var pdwSignLen = pbSign.length;
    console.log('J_BC_GS_Verify', ukey.J_BC_GS_Verify(pbHash, dwHash, pbSign, pdwSignLen));
}

// 22 J_BC_WD_TradeSignProtect(IN  BYTE *pbMsg, IN DWORD dwMsg, IN DWORD dwGroupNum, IN BYTE *pbGroup_PubKey, OUT BYTE *pbSign, OUT DWORD *pdwSignLen)
var J_BC_WD_TradeSignProtect = () => {
    var tmp = 'f84b488504e3b292008502540be3ff941176fd5dc45001002eb2b893e5ef7c488475640780a440a5737f000000000000000000000000000000000000000000000000000000000000001e1c8080';
    var ret = 0;
    var pbMsg = Buffer.from(tmp, 'hex');
    var dwMsg = pbMsg.length;
    var dwGroupNum = 2;
    var pbGroup_PubKey = 'xxxxxx';
    var pbSign = Buffer.alloc(1024);
    var pdwSignLen = ref.alloc('ulong');
    pdwSignLen.writeUInt32LE(pbSign.length);
    console.log('J_BC_WD_TradeSignProtect', ret = ukey.J_BC_WD_TradeSignProtect(pbMsg, dwMsg, dwGroupNum, pbGroup_PubKey, pbSign, pdwSignLen));
    if (ret === 1) {
        pdwSignLen = pdwSignLen.readUInt32LE();
        console.log('TradeSignProtect pbSign = ' + pbSign.toString('hex', 0, pdwSignLen), 'pdwSignLen = ' + pdwSignLen);
    }
}

J_BC_WD_OpenDevice();

J_BC_WD_VerifyPin();

J_BC_WD_CloseDevice();

