const express = require('express')
const router = express.Router()
const con = require('../util/sql.js')


router.use(express.urlencoded())
// 1-文章搜索
router.get('/search', (req, res) => {

})

// 2-文章类型
router.get('/category', (req, res) => {
    const sqlStr = `select id, name from categories `
    con.query(sqlStr, (err, result) => {
        if (err) return res.json({ code: 500, msg: "获取失败" })
        res.json({ code: 200, msg: "获取成功", result })
    })
})


// 3-热点图
router.get('/hotpic', (req, res) => {
    // 随机查询表中5条数据
    const sqlStr = `select id, cover  from articles order by rand() limit 5`
    con.query(sqlStr, (err, result) => {
        if (err) return res.json({ code: 500, msg: "获取失败" })
        res.json({ code: 200, msg: "获取成功", result })
    })
})
// 4-文章热门排行
router.get('/rank', (req, res) => {
    // 根据read字段查询表中7条数据
    const sqlStr = ` select id, title from articles   order by rand() desc limit 7 `
    con.query(sqlStr, (err, result) => {
        if (err) return res.json({ code: 500, msg: "获取失败" })
        res.json({ code: 200, msg: "获取成功", result })
    })
})


// 5-最新资讯
router.get('/latest', (req, res) => {
    const sqlStr = ` select * from articles   order by rand() desc limit 5 `
    con.query(sqlStr, (err, result) => {
        console.log(err);
        if (err) return res.json({ code: 500, msg: "获取失败" })
        res.json({ code: 200, msg: "获取成功", result })
    })
})


// 6-最新评论
router.get('/latest_comment', (req, res) => {
    const sqlStr = ` select author, date, content from comments   order by rand() desc limit 6 `
    con.query(sqlStr, (err, result) => {
        if (err) return res.json({ code: 500, msg: "获取失败" })
        let intro = result[0].content.slice(0, 12)

        res.json({ code: 200, msg: "获取成功", result })
    })
})


// 7-焦点关注
router.get('/attention', (req, res) => {
    res.end('ok')
})


// 8-文章详细内容  ---
router.get('/artitle', (req, res) => {
    const { id } = req.query
    const sqlStr = `select * from articles where id=${id}`
    con.query(sqlStr, (err, result) => {
        if (err) return res.json({ status: 1, message: "获取失败" })
        res.json({ status: 0, message: "获取文章详细内容成功", data: result })
    })

})


// 9-发表评论   -----
router.use(express.urlencoded())
router.post('/post_comment', (req, res) => {
    let sss = new Date()
    let d = sss.toLocaleDateString()
    let s = sss.toLocaleTimeString()
    let f = "成功"
    const { author, content, articleId } = req.body
    const sqlStr = `insert into comments (author,content,articleId,date,time,state) value
     ("${author}","${content}",${articleId},"${d}","${s}","${f}")`
    con.query(sqlStr, (err, result) => {
        console.log(err);
        if (err) return res.json({ code: 500, msg: '服务器处理失败' })
        res.json({ code: 200, msg: '发表成功' })
    })
})

// 10-评论列表   ----
router.get('/get_comment', (req, res) => {
    const { articleId } = req.query
    const sqlStr = `select author, date, content from comments where articleId=${articleId}`
    con.query(sqlStr, (err, result) => {
        if (err) return res.json({ code: 500, msg: "获取失败" })
        res.json({ code: 200, msg: "获取成功", result })
    })
})


module.exports = router;