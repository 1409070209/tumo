1. install redis on 6379 port
2. cd project-name
3. run yarn start 
4. cd ../antd-demo 
5. run yarn start

项目启动使用nestjs开发后端，使用react antd开发前端
主要功能以来redis的有序列表

nestjs封装了socket和redis的module直接使用就行了不用配置非常简单

时间有限，获取排名依赖了100个event，由客户端决定监听自己的event实现实时获取排名功能。

开发了并发100条异步请求到redis的功能，往往1s左右可以完全处理

客户端监听getList和getRank两个接口，在新增API触发这两个事件完成基本的功能。



