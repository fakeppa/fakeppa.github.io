---
date: 2025-08-12
icon: pen-to-square
tags: 
title: reverse2
category:
  - 项目
---
这题和上题差不多，简单分析逻辑即可
```bash
int __fastcall main(int argc, const char **argv, const char **envp)
{
  int stat_loc; // [rsp+4h] [rbp-3Ch] BYREF
  int i; // [rsp+8h] [rbp-38h]
  __pid_t pid; // [rsp+Ch] [rbp-34h]
  char s2[24]; // [rsp+10h] [rbp-30h] BYREF
  unsigned __int64 v8; // [rsp+28h] [rbp-18h]

  v8 = __readfsqword(0x28u);
  pid = fork();
  if ( pid )
  {
    waitpid(pid, &stat_loc, 0);
  }
  else
  {
    for ( i = 0; i <= strlen(flag); ++i )
    {
      if ( flag[i] == 105 || flag[i] == 114 )
        flag[i] = 49;
    }
  }
  printf("input the flag:");
  __isoc99_scanf("%20s", s2);
  if ( !strcmp(flag, s2) )
    return puts("this is the right flag!");
  else
    return puts("wrong flag!");
}
```
会替换每个r和i变成1
那么flag就是
```flag
flag{hack1ng_fo1_fun}
```