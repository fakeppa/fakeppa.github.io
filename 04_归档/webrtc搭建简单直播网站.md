---
icon: pen-to-square
date: 2025-02-15
tags: 
title: webrtc搭建简单直播网站
category:
  - 归档
---
nuclei，自动化模板
ehole，漏扫
fscan，漏扫
xray，被动扫描



***这是一个探索中的废案，SRS拥有更简单的部署方案***
#### 1. 安装依赖

确保系统已安装必要的依赖库：

bash复制

```bash
sudo apt update
sudo apt install -y libglib2.0-dev libnice-dev libssl-dev libgstreamer1.0-dev libgstreamer-plugins-base1.0-dev libgstreamer-plugins-bad1.0-dev gstreamer1.0-plugins-base gstreamer1.0-plugins-good gstreamer1.0-plugins-bad gstreamer1.0-plugins-ugly gstreamer1.0-libav gstreamer1.0-tools gstreamer1.0-x gstreamer1.0-alsa gstreamer1.0-gl gstreamer1.0-gtk3 gstreamer1.0-qt5 gstreamer1.0-pulseaudio
```

#### 2. 下载并安装 webrtc-streamer

从 GitHub 下载预编译的二进制文件：

bash复制

```bash
wget https://github.com/mpromonet/webrtc-streamer/releases/download/v0.7.0/webrtc-streamer-v0.7.0-Linux-x86_64-Release.tar.gz
tar -zxvf webrtc-streamer-v0.7.0-Linux-x86_64-Release.tar.gz
mv webrtc-streamer-v0.7.0-Linux-x86_64-Release/ webrtc-streamer
cd webrtc-streamer
```

运行程序并检查依赖是否完整：

bash复制

```bash
./webrtc-streamer
```

如果缺少依赖，根据提示安装，例如 `libX11.so.6`。

#### 3. 配置并启动 webrtc-streamer

编辑配置文件（可选）或直接启动服务：

bash复制

```bash
./webrtc-streamer -H 0.0.0.0:8000
```

访问 `http://<your-server-ip>:8000`，默认会显示摄像头或桌面共享流。

#### 4. 播放 RTSP 流

在浏览器中使用 WebRtcStreamer 的 JavaScript API 播放 RTSP 流：

JavaScript复制

```javascript
const videoElement = document.getElementById('video');
const streamer = new WebRtcStreamer(videoElement, 'http://<your-server-ip>:8000');
streamer.connect('rtsp://your-rtsp-stream-address');
```


---
要配置视频流以便在 `webrtc-streamer` 中使用，您需要指定视频流的 URL。`webrtc-streamer` 是一个开源项目，它可以将 RTSP 流转换为 WebRTC 流，以便在浏览器中播放。以下是配置视频流的步骤：

1. **启动 `webrtc-streamer` 服务**： 使用命令行启动 `webrtc-streamer` 服务，并指定监听的 HTTP 端口。例如：
    
    bash复制
    
    ```bash
    ./webrtc-streamer -H 0.0.0.0:8000
    ```
    
    这将使服务监听在所有 IP 地址的 8000 端口上。
    
2. **配置视频流 URL**： 您可以通过命令行参数直接指定视频流 URL，或者使用配置文件来管理多个视频流。例如，使用命令行参数指定 RTSP 流：
    
    bash复制
    
    ```bash
    ./webrtc-streamer -H 0.0.0.0:8000 rtsp://your_rtsp_stream_address
    ```
    
    或者，您可以创建一个 JSON 配置文件（如 `config.json`），并在其中指定视频流 URL。然后，使用 `-C` 参数加载配置文件：
    
    bash复制
    
    ```bash
    ./webrtc-streamer -H 0.0.0.0:8000 -C config.json
    ```
    
    配置文件 `config.json` 的内容可能如下所示：
    
    JSON复制
    
    ```json
    {
      "PriceCenterPlaza": { "video": "rtsp://132.239.12.145/axis-media/media.amp" },
      "Waterford": { "video": "rtsp://86.44.41.160/axis-media/media.amp", "position": "52.258330,-7.111940" }
    }
    ```
    
    这样，您就可以在 `webrtc-streamer` 的 Web 界面中选择不同的视频流进行播放了。
    
3. **访问 `webrtc-streamer` Web 界面**： 打开浏览器，访问 `http://localhost:8000` 或 `http://<your-server-ip>:8000`。您应该能看到 `webrtc-streamer` 的默认页面，该页面可能包含一个或多个视频流的播放选项。
    
4. **播放视频流**： 在 `webrtc-streamer` 的 Web 界面中，点击相应的视频流链接开始播放。如果一切配置正确，视频流应该会在浏览器中播放。

用web-simple构建网页
```bash
java -jar -Dserver.port=1688 EasyMedia-1.2.0.jar
```