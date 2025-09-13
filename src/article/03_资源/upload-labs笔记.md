---
icon: pen-to-square
date: 2024-12-10
category:
  - 资源
tags: 
title: upload-labs笔记
---

## pass-01 ：
本关上传漏洞由js验证，禁用或修改js即可
## pass-02：
	
查看提示看到是在服务端对数据的MIME进行检查，MIME验证就是验证文件的类型。修改文件类型即可，![Pasted image 20241128205732](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/Pasted%20image%2020241128205732.png)
- **HTTP**中的MIME：
    
    - HTTP中的MIME类型主要用于标识单个资源的类型，如HTML文档、图片、视频等。
        
    - 虽然HTTP也支持`multipart`类型（如`multipart/form-data`用于文件上传），但这种用法相对较少，且主要用于特定场景。

## pass-03：后缀黑名单绕过0
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250310191509.png)
简单的字符串匹配绕过
用php3格式上传即可
- php3是一php的前身，当php4出现后，后缀就统一为php了
## pass-04：.htaccess文件绕过
注意到这么长的列表不包括.htaccess后缀
```php
$deny_ext = array(".php",".php5",".php4",".php3",".php2","php1",".html",".htm",".phtml",".pht",".pHp",".pHp5",".pHp4",".pHp3",".pHp2","pHp1",".Html",".Htm",".pHtml",".jsp",".jspa",".jspx",".jsw",".jsv",".jspf",".jtml",".jSp",".jSpx",".jSpa",".jSw",".jSv",".jSpf",".jHtml",".asp",".aspx",".asa",".asax",".ascx",".ashx",".asmx",".cer",".aSp",".aSpx",".aSa",".aSax",".aScx",".aShx",".aSmx",".cEr",".sWf",".swf");
```
htaccess文件是Apache服务器中的一个配置文件，它负责相关目录下的网页配置，并具有比php的config文件更高的优先级。
  1. 先上传一个图片格式的一句话木马，如muma.jpg
  2. 创建.htaccess文件(注意不能有名称因为.htaccess是隐藏的配置文件)，并上传内容：
```
<FilesMatch "muma.jpg">
SetHandler application/x-httpd-php
</FilesMatch>
```
### **代码解释**

```apache
<FilesMatch "muma.jpg">
    SetHandler application/x-httpd-php
</FilesMatch>
```

1. **`<FilesMatch>`指令**：
    - `FilesMatch`是一个正则表达式匹配指令，用于匹配文件名。
    - 在这个例子中，它匹配文件名**完全等于`muma.jpg`**的文件。
2. **`SetHandler`指令**：
    - `SetHandler`用于指定文件的处理方式。
    - `application/x-httpd-php`是一个特殊的处理器，告诉Apache服务器将匹配的文件作为PHP脚本处理，而不是作为普通文件发送给客户端。

***当URL被服务器解析后，在当前目录下会优先执行本目录的.htaccess文件，并按照相应规则设置PHP解释器的行为，然后，再执行传入的指令(注意，这个配置文件只改变appache识别文件的方式，不改变文件的实际后缀)***
## pass-05:大小写绕过
  上传php文件时将php替换为Php或其他即可
```php
  $deny_ext = array(".php",".php5",".php4",".php3",".php2",".html",".htm",".phtml",".pht",".pHp",".pHp5",".pHp4",".pHp3",".pHp2",".Html",".Htm",".pHtml",".jsp",".jspa",".jspx",".jsw",".jsv",".jspf",".jtml",".jSp",".jSpx",".jSpa",".jSw",".jSv",".jSpf",".jHtml",".asp",".aspx",".asa",".asax",".ascx",".ashx",".asmx",".cer",".aSp",".aSpx",".aSa",".aSax",".aScx",".aShx",".aSmx",".cEr",".sWf",".swf",".htaccess")
```
黑名单中不包括大写的Php
## pass-06：空格绕过
  可以通过对文件后缀名末尾进行添加空格的方式来进行绕过。
