---
icon: pen-to-square
date: 2025-01-12
tags: 
title: vault-door-5
category:
  - 领域
---
Author: Mark E. Haase

#### Description

In the last challenge, you mastered octal (base 8), decimal (base 10), and hexadecimal (base 16) numbers, but this vault door uses a different change of base as well as URL encoding! The source code for this vault is here: [VaultDoor5.java](https://jupiter.challenges.picoctf.org/static/d31ce4356bdfd15d33a9af7e35ab4d0a/VaultDoor5.java)
#### Hints
- You may find an encoder/decoder tool helpful, such as https://encoding.tools/
- Read the wikipedia articles on URL encoding and base 64 encoding to understand how they work and what the results look like.
---
# 01. 解题过程
```java
class VaultDoor5 {
    public static void main(String args[]) {
        VaultDoor5 vaultDoor = new VaultDoor5();
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter vault password: ");
        String userInput = scanner.next();
    String input = userInput.substring("picoCTF{".length(),userInput.length()-1);
    if (vaultDoor.checkPassword(input)) {
        System.out.println("Access granted.");
    } else {
        System.out.println("Access denied!");
        }
    }
```
发现了这样一个逻辑
发现了一个checkPassword的调用，目光转向这个方法
```java
public boolean checkPassword(String password) {
        String urlEncoded = urlEncode(password.getBytes());
        String base64Encoded = base64Encode(urlEncoded.getBytes());
        String expected = "JTYzJTMwJTZlJTc2JTMzJTcyJTc0JTMxJTZlJTY3JTVm"
                        + "JTY2JTcyJTMwJTZkJTVmJTYyJTYxJTM1JTY1JTVmJTM2"
                        + "JTM0JTVmJTY1JTMzJTMxJTM1JTMyJTYyJTY2JTM0";
        return base64Encoded.equals(expected);
    }
```
我们从下到上逆向分析
我们需要把这个expected先进行base64解码，然后进行字节码转文本操作，然后再进行url解码，再进行字节码转文本即可，我们可以在cyberchief实现这个流程
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250112200042.png)
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250112200139.png)
获得了这样的明文，这就是flag
```
picoCTF{c0nv3rt1ng_fr0m_ba5e_64_e3152bf4}
```
