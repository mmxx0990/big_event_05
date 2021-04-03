$(function () {

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
            let aaa = template("plllp", { data: res.data })
            $(".comment_list_con").html(aaa)
            $(".comment_count").text(res.data.length + "条评论")
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

    let id = window.location.search.split("=")[1];
    $.ajax({
        url: 'http://120.24.171.137:1337/api/v1/index/article',
        type: 'get',
        data: { id: id },
        success: (res) => {
            // console.log(res);
            if (res.code != 200) {
                return res.msg
            }
            $(".article_title").text(res.data.title)
            $('.article_con').html(res.data.content);
            let resH = template('ooo', res);
            $('.article_info').html(resH);
            let kk = template('pp', res);
            // console.log(kk);
            $(".dfdf").html(kk)
            let dd = template("ddf", res)
            $(".article_links").html(dd)
            // console.log(id);
        }
    })
    $(".comment_sub").click(function (e) {
        e.preventDefault();
        if ($(".comment_name").val().trim().length == 0 || $(".comment_input").val().trim().length == 0) {
            return alert("请输入名字或评论内容")
        }
        // console.log(id);
        // console.log($(".comment_name").val(), $(".comment_input").val());
        $.ajax({
            url: 'http://120.24.171.137:1337/api/v1/index/post_comment',
            type: 'post',
            data: {
                author: $(".comment_name").val(),
                content: $(".comment_input").val(),
                articleId: id
            },
            success: (res) => {
                // console.log(res);
                if (res.code != 201) {
                    return alert(res.msg)
                }
                alert("发表成功")
                window.location.reload();
            }
        })
    })

})