## pass-07：加点绕过
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250310174355.png)
关键代码，是获取文件扩展名的缺陷，只获取最后一个.之后的内容
于是在拓展名之后加点即可绕过
## pass-08:     ::$DATA后缀绕过
```php
$is_upload = false;
$msg = null;
if (isset($_POST['submit'])) {
    if (file_exists(UPLOAD_PATH)) {
        $deny_ext = array(".php",".php5",".php4",".php3",".php2",".html",".htm",".phtml",".pht",".pHp",".pHp5",".pHp4",".pHp3",".pHp2",".Html",".Htm",".pHtml",".jsp",".jspa",".jspx",".jsw",".jsv",".jspf",".jtml",".jSp",".jSpx",".jSpa",".jSw",".jSv",".jSpf",".jHtml",".asp",".aspx",".asa",".asax",".ascx",".ashx",".asmx",".cer",".aSp",".aSpx",".aSa",".aSax",".aScx",".aShx",".aSmx",".cEr",".sWf",".swf",".htaccess");
        $file_name = trim($_FILES['upload_file']['name']);
        $file_name = deldot($file_name);//删除文件名末尾的点
        $file_ext = strrchr($file_name, '.');
        $file_ext = strtolower($file_ext); //转换为小写
        $file_ext = trim($file_ext); //首尾去空
        
        if (!in_array($file_ext, $deny_ext)) {
            $temp_file = $_FILES['upload_file']['tmp_name'];
            $img_path = UPLOAD_PATH.'/'.date("YmdHis").rand(1000,9999).$file_ext;
            if (move_uploaded_file($temp_file, $img_path)) {
                $is_upload = true;
            } else {
                $msg = '上传出错！';
            }
        } else {
            $msg = '此文件类型不允许上传！';
        }
    } else {
        $msg = UPLOAD_PATH . '文件夹不存在,请手工创建！';
    }
}
```
发现相较于其他关没有过滤::$DATA,现在去看看这是什么东西
- 1. **漏洞触发条件（未处理 `::$DATA` 时）**：
    - 如果代码未去除 `::$DATA`：
        - 后缀检查时，后缀为 `.php::$DATA`，不在黑名单（如黑名单仅检查 `.php`）。
        - 文件保存时，Windows 系统会自动忽略 `::$DATA`，实际存储为 `shell.php`。
        - 攻击者成功上传 PHP Webshell。
  用添加::$DATA绕过
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250313220018.png)
windows环境下绕过成功
## pass-09:
这是一个代码逻辑错误，正则表达式只匹配一次，所以可以多加点和空格绕过
## pass-10:复写绕过
  由于只是把黑名单内的后缀删除，但是正常上传，所以可以用复写后缀的方式上传
```php
 $deny_ext = array("php","php5","php4","php3","php2","html","htm","phtml","pht","jsp","jspa","jspx","jsw","jsv","jspf","jtml","asp","aspx","asa","asax","ascx","ashx","asmx","cer","swf","htaccess");
```
发现没把大写后缀加入字符串
```php
$file_name = str_ireplace($deny_ext,"", $file_name);
```
不区分大小写替换字符串为空
整体分析一下
```php
if (isset($_POST['submit'])) {
    if (file_exists(UPLOAD_PATH)) {
        $deny_ext = array("php","php5","php4","php3","php2","html","htm","phtml","pht","jsp","jspa","jspx","jsw","jsv","jspf","jtml","asp","aspx","asa","asax","ascx","ashx","asmx","cer","swf","htaccess");

        $file_name = trim($_FILES['upload_file']['name']);
        $file_name = str_ireplace($deny_ext,"", $file_name);
        $temp_file = $_FILES['upload_file']['tmp_name'];
        $img_path = UPLOAD_PATH.'/'.$file_name;        
        if (move_uploaded_file($temp_file, $img_path)) {
            $is_upload = true;
        } else {
            $msg = '上传出错！';
        }
    } else {
        $msg = UPLOAD_PATH . '文件夹不存在,请手工创建！';
    }
}
```
hh，当检测到黑名单后缀时，会删除掉黑名单后缀，并继续上传文件：）
```
ok.pphphp
```
在重放器把名字改成这个即可

