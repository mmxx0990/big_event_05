const express = require('express');
const router = express.Router();
const con = require('../util/sql')

// 个人中心

// 1-获取用户的基本信息
router.get('/userinfo', (req, res) => {
    const { username } = req.query
    console.log(username);
    const sqlStr = `select username,nickname,email,userPic from users where username="${username}"`
    con.query(sqlStr, (err, data) => {
        if (err) return res.json({ status: 1, message: "获取失败！" })
        res.json({ status: 0, message: "获取成功！", data })
    })
})

// 2-更新用户的基本信息
router.use(express.urlencoded())
router.post('/userinfo', (req, res) => {
    const { id, nickname, email, userPic } = req.body
    const condition = []
    if (nickname) condition.push(`nickname="${nickname}"`)
    if (email) condition.push(`email="${email}"`)
    if (userPic) condition.push(`userPic="${userPic}"`)
    const conditionStr = condition.join()
    const sqlStr = `update users set ${conditionStr} where id=${id}`
    con.query(sqlStr, (err, result) => {
        if (err) return res.json({ status: 1, message: "修改失败！" })
        res.json({ status: 0, message: "修改成功！" })
    })
})

// 3-上传用户头像

//  // 特殊接口：上传文件
const multer = require('multer')
// const upload = multer({ dest: 'uploads' })
// 精细化去设置，如何去保存文件
const storage = multer.diskStorage({
    // 保存在哪里
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    // 保存时，文件名叫什么
    filename: function (req, file, cb) {
        // console.log('file', file)
        // 目标： 新名字是时间戳+后缀名
        const filenameArr = file.originalname.split('.');
        // filenameArr.length-1是找到最后一个元素的下标
        const fileName = Date.now() + "." + filenameArr[filenameArr.length - 1]
        cb(null, fileName) //
    }
})
const upload = multer({ storage })
router.post('/uploadPic', upload.single('file_data'), (req, res) => {
    // return console.log(req.file.filename);
    res.json({
        "status": 0,
        "msg": "上传成功",
        "message": "http://192.168.79.26:52180/my/uploadPic/" + req.file.filename
    })
})

// 4-重置密码
router.post('/updatepwd', (req, res) => {
    const { oldPwd, newPwd, id } = req.body
    const condition = []
    if (newPwd) condition.push(`password="${newPwd}"`)
    const conditionStr = condition.join()
    const sqlStr = `update users set ${conditionStr} where id=${id}`
    con.query(sqlStr, (err, result) => {
        if (err) return res.json({ status: 1, message: "服务器错误！" })
        res.json({ status: 0, message: "成功！" })
    })
})


module.exports = router;