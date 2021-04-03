const express = require('express')
const router = express.Router()
const con = require('../util/sql.js')

// 获取文章分类列表

// 1-获取文章分类列表
router.get('/cates', (req, res) => {
    const sqlStr = `select * from categories `
    con.query(sqlStr, (err, result) => {
        if (err) return res.json({ status: 1, message: "获取失败" })
        res.json({ status: 0, message: "获取文章分类列表成功", data: result })
    })
})

// 2-新增文章分类
router.use(express.urlencoded())
router.post('/addcates', (req, res) => {
    const { name, slug } = req.body
    const sqlStr = `insert into categories(name,slug) value("${name}","${slug}") `
    con.query(sqlStr, (err, result) => {
        if (err) return res.json({ status: 1, message: "添加失败" })
        res.json({ status: 0, message: "添加成功" })
    })
})

// 3-根据 Id 删除文章分类
router.get('/deletecate', (req, res) => {
    const { id } = req.query
    console.log(id);
    const sqlStr = `delete from  categories  where id=${id}`
    con.query(sqlStr, (err, result) => {
        if (err) return res.json({ status: 1, message: "删除失败" })
        res.json({ status: 0, message: "删除成功" })
    })
})

// 4-根据 Id 获取文章分类数据
router.get('/getCatesById', (req, res) => {
    const { id } = req.query
    const sqlStr = `select * from categories where id=${id}`
    con.query(sqlStr, (err, result) => {
        if (err) return res.json({ status: 1, message: "获取失败" })
        res.json({ status: 0, message: "获取文章分类列表成功", data: result })
    })
})

// 5-根据 Id 更新文章分类数据
router.post('/updatecate', (req, res) => {
    const { id, name, slug } = req.body
    const condition = []
    if (name) condition.push(`name="${name}"`)
    if (slug) condition.push(`slug="${slug}"`)
    const conditionStr = condition.join()
    const sqlStr = `update categories set ${conditionStr} where id=${id}`
    con.query(sqlStr, (err, result) => {
        if (err) return res.json({ status: 1, message: "修改失败" })
        res.json({ status: 0, message: "修改成功" })
    })

})

module.exports = router;