# Pass-11
```php
$is_upload = false;
$msg = null;
if(isset($_POST['submit'])){
    $ext_arr = array('jpg','png','gif');
    $file_ext = substr($_FILES['upload_file']['name'],strrpos($_FILES['upload_file']['name'],".")+1);
    if(in_array($file_ext,$ext_arr)){
        $temp_file = $_FILES['upload_file']['tmp_name'];
        $img_path = $_GET['save_path']."/".rand(10, 99).date("YmdHis").".".$file_ext;

        if(move_uploaded_file($temp_file,$img_path)){
            $is_upload = true;
        } else {
            $msg = '上传出错！';
        }
    } else{
        $msg = "只允许上传.jpg|.png|.gif类型文件！";
    }
}
```
本题采用白名单验证并在验证不通过时会丢弃文件，整体看没发现漏洞，看来是知识储备不足了，这是去百度一下，发现了空字节截断技术----get00截断
在php的版本<5.3.4，
文件名包含%00被上传到`$_FILES`中的name中，进行识别，但是在执行
```php
move_uploaded_file($temp_file,$img_path)
```
时会把`%00`及以后的内容进行截断
不过
```原理
%00是URL编码的空字符（ASCII码0）
- PHP在解析HTTP请求时，会直接使用HTTP服务器解码后的数据。
- 如果文件名中包含`%00`，PHP会将其作为`\0`（空字节）存储在`$_FILES`数组中。
- php一些底层函数是由C语言写的，而C语言会把`\0`当做字符串终止符，造成字符串截断
```

## Pass-13
本关要求使用jpg\png\gif三种格式的文件进行上传，并用自带的上传文件测试程序进行测试
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250312103730.png)

这题会识别上传文件的前两个字节，然后会匹配字节对应的文件类型，随后把源文件的后缀删除，替换为对应的后缀
```php
function getReailFileType($filename){
    $file = fopen($filename, "rb");
    $bin = fread($file, 2); //只读2字节
    fclose($file);
    $strInfo = @unpack("C2chars", $bin);    
    $typeCode = intval($strInfo['chars1'].$strInfo['chars2']);    
    $fileType = '';    
    switch($typeCode){      
        case 255216:            
            $fileType = 'jpg';
            break;
        case 13780:            
            $fileType = 'png';
            break;        
        case 7173:            
            $fileType = 'gif';
            break;
        default:            
            $fileType = 'unknown';
        }    
        return $fileType;
}

$is_upload = false;
$msg = null;
if(isset($_POST['submit'])){
    $temp_file = $_FILES['upload_file']['tmp_name'];
    $file_type = getReailFileType($temp_file);

    if($file_type == 'unknown'){
        $msg = "文件未知，上传失败！";
    }else{
        $img_path = UPLOAD_PATH."/".rand(10, 99).date("YmdHis").".".$file_type;
        if(move_uploaded_file($temp_file,$img_path)){
            $is_upload = true;
        } else {
            $msg = "上传出错！";
        }
    }
}
```
### 补充知识
**JPEG（JPG）**
- 前两个字节是：`0xFF 0xD8`
**PNG**
- 前两个字节是：`0x89 0x50`
**GIF**
- 前两个字节是：`0x47 0x49`
用010editor更改文件头再进行上传，然后用漏洞php进行测试连接即可
```url
http://192.168.254.128/include.php?file=http://192.168.254.128/upload/7920250312022647.jpg
```

## Pass-14
这题关键代码是这个
```php
$info = getimagesize($filename);
        $ext = image_type_to_extension($info[2]);
```
这关即使是正常的jpg图片无法上传，等windows环境搭建好后再次尝试
### 补充知识
在getimagesize()函数中，索引2的值代表文件类型，并且索引2由文件头决定，此外如果其他索引值无法解析，依旧不影响索引2的返回，但是这只存在于理论，稳妥的办法依旧是再做一张图片马
我做图片马的方法是直接往图片里写入一句话木马

## Pass-15
本关用exif_imagetype($filename)来读取图片信息
`exif_imagetype($filename)`与` getimagesize($filename)
的区别：
```
exif_imagetype($filename)：
- 性能更高，因为它只读取文件的头部信息来判断图像类型，不会加载整个图像文件。
```
和上一关通关方法一样，不同的是，这次jpg图片可以正常上传
## Pass-16
这里粘贴一句话木马不会被二次渲染删除，且具有gif特征

## Pass-17
本关看似无法攻破
```php
$is_upload = false;
$msg = null;

