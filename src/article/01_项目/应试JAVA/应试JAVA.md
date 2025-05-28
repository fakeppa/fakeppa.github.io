---
icon: pen-to-square
date: 2024-12-15
tags:
  - 这下不得不学了吧
  - 投机取巧
  - 现在立刻停止重新造轮子
title: 应试JAVA
category:
  - 归档
---
## 如何构造一个简单窗口
窗口类需要继承JFrame类并实现ActionListener接口
```java
class win extends JFrame implements ActionListener{
```
#### 先在类中声明按钮和文本输入等对象
```java
JTextField t1; 
JTextArea a1; 
JButton b;
```
### 构造方法定义
要在类中构造方法内进行定义
```java
t1 = new JTextField(10);
a1 = new JTextArea(10, 20);
b = new JButton("确定");
```

#### 进行窗口初始化
```java
setLayout(new FlowLayout());
add(t1); 
add(a1); 
add(b);
```
	1.设置窗口的布局管理器为 ​**​`FlowLayout`​**​。
	2.FlowLayout` 会按从左到右、从上到下的顺序排列组件，类似于 HTML 的默认布局。
	3.如果一行放不下，组件会自动换行
- 将 `t1`（文本框）、`a1`（文本区域）、`b`（按钮）依次添加到窗口中。
- 由于使用了 `FlowLayout`，它们会按添加顺序从左到右排列。

#### 然后进行元素对象的事件注册
```java
b.addActionListener(this);
```
此代码会监听点击事件，具体就是当按钮被点击时，会自动调用该类的 `actionPerformed(ActionEvent e)` 方法。
传入当前事件对象

##### 最后设置窗口为可见，并且设置窗口出现的大小与位置
```java
setVisible(true); 
setBounds(100,100,500,500);
```

#### 在类内定义实现事件监听器的方法
```java
public void actionPerformed(ActionEvent e)
```
**`ActionEvent e`​**​：参数，封装了事件源（如被点击的按钮）和事件信息。
**actionPerformed** 是 **​`ActionListener` 接口​**​必须实现的方法
#### 方法定义
方法需要实现actionPerformed接口，用户点击按钮 `b`（"确定"按钮）时，Swing 内部自动生成一个 `ActionEvent` 事件对象，并调用actionPerformed
```java
public void actionPerformed(ActionEvent e) {
    String str = t1.getText();  // 获取文本框内容
    int n = str.length();       // 计算长度
    a1.append("字符串的长度是:" + n); // 输出结果
}
```
点击按钮后计算t1中文本的长度，并显示在文本区域a1中

# 其他

选择10，判断，程序填空，编程2，类与对象，数组，分离数字

this:
表示当前对象
调用本类的其他构造方法：this(实参)，调用有参的构造方法，并赋予默认值

# 重写、重载和覆盖
- 重写是子类和父类之间，子类有一个与父类完全相同的方法声明，优先调用子类的方法

- 重载是同一类中，方法名相同，参数列表不同

- 覆盖和重写是一个意思

# 函数

- Math.abs():取绝对值

- .equals():比较两个字符串是否相等

- str.substring(0, 3):提取前3个字符串，与python不同的是这个方法不会包括第3（也就是第四个字符）数学表达：`[0,3)`

- str.charAt(int index):访问单独的字符，hh幽默

- math.random()  一般乘10的倍数并用(int)强转接当随机数使用
  - **返回值**：`Math.random()` 返回一个大于等于 0 且小于 1 的浮点数。
  - **无参数**：不需要传入任何参数。

- 可以用integer.parseTnt("3"):将字符串3转为数字int类型3

- super.方法会执行父类的当前方法，然后执行子类的本方法

- String方法把数组转化成字符串
```java
// 使用 char 数组创建字符串
char[] charBuffer = {'H', 'e', 'l', 'l', 'o'};
String s1 = new String(charBuffer);
System.out.println(s1); // 输出: Hello
```


# 循环结构
## for循环
`for (i=0; i<8; i++)` 循环的执行顺序：

1. **初始化**：`i` 被初始化为 0。
2. **条件检查**：检查 `i<8` 是否为真。因为 `i` 初始值为 0，所以条件为真，进入循环体。
3. **循环体**：执行循环体内的代码。
4. **更新**：`i` 的值增加 1（`i++`）。
5. **回到条件检查**：再次检查 `i<8` 是否为真。如果为真，重复步骤 3 和 4；如果为假，循环结束

![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20241222181902.png)

this用法
在Java中，`this` 关键字是一个引用，它指向当前对象的实例。`this` 可以用于多种情况，以下是一些主要用途：

1. **区分成员变量和方法参数**：当方法参数的名称与类的成员变量名称相同时，可以使用 `this` 来区分它们。

```java
public class Person {
    private String name;

