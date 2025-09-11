---
icon: pen-to-square
date: 2025-01-05
tags: 
title: PW Crack 5
category:
  - 领域
---
28,444 users solved
#### Description

Can you crack the password to get the flag?Download the password checker [here](https://artifacts.picoctf.net/c/32/level5.py) and you'll need the encrypted [flag](https://artifacts.picoctf.net/c/32/level5.flag.txt.enc) and the [hash](https://artifacts.picoctf.net/c/32/level5.hash.bin) in the same directory too. Here's a [dictionary](https://artifacts.picoctf.net/c/32/dictionary.txt) with all possible passwords based on the password conventions we've seen so far.
#### Hints
- Opening a file in Python is crucial to using the provided dictionary.
- You may need to trim the whitespace from the dictionary word before hashing. Look up the Python string function, `strip`
- The `str_xor` function does not need to be reverse engineered for this challenge.

----
# 1. 解题过程
发现题目给了字典，我们只需要改一下 level_5_pw_check部分，让它对字典进行遍历，然后判断即可
```python
def level_5_pw_check():

    s=open('dictionary.txt', 'r').read()

    user_pw=re.split(r'\n',s)

  

    while True:

        for word in user_pw:

            user_pw_hash = hash_pw(word)

            if( user_pw_hash == correct_pw_hash ):

                print("Welcome back... your flag, user:")

                decryption = str_xor(flag_enc.decode(), word)

                print(decryption)

                return

            else:

                pass
```

获得flag
```
picoCTF{h45h_sl1ng1ng_40f26f81}
```