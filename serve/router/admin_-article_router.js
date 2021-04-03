const express = require('express')
const router = express.Router()
const con = require('../util/sql.js')

router.use(express.urlencoded())
// 1-文章搜索
router.get('/query', (req, res) => {
    const { key, type, state, page, perpage } = req.query

})


// 2-发布文章
//  // 特殊接口：上传文件
const multer = require('multer')
// const upload = multer({ dest: 'up' })
// 精细化去设置，如何去保存文件
const storage = multer.diskStorage({
    // 保存在哪里
    destination: function (req, file, cb) {
        cb(null, 'up');
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
const uploa = multer({ storage })
router.post('/publish', uploa.single('cover'), (req, res) => {
    const { title, categoryId, date, content, state } = req.body
    let isDelete = 1
    let author = '管理员'
    let cover = 'http://192.168.79.26:52180/admin/article/publish/' + req.file.filename
    const sqlStr = `insert into articles (title,cover,categoryId,date,content,state,isDelete,author) value ("${title}","${cover}",${categoryId},"${date}","${content}","${state}",${isDelete},"${author}")`
    con.query(sqlStr, (err, result) => {
        console.log(err);
        if (err) return res.json({ code: 500, msg: "发布失败", })
        res.json({ code: 200, msg: "发布成功", })
    })
})

// 3-根据id获取文章信息
router.get('/search', (req, res) => {
    const { id } = req.query
    console.log(id);
    const sqlStr = `select * from articles where id=${id}`
    con.query(sqlStr, (err, result) => {
        if (err) return res.json({ code: 500, message: "获取失败" })
        res.json({ code: 200, message: "获取成功", data: result })
    })
})

// 4-文章编辑
router.post('/edit', (req, res) => {
    const { id, title, cover, categoryId, date, content, state } = req.body
    const condition = []
    if (title) condition.push(`title="${title}"`)
    if (cover) condition.push(`cover="${cover}"`)
    if (categoryId) condition.push(`categoryId=${categoryId}`)
    if (date) condition.push(`date="${date}"`)
    if (content) condition.push(`content="${content}"`)
    if (state) condition.push(`state="${state}"`)
    const conditionStr = condition.join()
    const sqlStr = `update articles set ${conditionStr} where id=${id}`
    con.query(sqlStr, (err, result) => {
        if (err) return res.json({ code: 500, msg: "修改失败" })
        res.json({ code: 200, msg: "修改成功" })
    })
})


// 5-删除文章
router.post('/delete', (req, res) => {
    const { id } = req.body
    const sqlStr = `update articles set isdelete=0 where id=${id}`
    con.query(sqlStr, (err, result) => {
        if (err) return res.json({ code: 500, msg: "删除失败" })
        res.json({ code: 200, msg: "删除成功" })
    })
})




module.exports = router;