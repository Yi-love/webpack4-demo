# webpack4 demo
use webpack4 build you application demo.

> webpack4 构建多入口，多页面案例二。

## npm install

```sh
npm install
```

### dir

```
client  保存前端文件目录(frontEnd源码)
server  Node服务文件目录(编译完成并注入了js&css的html文件会保存到这个目录下的views)
static  静态资源文件目录(所有前端编译后的文件都会保存到这个目录)
```

## build

```sh
webpack //打包

npm run develop //启动node
```

open `127.0.0.1:4000`.