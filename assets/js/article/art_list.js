$(function() {
    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: '',
    }
    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage

    initArtList()
    initArtCate()

    // 初始化文章列表
    function initArtList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // console.log(res.total)
                var htmlStr = template('tpl_articleList', res)
                $('tbody').html(htmlStr)
                pageBox(res.total)
            }
        })
    }

    // 获取文章分类
    function initArtCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // console.log(res)
                var htmlStr = template('tpl_artCate', res)
                $('[name=cate_id]').html(htmlStr)
                form.render()
            }
        })
    }

    $('#form_choose').on('submit', function(e) {
        e.preventDefault();
        var cate_id = $('[name=cate_id]').val()
        q.cate_id = cate_id
        var state = $('[name=state]').val()
        q.state = state
        initArtList()
    })

    function pageBox(n) {
        laypage.render({
            elem: 'pageBox', //注意，这里的 test1 是 ID，不用加 # 号
            count: n, //数据总数，从服务端得到
            limit: q.pagesize,
            limits: [2, 3, 5, 10],
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            curr: q.pagenum,
            jump: function(obj, first) {
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                if (!first) {
                    initArtList()
                }
            }

        })
    }

    $('body').on('click', '.btn_delete', function() {
        var id = $(this).attr('data-id')
        var len = $('.btn_delete').length

        layer.confirm('是否确定删除?', { icon: 3, title: '提示' }, function(index) {
            //do something
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg(res.message)
                    if (len === 1 && q.pagenum > 1) {
                        q.pagenum--
                    }
                    initArtList()
                }
            })

            layer.close(index);
        });

    })
})