    public Person(String name) {
        this.name = name; // 使用 this 来引用成员变量，而不是方法参数
    }
}
```

2. **调用当前对象的其他方法**：在类的方法内部，可以使用 `this` 来调用当前对象的其他方法。

```java
public class Circle {
    private double radius;

    public Circle(double radius) {
        this.radius = radius;
        this.calculateArea(); // 调用当前对象的 calculateArea 方法
    }

    public void calculateArea() {
        System.out.println("Area: " + (Math.PI * radius * radius));
    }
}
```

3. **在返回语句中返回当前对象**：在方法中，可以使用 `this` 来返回当前对象的引用。

```java
public class StringBuilder {
    public StringBuilder append(String str) {
        // 假设有代码将 str 添加到内部字符串
        return this; // 返回当前对象的引用
    }
}
```

4. **在构造函数中调用另一个构造函数**：可以使用 `this` 调用同一个类中的另一个构造函数。

```java
public class Point {
    private int x;
    private int y;

    public Point() {
        this(0, 0); // 默认构造函数调用带两个参数的构造函数
    }

    public Point(int x, int y) {
        this.x = x;
        this.y = y;
    }
}
```

5. **在匿名内部类中引用外部类的成员**：在匿名内部类中，可以使用 `this` 来引用外部类的成员。

```java
public class OuterClass {
    private int value;

    public OuterClass(int value) {
        this.value = value;
    }

