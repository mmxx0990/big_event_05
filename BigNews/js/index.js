$(function () {
    // 焦点图
    $.ajax({
        url: 'http://120.24.171.137:1337/api/v1/index/hotpic',
        type: 'get',
        success: (res) => {
            // console.log(res);
            let q = template("focus_news", { data: res.data })
            $(".focus_list").html(q)
        }
    })

    // 全部分类
    $.ajax({
        url: 'http://120.24.171.137:1337/api/v1/index/category',
        type: 'get',
        success: (ress) => {
            // console.log(ress);
            let qq = template("fffff", { dataa: ress.data })
            $(".level_two").html(qq)
        }
    })
    // 最新资讯
    $.ajax({
        url: 'http://120.24.171.137:1337/api/v1/index/latest',
        type: 'get',
        success: (res) => {
            // console.log(res);
            let aa = template("zxzx", { data: res.data })
            $(".common_news").html(aa)
        }
    })

    // 热门排行
    $.ajax({
        url: 'http://120.24.171.137:1337/api/v1/index/rank',
        type: 'get',
        dataType: 'json',
        success: (res) => {
            // console.log(res);
            let aa = template("rmph", { data: res.data })
            $(".hotrank_list").html(aa)
        }
    })
    // 最新评论

    $.ajax({
        url: 'http://120.24.171.137:1337/api/v1/index/latest_comment',
        type: 'get',
        success: (res) => {
            // console.log(res);
            let aa = template("plll", { data: res.data })
            $(".comment_list").html(aa)
        }
    })

    // 焦点关注
    $.ajax({
        url: 'http://120.24.171.137:1337/api/v1/index/attention',
        type: 'get',
        success: (res) => {
            // console.log(res);
            let aa = template("jdgz", { data: res.data })
            $(".guanzhu_list").html(aa)
        }
    })

})
