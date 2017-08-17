#ifndef _HELLO_CPP_
#define _HELLO_CPP_

#include <stdlib.h> 
#include <stdio.h> 
#include <time.h>

typedef unsigned long       DWORD;
typedef int                 BOOL;
typedef unsigned char       BYTE;
typedef unsigned short      WORD;
typedef float               FLOAT;

#ifdef LIBDLL
    #define LIBDLL extern "C" _declspec(dllimport)
#else
    #define LIBDLL extern "C" _declspec(dllexport)
#endif
LIBDLL int add(int plus1, int plus2)
{
	return plus1 + plus2;
};
LIBDLL void updateNum(int *num, int newNum)
{
	*num = newNum;
};

LIBDLL void mystrcpy(unsigned char *src, const unsigned char *dest)
{
	while (*dest != '\0')
	{
		*src = *dest;
		src++;
		dest++;
	}
	*src = '\0';
};

LIBDLL void getString(BYTE *str, DWORD *len)
{
	srand((unsigned int)(time(NULL)));
	*len = rand() % 100 + 10;
	for (size_t i = 0; i < *len; i++)
	{
		*str = (BYTE)(rand() % 100);
		str++;
	}
	str = '\0';
};

#endif