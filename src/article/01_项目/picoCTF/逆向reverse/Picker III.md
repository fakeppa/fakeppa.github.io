---
icon: pen-to-square
date: 2025-01-16
tags: 
title: Picker III
category:
  - 项目
---
4,010 users solved
#### Description

Can you figure out how this program works to get the flag?

Additional details will be available after launching your challenge instance.
#### Hints
Is there any way to modify the function table?

---
# 01. 解题过程
```python
while(USER_ALIVE):
  choice = input('==> ')
  if( choice == 'quit' or choice == 'exit' or choice == 'q' ):
    USER_ALIVE = False
  elif( choice == 'help' or choice == '?' ):
    help_text()
  elif( choice == 'reset' ):
    reset_table()
  elif( choice == '1' ):
    call_func(0)
  elif( choice == '2' ):
    call_func(1)
  elif( choice == '3' ):
    call_func(2)
  elif( choice == '4' ):
    call_func(3)
  else:
    print('Did not understand "'+choice+'" Have you tried "help"?')
```
先看`call_func`的逻辑
call_func引用了这个函数，很有用
```python
def get_func(n):
  global func_table
  # Check table for viability
  if( not check_table() ):
    print(CORRUPT_MESSAGE)
    return
  # Get function name from table
  func_name = ''
  func_name_offset = n * FUNC_TABLE_ENTRY_SIZE
  for i in range(func_name_offset, func_name_offset+FUNC_TABLE_ENTRY_SIZE):
    if( func_table[i] == ' '):
      func_name = func_table[func_name_offset:i]
      break
  if( func_name == '' ):
    func_name = func_table[func_name_offset:func_name_offset+FUNC_TABLE_ENTRY_SIZE]
  return func_name
```