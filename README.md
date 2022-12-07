# vite-plugin-vue-dynamic-path
dynamic change dynamic components path

------

### 重点

*vite 3.2.4  依赖vite实验性设置 https://cn.vitejs.dev/guide/build.html#advanced-base-options*

~~~json
// 配置
loadSourceConfig: {

   sourcePath: "/vue3-project/",//资源地址，同base

   insertTimeout: 400, //超时时间

   retryCount: 5,//重试次数

   filePath: "/sourceConfig.json",//请求拿到静态资源地址

  }
~~~



### 插件效果

将动态加载文件请求统一改成配置链接，利于多用户域名不同时cdn缓存，减少带宽

#### 效果

假设构建的项目部署在test.com下

1. 插件在build后生效
2. 使用插件后，将在html中head标签插入script
3. 首先请求构建域名下的html，html中的动态script会发送xhr请求该域名+filePath(/sourceConfig.json)地址（test.com/sourceConfig.json），得到返回的静态资源路径sourceUrl，务必返回值是示例格式{sourceUrl: "//teststatic.com"}
4. 动态资源的加载将都会走//teststatic.com，如//test.com/vue3-project/assets/js/vue-30df092c.js将会变成//teststatic.com/vue3-project/assets/js/vue-30df092c.js