if(isset($_POST['submit'])){
    $ext_arr = array('jpg','png','gif');
    $file_name = $_FILES['upload_file']['name'];
    $temp_file = $_FILES['upload_file']['tmp_name'];
    $file_ext = substr($file_name,strrpos($file_name,".")+1);
    $upload_file = UPLOAD_PATH . '/' . $file_name;

    if(move_uploaded_file($temp_file, $upload_file)){
        if(in_array($file_ext,$ext_arr)){
             $img_path = UPLOAD_PATH . '/'. rand(10, 99).date("YmdHis").".".$file_ext;
             rename($upload_file, $img_path);
             $is_upload = true;
        }else{
            $msg = "只允许上传.jpg|.png|.gif类型文件！";
            unlink($upload_file);
        }
    }else{
        $msg = '上传出错！';
    }
}
```
这关存在一个逻辑漏洞，那就是在文件上传到服务器后会先文件保存到指定上传路径，然以后再进行判断，判断错误才会删除文件，这时候，我们就可以用条件竞争进行访问马
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250313201029.png)

![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250313201042.png)
两个抓包，发送到intruder进行多线程重放攻击
配置`payload`类型为`Null payloads`,然后配置资源池，进行攻击，尝试可能不成功

## Pass-18

## Pass-19
本关采用黑名单绕过
```php
$is_upload = false;
$msg = null;
if (isset($_POST['submit'])) {
    if (file_exists(UPLOAD_PATH)) {
        $deny_ext = array("php","php5","php4","php3","php2","html","htm","phtml","pht","jsp","jspa","jspx","jsw","jsv","jspf","jtml","asp","aspx","asa","asax","ascx","ashx","asmx","cer","swf","htaccess");

        $file_name = $_POST['save_name'];
        $file_ext = pathinfo($file_name,PATHINFO_EXTENSION);

        if(!in_array($file_ext,$deny_ext)) {
            $temp_file = $_FILES['upload_file']['tmp_name'];
            $img_path = UPLOAD_PATH . '/' .$file_name;
            if (move_uploaded_file($temp_file, $img_path)) { 
                $is_upload = true;
            }else{
                $msg = '上传出错！';
            }
        }else{
            $msg = '禁止保存为该类型文件！';
        }

    } else {
        $msg = UPLOAD_PATH . '文件夹不存在,请手工创建！';
    }
}
```
这题可以采用某些windows特性如以.结尾，在文件后面添加::DATA，这关主要目的是测试你能否进行下一关
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250313220158.png)
windows复现成功

## Pass-20
```php
$is_upload = false;
$msg = null;
if(!empty($_FILES['upload_file'])){
    //检查MIME
    $allow_type = array('image/jpeg','image/png','image/gif');
    if(!in_array($_FILES['upload_file']['type'],$allow_type)){
        $msg = "禁止上传该类型文件!";
    }else{
        //检查文件名
        $file = empty($_POST['save_name']) ? $_FILES['upload_file']['name'] : $_POST['save_name'];
        if (!is_array($file)) {
            $file = explode('.', strtolower($file));
        }

        $ext = end($file);
        $allow_suffix = array('jpg','png','gif');
        if (!in_array($ext, $allow_suffix)) {
            $msg = "禁止上传该后缀文件!";
        }else{
            $file_name = reset($file) . '.' . $file[count($file) - 1];
            $temp_file = $_FILES['upload_file']['tmp_name'];
            $img_path = UPLOAD_PATH . '/' .$file_name;
            if (move_uploaded_file($temp_file, $img_path)) {
                $msg = "文件上传成功！";
                $is_upload = true;
            } else {
                $msg = "文件上传失败！";
            }
        }
    }
}else{
    $msg = "请选择要上传的文件！";
}
```

```php
if (!is_array($file)) {
            $file = explode('.', strtolower($file));
        }
```
- `explode()`这条代码会把传入的字符串以.分割为数组
- 但是会先判断是否为数组，如果不是数组才会进行分割操作
```php
$ext = end($file);
```
这条代码会返回数组最后一个的索引
```php
$file_name = reset($file) . '.' . $file[count($file) - 1];
```
- count():会计算数组中的有效数据，也就是说null数据不会算在内
这条代码会拼接file_name为索引0和索引最后一个,
我们直接构造bp包，并构造两个相同的字段
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250313211912.png)
关键部分
![image.png](https://cdn.jsdelivr.net/gh/fakeppa/blog-img/20250313212014.png)
这部分会生成一个数组，并且`count(arr)的值为2`：
1. 1.php
2. null
3. jpg
在上传的时候会将1.php拼接.和null（也就是什么都没有）上传到目录的名称就会为1.php.在windows环境下就是1.php