# webpack4 demo
这是一个webpack4的node.js案例。

- Node.js
- Koa
- vue
- Webpack
- 多语言
- 多页面

## npm install
首先安装需要的依赖：

```sh
npm ci node-sass --sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
```

> 因为依赖node-sass，指定node-sass镜像地址到淘宝镜像地址，加速下载。

## build
构建前端页面，启动node.js服务。

前端构建：

```sh
npm run webpack
```

后端服务：
```sh
npm run develop //启动node
```

open `127.0.0.1:4000`.

open `http://localhost:8000/`.

### 目录结构

- client  保存前端文件目录(frontEnd源码)
- server  Node服务文件目录(编译完成并注入了js&css的html文件会保存到这个目录下的views)
- static  静态资源文件目录(所有前端编译后的文件都会保存到这个目录)