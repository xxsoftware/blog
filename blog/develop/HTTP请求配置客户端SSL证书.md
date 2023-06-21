---
slug: http-config-client-ssl-certificate
title: HTTP配置客户端SSL证书
date: 2022-02-17
authors: 東雲研究所
tags: [http, ssl]
keywords: [http, ssl]
---

HTTPS 协议是由 SSL/TLS+HTTP 协议构建的可进行加密传输、身份认证的网络协议，要比 http 协议安全，很多大型互联网网站都用了都用了 https,那么他们之间有什么具体的区别，又如何配置呢？

<!-- truncate -->

## HTTP 和 HTTPS

### HTTP

    HTTP 协议也就是超文本传输协议，是一种使用明文数据传输的网络协议。一直以来 HTTP 协议都是最主流的网页协议，HTTP 协议被用于在 Web 浏览器和网站服务器之间传递信息，以明文方式发送内容，不提供任何方式的数据加密，如果攻击者截取了 Web 浏览器和网站服务器之间的传输报文，就可以直接读懂其中的信息。

![](https://img.xxsoftware.top/https-demo.jpg)

### HTTPS

    为了解决 HTTP 协议的这一缺陷，需要使用另一种协议：安全套接字层超文本传输协议 HTTPS，为了数据传输的安全，HTTPS 在 HTTP 的基础上加入了 SSL/TLS 协议，SSL/TLS 依靠证书来验证服务器的身份，并为浏览器和服务器之间的通信加密。HTTPS 协议可以理解为 HTTP 协议的升级，就是在 HTTP 的基础上增加了数据加密。在数据进行传输之前，对数据进行加密，然后再发送到服务器。这样，就算数据被第三者所截获，但是由于数据是加密的，所以你的个人信息仍然是安全的。这就是 HTTP 和 HTTPS 的最大区别。

### HTTP 和 HTTPS 的区别

![](https://img.xxsoftware.top/http-safe.jpg)

#### 1.安全性不同

    https:// 前缀表明是用 SSL (安全套接字)或 TSL 加密的，你的电脑与服务器之间收发的信息传输将更加安全。当你使用浏览器访问一个 HTTP 网站的时候，你会发现浏览器会对该 HTTP 网站显示“不安全”的安全警告，提示用户当前所访问的网站可能会存在风险。

    而假如你访问的是一个HTTPS网站时，情况却是完全不一样。你会发现浏览器的地址栏会变成绿色，企业名称会展示在地址栏中，地址栏上面还会出现一把“安全锁”的图标。这些都会给予用户很大的视觉上的安全体验。

#### 2.网站申请流程不同

    https协议需要到CA申请证书，一般免费证书很少，需要交费，Web服务器启用SSL需要获得一个服务器证书并将该证书与要使用SSL的服务器绑定。

#### 3.默认端口不同

    http和https使用的是完全不同的连接方式，同时使用的端口也不同，http使用的是80端口，https使用的是443端口。在网络模型中，HTTP工作于应用层，而HTTPS工作在传输层。

#### 4.对搜索排名的提升

    这也是很多站长所关注的地方。百度和谷歌两大搜索引擎都已经明确表示，HTTPS网站将会作为搜索排名的一个重要权重指标。也就是说HTTPS网站比起HTTP网站在搜索排名中更有优势。

## 如何配置 HTTPS

### 首先你需要一个 http 网站

    这是最起码的吧

### 购买申请一个 SSL 证书

    之后你就需要一个SSl证书了,我这里用的是阿里云的免费证书，阿里云可以免费申请20个SSL证书，当然你也可以直接购买。

![](https://img.xxsoftware.top/SSL.jpg)

### 部署

    之后你就可以直接一键部署了，不过我的服务器是在京东云上的caddy，caddy是自带HTTPS的。

    将 example.com 替换为您的域名，如果您使用的是 IPv6，请将 type=A 替换为 type=AAAA ：

    curl "https://cloudflare-dns.com/dns-query?name=example.com&type=A" \
    -H "accept: application/dns-json"

    可能有些同学跑不通，到时候就要设置镜像或者下载刚刚在阿里云申请到的证书，把证书上传到服务器，然后在Caddyfile里
    配置tls后面跟上你上传的证书名字。
    之后再在命令行输入systemctl restart caddy重启caddy服务，你就发现你的网站从http协议变成https协议了
