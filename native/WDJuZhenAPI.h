#ifndef WD_JUZHEN_API_H
#define WD_JUZHEN_API_H



#define  WD_JUZHEN_ERROR  0             //ʧ��
#define  WD_JUZHEN_OK     1             //�ɹ�
#define  WD_JUZHEN_PARAM_ERROR -1       //�����������
#define  WD_JUZHEN_MEMORY_ERROR  -2 //  //����BUF�Ŀռ䲻��
#define  WD_JUZHEN_DEV_ERROR    -3      //���豸ʧ��
#define  WD_JUZHEN_NOKEY       -4       //û��ָ������Կ


#ifdef _cplusplus
extern "C"
{
#endif
/*******************************************
J_WD_OpenDevice 
�������ܼ�˵��:
    ����USBKEY�豸�����Ĳ���USBKEY�豸��
����ֵ��
    0: ʧ��  1: ���豸�ɹ���
********************************************/
// 01
LONG32 WINAPI J_BC_WD_OpenDevice ();


/*******************************************
J_WD_CloseDevice
�������ܼ�˵��:
    �ر�USBKEY�豸�����ͷ��豸�����ġ�
����ֵ��
    0: ʧ��  1: �ر��豸�ɹ���
********************************************/
// 02
LONG32 WINAPI J_BC_WD_CloseDevice();


/*******************************************
J_BC_WD_VerifyPin
�������ܼ�˵����
    ��֤�û����
������
    pbUserPin: �û�PIN��
    dwUserPinLen���û�PIN���ȡ�
����ֵ��
	0: ʧ�� 1:�ɹ�
********************************************/
// 03
LONG32 WINAPI J_BC_WD_VerifyPin (IN BYTE *pbUserPin,IN DWORD dwUserPinLen);


/*******************************************
J_BC_WD_RSAGenKey
�������ܼ�˵����
    ��USBKEY������ָ�����͵���Կ�ԡ�
������

����ֵ��
	0: ʧ�� 1:�ɹ�
********************************************/

// 04
LONG32 WINAPI J_BC_WD_RSAGenKey ();


/*******************************************
J_BC_WD_ECCGenKey
�������ܼ�˵����
    ��USBKEY������ָ�����͵���Կ�ԡ�
������

����ֵ��
	0: ʧ�� 1:�ɹ�
********************************************/

// 05
LONG32 WINAPI J_BC_WD_ECCGenKey();

 
/*******************************************
J_BC_WD_RSAGetPubKey
�������ܼ�˵����
    ����ָ����Կ���͵Ĺ�Կ��
������
  
	pbPubKey�����ɵ��û���Կ��      RSA2048��N|E    
	pdwPubKeyLen���û���Կ�ĳ��ȡ�  RSA2048��256+3��ECDSA��64
����ֵ��
	0: ʧ�� 1:�ɹ�
********************************************/
// 06
LONG32 WINAPI J_BC_WD_RSAGetPubKey ( OUT BYTE *pbPubKey, OUT DWORD *pdwPubKeyLen);


/*******************************************
J_BC_WD_ECCGetPubKey
�������ܼ�˵����
    ����ָ����Կ���͵Ĺ�Կ��
������
  
	pbPubKey�����ɵ��û���Կ��      RSA2048��N|E    
	pdwPubKeyLen���û���Կ�ĳ��ȡ�  RSA2048��256+3��ECDSA��64
����ֵ��
	0: ʧ�� 1:�ɹ�
********************************************/
// 07
LONG32 WINAPI J_BC_WD_ECCGetPubKey (OUT BYTE *pbPubKey, OUT DWORD *pdwPubKeyLen);


/*******************************************
J_BC_WD_ImportRSACert
�������ܼ�˵����
    ����RSA2048֤�鵽USBKEY�С�֤������ʽΪPEM����DER��
������
    pbCert:֤������
����ֵ��
	0: ʧ�� 1:�ɹ�
********************************************/
// 08
LONG32 WINAPI J_BC_WD_ImportRSACert( IN BYTE *pbCert);


/*******************************************
J_BC_WD_ExPortRSACert
�������ܼ�˵����
    ����RSA2048֤�顣֤������ʽΪPEM��
������
    pbCert:֤������
����ֵ��
	0: ʧ�� 1:�ɹ�
********************************************/
// 09
LONG32 WINAPI J_BC_WD_ExPortRSACert( OUT BYTE *pbCert,OUT DWORD *pdwCertLen);


/*******************************************
J_BC_WD_RSAEncrypt
�������ܼ�˵����
    RSA���ܡ�
������
   
   pbData����������
   dwDataLen�����ĳ���
   pbCipher������
   pdwCipherLen���������ݳ���  
 
����ֵ��
	0: ʧ�� 1:�ɹ�
********************************************/
// 10
LONG32 WINAPI J_BC_WD_RSAEncrypt(
								 IN BYTE *pbData,
								 IN DWORD dwDataLen, 
								 OUT BYTE*pbCipher,
								 OUT DWORD* pdwCipherLen);



/*******************************************
J_BC_WD_RSASign
�������ܼ�˵����
    ֧��RSA2048��Կ��ǩ����
������
	dwHashAlg:Hash�㷨��MD5:1,SHA1:2,SHA256:3,SHA3:4
	pbData: ��ǩ����Ϣ���ݡ�
	dwDataLen����ǩ����Ϣ���ݳ��ȡ�
	pbSign��ǩ��ֵ��
	pdwSignLen��ǩ��ֵ���ȡ�

����ֵ��
	0: ʧ�� 1:�ɹ�
********************************************/

// 11
LONG32 WINAPI J_BC_WD_RSASign (
								IN DWORD     dwHashAlg,
								IN BYTE*       pbData,
								IN DWORD     dwDataLen,
								OUT BYTE*     pbSign,
								OUT DWORD*   pdwSignLen
							  );

/*******************************************
J_BC_WD_ECCSign
�������ܼ�˵����
    ֧��ECDSAǩ����
	��̫����ECDSAǩ������ĸ�ʽ���£�
	0xf7+BytesNum||len||m
	����len = length(m)��ʾm���ֽ������ֽ���>55����BytesNumΪ��ʾlen��Ҫ���ֽ�����
	
	  
	��̫��ECDSAǩ�������ʽ���£�
	ǩ���õ�(v, r, s)�������
	0xf7+BytesNum2||len+67||m||v||a0||r||a0||s
	����BytesNum2Ϊ��ʾlen+67��Ҫ���ֽ�����67Ϊ��v||a0||r||a0||s�����ֽڳ��ȡ�

������
   
	pbMsgRlp: ��ǩ����Ϣ���ݡ�
	dwMsgRlpLen:��Ϣ����
	pbSignRlp��ǩ��ֵ��
	pdwSignLen��ǩ��ֵ���ȡ�

����ֵ��
	0: ʧ�� 1:�ɹ�
********************************************/

// 12
LONG32 WINAPI J_BC_WD_ECCSign (
							IN BYTE*     pbMsgRlp,
							IN DWORD     dwMsgRlpLen,
							OUT BYTE*    pbSignRlp,
							OUT DWORD*   pdwSignLen
			              );




/*******************************************
J_BC_WD_RSAVerifySign
�������ܼ�˵����
    ֧��RSA2048��Կ����ǩ��
	
������
   
	dwHashAlg:Hash�㷨��MD5:1,SHA1:2,SHA256:3,SHA3:4
	pbData: ��ǩ����Ϣ���ݡ�
	dwDataLen����ǩ����Ϣ���ݳ��ȡ�
	pbSign��ǩ��ֵ��
	pdwSignLen��ǩ��ֵ���ȡ�

����ֵ��
	0: ʧ�� 1:�ɹ�

********************************************/
// 13
LONG32 WINAPI J_BC_WD_RSAVerifySign(
								 IN DWORD dwHashAlg,
								 IN  BYTE* pbData, 
								 IN DWORD dwDataLen,
								 IN BYTE* pbSign);


/*******************************************
J_BC_WD_ECCVerifySign
�������ܼ�˵����
  ֧��ECC��ǩ��

  ��̫��ECDSAǩ�������ʽ���£�
  ǩ���õ�(v, r, s)�������
  0xf7+BytesNum2||len+67||m||v||a0||r||a0||s
  ����BytesNum2Ϊ��ʾlen+67��Ҫ���ֽ�����67Ϊ��v||a0||r||a0||s�����ֽڳ��ȡ�

������
  
	pbSignRlp:ǩ��ֵ

����ֵ��
	0: ʧ�� 1:�ɹ�
********************************************/
// 14
LONG32 WINAPI J_BC_WD_ECCVerifySign(IN BYTE* pbSignRlp);



/*******************************************
J_BC_BE_Enc
�������ܼ�˵����
   ���ݹ㲥�����㷨���ƶ����ݽ��м��ܡ�
������
   pbMessage�� [in]�����ܵ���������
   nMessage_Len: [in]�������ݵ��ֽڳ���
   nGroupNum: [in]Ⱥ��Ա������С��100��
   pbGroup_PubKey [in]Ⱥ��Ա��Կ������nGroupNum*Point_Len��
   pbCipherText = C1||C2||C3||C4��[out], ���еĲ����������£�
      C1: [out]�������ݣ����ȣ�64��
      C2: [out]�������ݣ����ȣ�32��
      C3: [out]�������ݣ������ȣ�nGroupNum*(64)��
      C4: [out]�������ݣ�AES ���ģ�
   pnCipherText_Len: [out]���ĳ���

����ֵ��
	0: ʧ�� 1:�ɹ�
********************************************/
// 15
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
�������ܼ�˵����
    ECC�㲥���ܡ�
������
    pbCipherText: [in]��������
    nCipherText_Len: [in]���ĳ���
    nGroupNum: [in]Ⱥ��Ա������С��100��
	pbMessage: [out]���ܵ���������
    pnMessage_Len: [out]�������ݵ��ֽڳ���
����ֵ��
	0: ʧ�� 1:�ɹ�
********************************************/
// 16
LONG32 WINAPI J_BC_BE_Dec(
			              IN  BYTE*   pbCipherText,
			              IN  DWORD   dwCipherText_Len,
			              IN  DWORD   dwGroupNum,
			              OUT BYTE*   pbMessage,
			              OUT DWORD*  pdwMessage_Len
			            );


/*******************************************
J_BC_GS_CheckKeyPair
�������ܼ�˵����
    �ж��û�˽Կ��ϵͳ��Կ�Ƿ��ѵ��롣

����ֵ��
	0: ʧ�� 1:�ɹ�   -4��δ����
********************************************/
// 17
LONG32 WINAPI J_BC_GS_CheckKeyPair();


/*******************************************
J_BC_GS_ImportMPubKey
�������ܼ�˵����
    ����Ⱥǩ��ϵͳ��Կ��
������
    
    pbMPubKey: [in]Ⱥǩ��ϵͳ��Կ
    dwMPubKey: [in]ϵͳ��Կ����

����ֵ��
	0: ʧ�� 1:�ɹ�
********************************************/
// 18
LONG32 WINAPI J_BC_GS_ImportMPubKey(IN BYTE* pbMPubKey,IN DWORD dwMPubKey);



/*******************************************
J_BC_GS_ImportUPriKey
�������ܼ�˵����
    ����Ⱥǩ���û�˽Կ��
������
  
    pbUPriKey: [in]Ⱥǩ���û�˽Կ
    dwUPriKey: [in]�û�˽Կ����

����ֵ��
	0: ʧ�� 1:�ɹ�
********************************************/
// 19
LONG32 WINAPI J_BC_GS_ImportUPriKey(IN BYTE  *pbUPriKey,IN DWORD dwUPriKey);



/*******************************************
J_BC_GS_Sign
�������ܼ�˵����
    Ⱥǩ����
������
    pbHash:[in]ǩ����Ϣ��ժҪ
    dwHash:[in]ժҪ����
    pbSign:[out]ǩ��ֵ 
	pdwSignLen:[out]ǩ��ֵ����

����ֵ��
	0: ʧ�� 1:�ɹ�
********************************************/
// 20
LONG32 WINAPI J_BC_GS_Sign(IN BYTE*   pbHash,
						   IN DWORD   dwHash,
						   OUT BYTE*  pbSign,
						   OUT DWORD* pdwSignLen 
					      );


/*******************************************
J_BC_GS_Verify
�������ܼ�˵����
    Ⱥǩ����
������
    pbHash:[in]ǩ����Ϣ��ժҪ
    dwHash:[in]ժҪ����
    pbSign:[in]ǩ��ֵ 
	pdwSignLen:[in]ǩ��ֵ����

����ֵ��
	0: ʧ�� 1:�ɹ�
********************************************/
// 21
LONG32 WINAPI J_BC_GS_Verify(IN BYTE*   pbHash,
							 IN DWORD   dwHash,
							 IN BYTE*   pbSign,
					         IN DWORD   dwSignLen);



/*******************************************
J_BC_WD_TradeSignProtect
�������ܼ�˵����
    ������˽�����ӿڣ����Խ���Ϊ���룬�ȶԽ��׽���ECDSAǩ�����ٶ��������ݺ�ǩ�����й㲥���ܣ������������Ľ���Ⱥǩ����Ϊ�����
������
    dwKeyUsage�����ɵ�ECCKey����Կ��; 1:AT_KEYEXCHANGE��2��AT_SIGNATURE
    pbMsg:[in]��ǩ���Ľ�������ԭ��
    dwMsg:[in]�������ݳ���
	nGroupNum: [in]Ⱥ��Ա������С��100��
    pbGroup_PubKey [in]Ⱥ��Ա��Կ������nGroupNum*Point_Len��
    pbSign:[in]ǩ��ֵ 
	pdwSignLen:[in]ǩ��ֵ����

����ֵ��
	0: ʧ�� 1:�ɹ�
********************************************/
// 22
LONG32 WINAPI J_BC_WD_TradeSignProtect(
									   IN  BYTE    *pbMsg,
                                       IN  DWORD   dwMsg,
									   IN  DWORD   dwGroupNum,
									   IN  BYTE    *pbGroup_PubKey,
                                       OUT BYTE    *pbSign,
                                       OUT DWORD   *pdwSignLen
									   );
// 23
LONG32 WINAPI WDScardEncrypt_ECIES(
								   IN LPBYTE pbData,
								   IN DWORD dwDataLen, 
								   OUT LPBYTE pbEncryptedData,
								   OUT LPDWORD pdwEncryptedDataLen
								  );
								  
// 24
LONG32 WINAPI WDScardDecrypt_ECIES(
								   IN LPBYTE pbEncryptedData,
								   IN DWORD dwEncryptedDataLen,
								   OUT LPBYTE pbDecryptedData, 
								   OUT PDWORD pdwDecryptedDataLen
								  );

								  
								  
								  
								  
								  
								  
								  
								  
								  
								  
								  
								  
								  
								  
/*******************************************
WDScardGenKey_PAI
�������ܼ�˵����
    �����ӽ�������Ĺ�˽Կ�ԡ�
������
    dwKeyLen����˽Կ����
    pbPubKey_n:�û���Կn
    pbPubKey_g:�û���Կg
	pbPriKey_lambda: �û�˽Կlambda
    pbPriKey_mu: �û�˽Կmu

����ֵ��
	0: ʧ�� 1:�ɹ�
********************************************/

LONG32 WINAPI WDScardGenKey_PAI(
								IN DWORD   dwKeyLen,
								OUT LPBYTE pbPubKey_n,
								OUT LPBYTE pbPubKey_g, 
								OUT LPBYTE pbPriKey_lambda,
								OUT LPBYTE pbPriKey_mu
							  );


/*******************************************
WDScardEncryption_PAI
�������ܼ�˵����
    ��Ϣ���ܡ�
������
    pbMsg�������ܵ���Ϣ
    dwMsgLen:��Ϣ�ĳ���
    pbPubKey_n:�û���Կn
	pbPubKey_g: �û���Կg
    dwKeyLen: ��˽Կ����
	pbRandom�������r
	dwRandomLen�����������
	pbCipher�����ɵ�����
	pdwCipherLen���ɵ����ĳ���


����ֵ��
	0: ʧ�� 1:�ɹ�
********************************************/
LONG32 WINAPI WDScardEncryption_PAI(
									IN LPBYTE   pbMsg,
									IN DWORD    dwMsgLen,
									IN LPBYTE   pbPubKey_n,
									IN LPBYTE   pbPubKey_g,
									IN DWORD    dwKeyLen,
									IN LPBYTE   pbRandom,
									IN DWORD    dwRandomLen,
									OUT LPBYTE  pbCipher,
									OUT LPDWORD pdwCipherLen
					                );

/*******************************************
WDScardDecryption_PAI
�������ܼ�˵����
    �������ģ����������Ϣ��
������
    pbCipher��������Ϣ
    dwCipherLen:������Ϣ�ĳ���
    pbPubKey_n:�û���Կn
	pbPriKey_lambda���û�˽Կlambda
	pbPriKey_mu���û�˽Կmu
    dwKeyLen: ��˽Կ����
	pbMsg�����ܵ���Ϣ
	pdwMsgLen�����ܵ���Ϣ����
	


����ֵ��
	0: ʧ�� 1:�ɹ�
********************************************/
LONG32 WINAPI WDScardDecryption_PAI(
									IN LPBYTE   pbCipher,
									IN DWORD    dwCipherLen,
									IN LPBYTE   pbPubKey_n,
									IN LPBYTE   pbPriKey_lambda,
									IN LPBYTE   pbPriKey_mu,
									IN DWORD    dwKeyLen,
									OUT LPBYTE  pbMsg,
									OUT LPDWORD pdwMsgLen
					               );


/*******************************************
WDScardHomAdd_PAI
�������ܼ�˵����
    ����̬ͬ�ӡ�
������
    pbCipherA��������ϢA
    dwCipherALen:������Ϣ�ĳ���
	pbCipherB��������ϢB
	dwCipherBLen:������Ϣ�ĳ���
    pbPubKey_n:�û���Կn
    dwKeyLen: ��˽Կ����
	pbResult�����ܺ����Ϣ
	pdwResultLen�����ܺ����Ϣ����
	


����ֵ��
	0: ʧ�� 1:�ɹ�
********************************************/
LONG32 WINAPI  WDScardHomAdd_PAI(
								 IN LPBYTE   pbCipherA,
								 IN DWORD    dwCipherALen,
								 IN LPBYTE   pbCipherB,
								 IN DWORD    dwCipherBLen,
								 IN LPBYTE   pbPubKey_n,
								 IN DWORD    dwKeyLen,
								 OUT LPBYTE  pbResult,
								 OUT LPDWORD pdwResultLen
								);

#ifdef _cplusplus
}	
#endif
#endif