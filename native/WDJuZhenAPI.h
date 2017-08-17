#ifndef WD_JUZHEN_API_H
#define WD_JUZHEN_API_H



#define  WD_JUZHEN_ERROR  0             //失败
#define  WD_JUZHEN_OK     1             //成功
#define  WD_JUZHEN_PARAM_ERROR -1       //输入参数错误
#define  WD_JUZHEN_MEMORY_ERROR  -2 //  //传入BUF的空间不足
#define  WD_JUZHEN_DEV_ERROR    -3      //打开设备失败
#define  WD_JUZHEN_NOKEY       -4       //没有指定的密钥


#ifdef _cplusplus
extern "C"
{
#endif
/*******************************************
J_WD_OpenDevice
函数功能及说明:
    创建USBKEY设备上下文并打开USBKEY设备。
返回值：
    0: 失败  1: 打开设备成功。
********************************************/

LONG32 WINAPI J_BC_WD_OpenDevice ();


/*******************************************
J_WD_CloseDevice
函数功能及说明:
    关闭USBKEY设备，并释放设备上下文。
返回值：
    0: 失败  1: 关闭设备成功。
********************************************/

LONG32 WINAPI J_BC_WD_CloseDevice();


/*******************************************
J_BC_WD_VerifyPin
函数功能及说明：
    验证用户口令。
参数：
    pbUserPin: 用户PIN。
    dwUserPinLen：用户PIN长度。
返回值：
	0: 失败 1:成功
********************************************/
LONG32 WINAPI J_BC_WD_VerifyPin (IN BYTE *pbUserPin,IN DWORD dwUserPinLen);


/*******************************************
J_BC_WD_RSAGenKey
函数功能及说明：
    在USBKEY中生成指定类型的密钥对。
参数：

返回值：
	0: 失败 1:成功
********************************************/


LONG32 WINAPI J_BC_WD_RSAGenKey ();


/*******************************************
J_BC_WD_ECCGenKey
函数功能及说明：
    在USBKEY中生成指定类型的密钥对。
参数：

返回值：
	0: 失败 1:成功
********************************************/


LONG32 WINAPI J_BC_WD_ECCGenKey();


/*******************************************
J_BC_WD_RSAGetPubKey
函数功能及说明：
    导出指定密钥类型的公钥。
参数：

	pbPubKey：生成的用户公钥。      RSA2048：N|E
	pdwPubKeyLen：用户公钥的长度。  RSA2048：256+3；ECDSA：64
返回值：
	0: 失败 1:成功
********************************************/
LONG32 WINAPI J_BC_WD_RSAGetPubKey ( OUT BYTE *pbPubKey, OUT DWORD *pdwPubKeyLen);


/*******************************************
J_BC_WD_ECCGetPubKey
函数功能及说明：
    导出指定密钥类型的公钥。
参数：

	pbPubKey：生成的用户公钥。      RSA2048：N|E
	pdwPubKeyLen：用户公钥的长度。  RSA2048：256+3；ECDSA：64
返回值：
	0: 失败 1:成功
********************************************/
LONG32 WINAPI J_BC_WD_ECCGetPubKey (OUT BYTE *pbPubKey, OUT DWORD *pdwPubKeyLen);


/*******************************************
J_BC_WD_ImportRSACert
函数功能及说明：
    导入RSA2048证书到USBKEY中。证书编码格式为PEM或者DER。
参数：
    pbCert:证书数据
返回值：
	0: 失败 1:成功
********************************************/
LONG32 WINAPI J_BC_WD_ImportRSACert( IN BYTE *pbCert);


/*******************************************
J_BC_WD_ExPortRSACert
函数功能及说明：
    导出RSA2048证书。证书编码格式为PEM。
参数：
    pbCert:证书数据
返回值：
	0: 失败 1:成功
********************************************/
LONG32 WINAPI J_BC_WD_ExPortRSACert( OUT BYTE *pbCert,OUT DWORD *pdwCertLen);


/*******************************************
J_BC_WD_RSAEncrypt
函数功能及说明：
    RSA加密。
参数：

   pbData：明文数据
   dwDataLen：明文长度
   pbCipher：密文
   pdwCipherLen：密文数据长度

返回值：
	0: 失败 1:成功
********************************************/
LONG32 WINAPI J_BC_WD_RSAEncrypt(
								 IN BYTE *pbData,
								 IN DWORD dwDataLen,
								 OUT BYTE*pbCipher,
								 OUT DWORD* pdwCipherLen);



/*******************************************
J_BC_WD_RSASign
函数功能及说明：
    支持RSA2048密钥对签名。
参数：
	dwHashAlg:Hash算法，MD5:1,SHA1:2,SHA256:3,SHA3:4
	pbData: 待签名消息数据。
	dwDataLen：待签名消息数据长度。
	pbSign：签名值。
	pdwSignLen：签名值长度。

返回值：
	0: 失败 1:成功
********************************************/


LONG32 WINAPI J_BC_WD_RSASign (
								IN DWORD     dwHashAlg,
								IN BYTE*       pbData,
								IN DWORD     dwDataLen,
								OUT BYTE*     pbSign,
								OUT DWORD*   pdwSignLen
							  );

/*******************************************
J_BC_WD_ECCSign
函数功能及说明：
    支持ECDSA签名。
	以太坊中ECDSA签名输入的格式如下：
	0xf7+BytesNum||len||m
	其中len = length(m)表示m的字节数（字节数>55）。BytesNum为表示len需要的字节数。


	以太坊ECDSA签名输出格式如下：
	签名得到(v, r, s)，输出：
	0xf7+BytesNum2||len+67||m||v||a0||r||a0||s
	其中BytesNum2为表示len+67需要的字节数。67为（v||a0||r||a0||s）的字节长度。

参数：

	pbMsgRlp: 待签名消息数据。
	dwMsgRlpLen:消息长度
	pbSignRlp：签名值。
	pdwSignLen：签名值长度。

返回值：
	0: 失败 1:成功
********************************************/


LONG32 WINAPI J_BC_WD_ECCSign (
							IN BYTE*     pbMsgRlp,
							IN DWORD     dwMsgRlpLen,
							OUT BYTE*    pbSignRlp,
							OUT DWORD*   pdwSignLen
			              );




/*******************************************
J_BC_WD_RSAVerifySign
函数功能及说明：
    支持RSA2048密钥对验签。

参数：

	dwHashAlg:Hash算法，MD5:1,SHA1:2,SHA256:3,SHA3:4
	pbData: 待签名消息数据。
	dwDataLen：待签名消息数据长度。
	pbSign：签名值。
	pdwSignLen：签名值长度。

返回值：
	0: 失败 1:成功

********************************************/
LONG32 WINAPI J_BC_WD_RSAVerifySign(
								 IN DWORD dwHashAlg,
								 IN  BYTE* pbData,
								 IN DWORD dwDataLen,
								 IN BYTE* pbSign);


/*******************************************
J_BC_WD_ECCVerifySign
函数功能及说明：
  支持ECC验签。

  以太坊ECDSA签名输出格式如下：
  签名得到(v, r, s)，输出：
  0xf7+BytesNum2||len+67||m||v||a0||r||a0||s
  其中BytesNum2为表示len+67需要的字节数。67为（v||a0||r||a0||s）的字节长度。

参数：

	pbSignRlp:签名值

返回值：
	0: 失败 1:成功
********************************************/
LONG32 WINAPI J_BC_WD_ECCVerifySign(IN BYTE* pbSignRlp);



/*******************************************
J_BC_BE_Enc
函数功能及说明：
   根据广播加密算法机制对数据进行加密。
参数：
   pbMessage： [in]待加密的明文数据
   nMessage_Len: [in]明文数据的字节长度
   nGroupNum: [in]群成员个数（小于100）
   pbGroup_PubKey [in]群成员公钥（长度nGroupNum*Point_Len）
   pbCipherText = C1||C2||C3||C4，[out], 其中的参数解释如下：
      C1: [out]密文数据（长度：64）
      C2: [out]密文数据（长度：32）
      C3: [out]密文数据，（长度：nGroupNum*(64)）
      C4: [out]密文数据（AES 密文）
   pnCipherText_Len: [out]密文长度

返回值：
	0: 失败 1:成功
********************************************/
LONG32 WINAPI J_BC_BE_Enc(
						   IN BYTE*   pbMessage,
						   IN DWORD   dwMessage_Len,
						   IN DWORD   dwGroupNum,
						   IN BYTE*   pbGroup_PubKey,
						   OUT BYTE*  pbCipherText,
						   OUT DWORD  *pdwCipherText_Len
						);


/*******************************************
J_BC_BE_Dec
函数功能及说明：
    ECC广播解密。
参数：
    pbCipherText: [in]密文数据
    nCipherText_Len: [in]密文长度
    nGroupNum: [in]群成员个数（小于100）
	pbMessage: [out]解密的明文数据
    pnMessage_Len: [out]明文数据的字节长度
返回值：
	0: 失败 1:成功
********************************************/
LONG32 WINAPI J_BC_BE_Dec(
			              IN  BYTE*   pbCipherText,
			              IN  DWORD   dwCipherText_Len,
			              IN  DWORD   dwGroupNum,
			              OUT BYTE*   pbMessage,
			              OUT DWORD*  pdwMessage_Len
			            );


/*******************************************
J_BC_GS_CheckKeyPair
函数功能及说明：
    判断用户私钥和系统公钥是否已导入。

返回值：
	0: 失败 1:成功   -4：未导入
********************************************/
LONG32 WINAPI J_BC_GS_CheckKeyPair();


/*******************************************
J_BC_GS_ImportMPubKey
函数功能及说明：
    导入群签名系统公钥。
参数：

    pbMPubKey: [in]群签名系统公钥
    dwMPubKey: [in]系统公钥长度

返回值：
	0: 失败 1:成功
********************************************/
LONG32 WINAPI J_BC_GS_ImportMPubKey(IN BYTE* pbMPubKey,IN DWORD dwMPubKey);



/*******************************************
J_BC_GS_ImportUPriKey
函数功能及说明：
    导入群签名用户私钥。
参数：

    pbUPriKey: [in]群签名用户私钥
    dwUPriKey: [in]用户私钥长度

返回值：
	0: 失败 1:成功
********************************************/
LONG32 WINAPI J_BC_GS_ImportUPriKey(IN BYTE  *pbUPriKey,IN DWORD dwUPriKey);



/*******************************************
J_BC_GS_Sign
函数功能及说明：
    群签名。
参数：
    pbHash:[in]签名消息的摘要
    dwHash:[in]摘要长度
    pbSign:[out]签名值
	pdwSignLen:[out]签名值长度

返回值：
	0: 失败 1:成功
********************************************/
LONG32 WINAPI J_BC_GS_Sign(IN BYTE*   pbHash,
						   IN DWORD   dwHash,
						   OUT BYTE*  pbSign,
						   OUT DWORD* pdwSignLen
					      );


/*******************************************
J_BC_GS_Verify
函数功能及说明：
    群签名。
参数：
    pbHash:[in]签名消息的摘要
    dwHash:[in]摘要长度
    pbSign:[in]签名值
	pdwSignLen:[in]签名值长度

返回值：
	0: 失败 1:成功
********************************************/
LONG32 WINAPI J_BC_GS_Verify(IN BYTE*   pbHash,
							 IN DWORD   dwHash,
							 IN BYTE*   pbSign,
					         IN DWORD   dwSignLen);



/*******************************************
J_BC_WD_TradeSignProtect
函数功能及说明：
    交易隐私保护接口：即以交易为输入，先对交易进行ECDSA签名，再对整个数据和签名进行广播加密，最后对整个密文进行群签名作为输出。
参数：
    dwKeyUsage：生成的ECCKey的密钥用途 1:AT_KEYEXCHANGE，2：AT_SIGNATURE
    pbMsg:[in]待签名的交易数据原文
    dwMsg:[in]交易数据长度
	nGroupNum: [in]群成员个数（小于100）
    pbGroup_PubKey [in]群成员公钥（长度nGroupNum*Point_Len）
    pbSign:[in]签名值
	pdwSignLen:[in]签名值长度

返回值：
	0: 失败 1:成功
********************************************/
LONG32 WINAPI J_BC_WD_TradeSignProtect(
									   IN  BYTE    *pbMsg,
                                       IN  DWORD   dwMsg,
									   IN  DWORD   dwGroupNum,
									   IN  BYTE    *pbGroup_PubKey,
                                       OUT BYTE    *pbSign,
                                       OUT DWORD   *pdwSignLen
									   );

//ECC加密
WDScardEncrypt_ECIES(
	IN LPBYTE pbData,
	IN DWORD dwDataLen,
	OUT LPBYTE pbEncryptedData,
	OUT LPDWORD pdwEncryptedDataLen
	)

//ECC解密
WDScardDecrypt_ECIES(
	IN LPBYTE pbEncryptedData,
	IN DWORD dwEncryptedDataLen,
	OUT LPBYTE pbDecryptedData,
	OUT PDWORD pdwDecryptedDataLen
	);

//以下为调试接口，现版本dll已经屏蔽
LONG32 WINAPI J_BC_WD_ECCImportKeyPair(BYTE *pbPriKey,DWORD dwPriKeyLen,BYTE *pbPubKey,DWORD dwPubKeyLen);

LONG32 WINAPI J_BC_WD_ECCGetPriKey (OUT BYTE *pbPriKey, OUT DWORD *pdwPriKeyLen);
LONG32 WINAPI J_BC_WD_GetAESKey (OUT BYTE *pbAESKey, OUT DWORD *pdwAESKeyLen);


#ifdef _cplusplus
}
#endif
#endif