    public Runnable createRunnable() {
        return new Runnable() {
            public void run() {
                System.out.println(this.value); // 引用外部类的成员变量
            }
        };
    }
}
```

在上述最后一个例子中，匿名内部类中的 `this` 引用的是匿名类的对象，而不是 `OuterClass` 的对象。要引用外部类的成员，需要直接使用成员变量的名称或者使用 `OuterClass.this`。

逻辑运算符：
![495280310e08f893cd1fb31b1e56658c.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/c9312309123.png)
这个的异或逻辑是错误的，都是0或者1的话，会返回True

setter方法快捷键：
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/IHASDwdwd6.png)
学eclipse就是学快捷键：（靠北啦，只是应付考试而已了）
# 快捷键
## 一、常用快捷键

### 1、代码注释快捷键

1）Ctrl + / ：注释或取消当前行。

2）Ctrl + Shift + / ：注释多行。

3）Ctrl + Shift + \ ：取消多行注释。

4）Alt+Shift+J(方法注释) ：

在方法上按Alt+Shift+J可以添加Javadoc 注释 ，或者不用快捷键，先敲“/”在敲两个**，然后回车也可以。

### 2、代码格式化快捷键

Ctrl + Shift + F ：书写格式规范的代码是每一个程序员的必修之课，当看见某段代码极不顺眼时，选定后按此快捷键可以格式化这段代码，如果不选定代码则默认格式化当前文件。

### 3、代码自动提示快捷键

Alt + /

### 4、快速修正快捷键

Ctrl + 1

### 5、编辑快捷键

1）Ctrl + D ：删除当前行。

2）Ctrl + Alt + ↓ 和 Ctrl + Alt + ↑ ：

复制当前行 ，Ctrl+Alt+↓复制当前行到下一行，Ctrl+Alt+↑复制当前行到上一行。需要说明的是，这个快捷键在Ubuntu下与工作区切换冲突，建议改为Ctrl+↑。

3）Ctrl + M ：窗口最大化和还原，用户在窗口中进行操作时，总会觉得当前窗口小，这时可以使用这个快捷键。

4）Ctrl + Shift + S ：

全局保存，用来检查XML错误和提供资源。Eclipse在编写XML文档时不能实时检查语法错误，如果编写了Resource、Layout方面的信息不保存的话Eclipse也不会智能提示。

5）Alt + ↑ 和 Alt + ↓ ：

上下两行交换位置。可以将上下两行的位置对调，也可以是选中的几行与上下一行对调，与上一行对调的快捷键是Alt+↑，与下一行对调的快捷键是Alt+↓。

6）Ctrl + Shift + M ：(先把光标放在需导入包的类名上) 作用是加[Import语句](https://so.csdn.net/so/search?q=Import%E8%AF%AD%E5%8F%A5&spm=1001.2101.3001.7020)。

### 6、查看和定位快捷键

1）Ctrl + K 和 Ctrl + Shift + K ：

快速向下和向上查找选定的内容，从此不再需要用鼠标单击查找对话框了。

2）Ctrl + Shift + T ：

查找工作空间（Workspace）构建路径中的可找到Java类文件，不要为找不到类而痛苦，而且可以使用“*”、“？”等通配符。

3）Ctrl + Shift + R ：

查找工作空间（Workspace）中的所有文件（包括Java文件），也可以使用通配符。

4）Ctrl + G ：查找当前元素的声明

5）Ctrl + Shift + G ：

查找类、方法和属性的引用。这是一个非常实用的快捷键，例如要修改引用某个方法的代码，可以通过此快捷键迅速定位所有引用此方法的位置。

6）Ctrl + Shift + O ：

快速生成import，当从网上拷贝一段程序后，不知道如何import进所调用的类，试试【Ctrl+Shift+O】快捷键。也可以移除未使用的import引用。当我们之前添加的import，现在没有用到就会出现一些感叹号，使用快捷键可以移除所有未使用的。

7）ALT + Shift + W ：

查找当前文件所在项目中的路径，可以快速定位浏览器视图的位置，如果想查找某个文件所在的包时，此快捷键非常有用（特别在比较大的项目中）。

8）Ctrl + L ：定位到当前编辑器的某一行，对非Java文件也有效。

9）Alt + ←和 Alt + → ：

后退历史记录和前进历史记录，在跟踪代码时非常有用，用户可能查找了几个有关联的地方，但可能记不清楚了，可以通过这两个快捷键定位查找的顺序。

10）F3 : 快速定位光标位置的某个类、方法和属性。

11）F4 ：显示[类的继承](https://so.csdn.net/so/search?q=%E7%B1%BB%E7%9A%84%E7%BB%A7%E6%89%BF&spm=1001.2101.3001.7020)关系，并打开类继承视图。

12）Ctrl + H ：查找 ，可以在整个工程查找或者查找替换

### 7、调试快捷键

1）Ctrl + Shift + B ：在当前行设置断点或取消设置的断点。

2）F11 ：调试最后一次执行的程序。

3）Ctrl + F11 ：运行最后一次执行的程序。

4）F5 ：单步跟踪到方法中。

5）Ctrl + F5 ：单步跳入选择。

6）Shift + F5 ：使用过滤器单步执行。

7）F6 ：单步执行程序。

8）F7 ：执行完方法，返回到调用此方法的后一条语句。

9）F8 ：继续执行，到下一个断点或程序结束。

## 二、常用设置

### 1、设置Workspace中文件编码

在eclipse中，默认的Text file encoding是GBK（操作系统是中文简体）；如果操作系统是中文繁体，默认是MS950（Big5）

项目中大多使用的是UTF-8

通过在eclipse中对workspace修改编码格式，如下：

Window -> Preferences -> General -> Workspace -> Text file encoding -> Other , 修改成 UTF-8

### 2、代码自动提示

Window -> Preferences -> Java -> Editor -> Content Assist -> Auto Activation

默认设置是输入“.” 后，才会出现提示。想要输入什么都提示，可以修改这里的第二项“Auto Activation Triggers for Java”,

把"."修改为"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"， 这样就会 输入每个字母都提示。

同样的方法，可以修改Javascript和HTML页面的代码提示：

Window -> Preferences -> JavaScript-> Editor -> Content Assist -> Auto-Activation

Window -> Preferences -> Web -> HTML Files -> Editor -> Content Assist -> Auto Activation

### 3、设置JSP文件编码

Window -> Preferences -> Web -> JSP Files -> Encoding (一般是设置为UTF-8)

### 4、如何在Eclipse中调整package的上下顺序

设置： 右键项目 -> Build Path -> Configure Build Path -> 右侧，Order and Export -> Up or Down。