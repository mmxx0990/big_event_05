const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())



const jwt = require('express-jwt');
// app.use(jwt().unless());
// jwt() 用于解析token，并将 token 中保存的数据 赋值给 req.user
// unless() 约定某个接口不需要身份认证

// app.use(jwt({
//     secret: 'gz61', // 生成token时的 钥匙，必须统一
//     algorithms: ['HS256'] // 必填，加密算法，无需了解
// }).unless({
//     path: [] // 除了这两个接口，其他都需要认证
// }));




const api = require('./router/api_router')
const my = require('./router/my_router')
const article = require('./router/my_article_router')
const admin = require('./router/admin_-article_router')

const index = require('./router/index_router')
app.use('/api', api)
app.use('/my', my)
app.use('/my/article', article)
app.use('/admin/article', admin)

app.use('/index', index)

// 错误处理中间件
// app.use((err, req, res, next) => {
//     // console.log('有错误', err)
//     if (err.name === 'UnauthorizedError') {
//         // res.status(401).send('invalid token...');
//         res.status(401).send({ code: 1, message: '身份认证失败！' });
//     }
// });



app.listen(52180, () => {
    console.log('服务器已在：52180端口启动');
})