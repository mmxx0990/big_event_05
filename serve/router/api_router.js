const express = require('express')
const router = express.Router()
const con = require('../util/sql.js')
const jwt = require("jsonwebtoken")
// 登录注册

// 注册接口
router.use(express.urlencoded())
router.post('/reguser', (req, res) => {
    const { username, password } = req.body
    // console.log(req.body);
    const sqlStrSelect = `select username from users where username="${username}"`
    con.query(sqlStrSelect, (err, result) => {
        if (err) return res.json({ status: 1, message: "服务器处理失败！" })
        if (result.length > 0) return res.json({ status: 201, message: "注册失败，名字占用了!" })
        const sqlStr = `insert into users (username, password) values ("${username}", "${password}")`
        con.query(sqlStr, (err, result) => {
            if (err) return res.json({ status: 1, message: "服务器处理失败！" })
            res.json({ status: 0, message: "注册成功!!" })
        })
    })
})


// 登录接口
router.post('/login', (req, res) => {
    const { username, password } = req.body
    const sqlStr = `select * from users where username="${username}" and password="${password}"`
    con.query(sqlStr, (err, result) => {
        if (err) return res.json({ status: 1, message: "服务器处理失败！" })
        if (result.length > 0) {
            const token = 'Bearer ' + jwt.sign(
                { name: userName },
                'gz61',  // 加密的密码，要与express-jwt中的验证密码一致
                { expiresIn: 2 * 60 * 60 } // 过期时间，单位是秒
            )
            res.json({ status: 0, message: "登录成功!" })
        } else {
            res.json({ status: 201, message: "登陆失败，用户名名或密码不对" })
        }
    })
})



module.exports = router;