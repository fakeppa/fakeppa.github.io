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
```python
def call_func(n):
  """
  Calls the nth function in the function table.
  Arguments:
    n: The function to call. The first function is 0.
  """

  # Check table for viability
  if( not check_table() ):
    print(CORRUPT_MESSAGE)
    return
  

  # Check n
  if( n < 0 ): #n不能小于0
    print('n cannot be less than 0. Aborting...')
    return
  elif( n >= FUNC_TABLE_SIZE ): #n只能到4
    print('n cannot be greater than or equal to the function table size of '+FUNC_TABLE_SIZE)
    return
  

  # Get function name from table
  func_name = get_func(n)


  # Run the function
  eval(func_name+'()')
```
call_func引用了这个函数`get_func()`
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
逻辑是读取这个`func_table`里的函数
`get_func()`将`func_table`内的字符串以32为一行读取，知道读取到空格为止，然后提取这一行的内容并返回，返回值实际上是一个字符串
```python
func_table = \
'''\
print_table                     \
read_variable                   \
write_variable                  \
getRandomNumber                 \
'''
```
我们直接来看第三个函数`write_variable`这是解题的关键
```python
def write_variable():
  var_name = input('Please enter variable name to write: ')
  if( filter_var_name(var_name) ):
    value = input('Please enter new value of variable: ')
    if( filter_value(value) ):
      exec('global '+var_name+'; '+var_name+' = '+value)
    else:
      print('Illegal value')
  else:
    print('Illegal variable name')
```
注意到如果变量名合理的话，他会直接创建一个变量，我们再来回顾一下`call_func`，
`func_name = get_func(n)`这条代码会直接将函数不加括号的形式赋值给`func_name`
这样的话就有操作空间了，我们赋值一个和`func_table`内函数相同的变量，我们选择`getRandomNumber`，赋值给变量`win`，那么这样我们输入行号的时候，他会读取