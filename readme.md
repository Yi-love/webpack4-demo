# webpack4 demo【docker】
**Docker封装版**：这是一个webpack4的node.js案例。

- Node.js
- Koa
- vue
- Webpack
- 多语言
- 多页面

## 创建镜像

```sh
docker build -t webpack4:3.0 .
```

## 生成容器

```sh
docker container run -p 4000:4000 webpack4:3.0
```


open `127.0.0.1:4000`.

open `http://localhost:4000/`.

### 目录结构

- client  保存前端文件目录(frontEnd源码)
- server  Node服务文件目录(编译完成并注入了js&css的html文件会保存到这个目录下的views)
- static  静态资源文件目录(所有前端编译后的文件都会保存到这个目录)

### 版本历史

- 2018

step_0 单入口，单页面案例 https://github.com/Yi-love/webpack4-demo/tree/step_0

step_1 多入口，多页面案例  https://github.com/Yi-love/webpack4-demo/tree/step_1

step_2 多入口，多页面案例-升级版 https://github.com/Yi-love/webpack4-demo/tree/step_2

- 2019-05-23

step_3 多入口，多页面，多语言 https://github.com/Yi-love/webpack4-demo/tree/step_3