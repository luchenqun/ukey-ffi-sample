#include <windows.h>
#include <ctype.h>
#include <iostream>
using namespace std;

typedef unsigned long       DWORD;
typedef int                 BOOL;
typedef unsigned char       BYTE;
typedef unsigned short      WORD;
typedef float               FLOAT;
typedef int                 INT;
typedef unsigned int        UINT;
typedef signed int LONG32, *PLONG32;

void J_BC_WD_OpenDeviceTest(HMODULE hDll)
{
	typedef LONG32(*J_BC_WD_OpenDevice)();
	J_BC_WD_OpenDevice func = (J_BC_WD_OpenDevice)GetProcAddress(hDll, "J_BC_WD_OpenDevice");
	if (func != NULL)
	{
		cout << __FUNCTION__ << " = " << func() << endl;
	}
}

void J_BC_WD_CloseDeviceTest(HMODULE hDll)
{
	typedef LONG32(*J_BC_WD_CloseDevice)();
	J_BC_WD_CloseDevice func = (J_BC_WD_CloseDevice)GetProcAddress(hDll, "J_BC_WD_CloseDevice");
	if (func != NULL)
	{
		cout << __FUNCTION__ <<  " = " << func() << endl;
	}
}

void J_BC_WD_ECCSignVerifyTest(HMODULE hDll)
{
	typedef LONG32(*J_BC_WD_ECCSign)(IN BYTE* pbMsgRlp, IN DWORD dwMsgRlpLen, OUT BYTE*pbSignRlp, OUT DWORD*pdwSignLen);
	typedef LONG32(*J_BC_WD_ECCVerifySign)(IN BYTE* pbSignRlp);

	J_BC_WD_ECCSign func = (J_BC_WD_ECCSign)GetProcAddress(hDll, "J_BC_WD_ECCSign");
	J_BC_WD_ECCVerifySign func2 = (J_BC_WD_ECCVerifySign)GetProcAddress(hDll, "J_BC_WD_ECCVerifySign");

	BYTE* tmp = (BYTE*)"F901FA808504E3B292008502540BE3FF941176FD5DC45001002EB2B893E5EF7C488475640780B901D4B1498E290000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000018A7B226964223A227371732D31222C226E616D65223A22535153222C22706172656E744964223A2261646D696E222C226465736372697074696F6E223A22626C6F636B636861696E20706C6174222C22636F6D6D6F6E4E616D65223A225465737431222C2273746174654E616D65223A224744222C22636F756E7472794E616D65223A22434E222C22656D61696C223A227465737431403132362E636F6D222C2274797065223A312C22656E6F64654C697374223A5B7B227075626B6579223A2230783331643137376235623261626133396531633330366331623333383334643234356538356435373763343332366237363162373334323365636139303063616536366638376432333430633135356634303238353832303663396533656566653830376363323433616636323864623138363064393965373132653535343862222C226970223A223139322E3136382E31302E3335222C22706F7274223A223130303031227D5D2C22726F6C6549644C697374223A5B5D2C2266696C6549644C697374223A5B5D7D000000000000";
	size_t len = strlen((const char *)tmp);

	BYTE* pbMsgRlp = new BYTE[len / 2];
	cout << "pbMsgRlp=";
	for (size_t i = 0, j=0; i < len; i+=2, j++)
	{
		BYTE a = tmp[i];
		BYTE b = tmp[i + 1];
		a = (a >= '0' && a <= '9') ? (a - '0') : (toupper(a) - 'A' + 10);
		b = (b >= '0' && b <= '9') ? (b - '0') : (toupper(b) - 'A' + 10);
		BYTE r = (BYTE)(a * 16 + b);
		pbMsgRlp[j] = r;
		cout << pbMsgRlp[j];
	}
	cout << endl;

	DWORD dwMsgRlpLen = (DWORD)strlen((const char *)pbMsgRlp);
	BYTE* pbSignRlp = new BYTE[1024];
	DWORD* pdwSignLen = new DWORD(1024);
	LONG32 ret = -1;

	if (func != NULL)
	{
		cout << __FUNCTION__ << " = " << (ret = func(pbMsgRlp, dwMsgRlpLen, pbSignRlp, pdwSignLen)) << endl;
		cout << "pdwSignLen = " << *pdwSignLen << ",pbSignRlp=";
		for (size_t i = 0; i < *pdwSignLen; i++)
		{
			cout << pbSignRlp[i];
		}
		cout << endl;
	}

	if (func2 != NULL && ret == 1)
	{
		cout << __FUNCTION__ << " = " << func2(pbSignRlp) << endl;
	}

	delete pbMsgRlp;
	delete pbSignRlp;
	delete pdwSignLen;
}

int main(int argc, char *argv[])
{
	HMODULE hDll = LoadLibrary("./native/WDJuZhenAPIx64.dll");
	if (hDll != NULL)
	{
		J_BC_WD_OpenDeviceTest(hDll);


		J_BC_WD_ECCSignVerifyTest(hDll);


		J_BC_WD_CloseDeviceTest(hDll);
		FreeLibrary(hDll);
	}
}