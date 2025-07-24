---
icon: pen-to-square
date: 2025-01-18
tags: 
title: Ready Gladiator 1
category:
  - 领域
---
2,886 users solved
#### Description

Can you make a CoreWars warrior that wins?Your opponent is the Imp. The source is available [here](https://artifacts.picoctf.net/c/408/imp.red). If you wanted to pit the Imp against himself, you could download the Imp and connect to the CoreWars server like this:`nc saturn.picoctf.net 50813 < imp.red`To get the flag, you must beat the Imp at least once out of the many rounds.
#### Hints
You may be able to find a viable warrior in beginner docs

----
```
ADD #10, #-1
MOV 2, @-1
JMP -2, 0
DAT #33, #33
```
这是你的战士.red汇编语言