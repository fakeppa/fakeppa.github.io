---
icon: pen-to-square
date: 2024-12-27
tags: 
title: mc服务器命令
category:
  - 资源
---
启动服务器
```bash
java -Xmx2G -jar fabric-server-mc.1.20.4-loader.0.15.3-launcher.1.0.1.jar nogui
```

1. **玩家管理**:
   - `/ban`: 禁止玩家。
   - `/deop`: 移除玩家的管理员权限。
   - `/op`: 给予玩家管理员权限。
   - `/pardon`: 解除对玩家的禁止。
   - `/kick`: 踢出玩家。
   - `/kill`: 杀死玩家或实体。

2. **游戏管理**:
   - `/gamemode`: 设置玩家的游戏模式。
   - `/difficulty`: 设置游戏难度。
   - `/defaultgamemode`: 设置默认游戏模式。
   - `/gamerule`: 修改游戏规则。

3. **物品与资源**:
   - `/give`: 给予玩家物品。
   - `/clear`: 清除玩家的物品。
   - `/enchant`: 给物品附魔。

4. **世界编辑**:
   - `/setblock`: 设置或替换方块。
   - `/fill`: 填充区域。
   - `/clone`: 克隆区域。
   - `/spawnpoint`: 设置玩家的重生点。

5. **命令执行**:
   - `/execute`: 执行命令。
   - `/function`: 执行数据包中的函数。
   - `/schedule`: 安排函数执行。

6. **数据操作**:
   - `/data`: 修改实体或玩家的数据。
   - `/datapack`: 启用或禁用数据包。

7. **调试与性能**:
   - `/debug`: 开始或停止调试。
   - `/perf`: 开始或停止性能分析。
   - `/jfr`: 开始或停止Java Flight Recorder。

8. **游戏内通知**:
   - `/say`: 广播消息。
   - `/title`: 显示标题。
   - `/msg`: 私聊玩家。

9. **游戏环境**:
   - `/weather`: 设置天气。
   - `/time`: 设置或查询时间。
   - `/worldborder`: 修改世界边界。

10. **其他**:
    - `/help`: 显示帮助信息。
    - `/reload`: 重新加载服务器配置。
    - `/save-all`: 保存所有世界数据。


服务器配置信息

```
allow-flight=false  // 允许飞行
allow-nether=true  // 允许进入下界
broadcast-console-to-ops=true  // 将控制台消息广播给操作员
broadcast-rcon-to-ops=true  // 将RCON消息广播给操作员
difficulty=easy  // 难度设置为简单
enable-command-block=false  // 禁用命令方块
enable-jmx-monitoring=false  // 禁用JMX监控
enable-query=false  // 禁用查询
enable-rcon=false  // 禁用RCON
enable-status=true  // 启用状态
enforce-secure-profile=true  // 强制使用安全配置文件
enforce-whitelist=false  // 不强制使用白名单
entity-broadcast-range-percentage=100  // 实体广播范围百分比
force-gamemode=false  // 不强制游戏模式
function-permission-level=2  // 函数权限级别
gamemode=survival  // 游戏模式为生存
generate-structures=true  // 生成结构
generator-settings={}  // 生成器设置
hardcore=false  // 不启用困难模式
hide-online-players=false  // 不隐藏在线玩家
initial-disabled-packs=  // 初始禁用的资源包
initial-enabled-packs=vanilla  // 初始启用的资源包为原版
level-name=world  // 关卡名称为世界
level-seed=  // 关卡种子
level-type=minecraft\:normal  // 关卡类型为正常
log-ips=true  // 记录IP地址
max-chained-neighbor-updates=1000000  // 最大链式邻居更新
max-players=20  // 最大玩家数为20
max-tick-time=60000  // 最大滴答时间
max-world-size=29999984  // 最大世界大小
motd=A Minecraft Server  // 服务器信息
network-compression-threshold=256  // 网络压缩阈值
online-mode=true  // 在线模式
op-permission-level=4  // 操作员权限级别
player-idle-timeout=0  // 玩家闲置超时
prevent-proxy-connections=false  // 不防止代理连接
pvp=true  // 启用玩家对战
query.port=25565  // 查询端口
rate-limit=0  // 速率限制
rcon.password=  // RCON密码
rcon.port=25575  // RCON端口
require-resource-pack=false  // 不要求资源包
resource-pack=  // 资源包
resource-pack-id=  // 资源包ID
resource-pack-prompt=  // 资源包提示
resource-pack-sha1=  // 资源包SHA1
server-ip=  // 服务器IP
server-port=25565  // 服务器端口
simulation-distance=10  // 模拟距离
spawn-animals=true  // 生成动物
spawn-monsters=true  // 生成怪物
spawn-npcs=true  // 生成NPC
spawn-protection=16  // 生成保护
sync-chunk-writes=true  // 同步区块写入
text-filtering-config=  // 文本过滤配置
use-native-transport=true  // 使用本地传输
view-distance=10  // 视距
white-list=false  // 不使用白名单
```

