---
icon: pen-to-square
date: 2025-02-15
tags: 
title: webrtc搭建简单直播网站
category:
  - 项目
---
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
