$(function() {

    initArtCate()

    function initArtCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                // console.log(res.data)
                var htmlStr = template('tpl_initCate', res)
                $('tbody').html(htmlStr)
            }
        })
    }

    var form = layui.form
    var layer = layui.layer
    var indexAdd = null;
    var indexEdit = null;

    $('#addCateList').on('click', function() {
        indexAdd = layer.open({
            type: 1,
            title: '添加文章分类',
            area: ["500px", "250px"],
            content: $('#tpl_addCate').html() //这里content是一个普通的String
        });
    })

    $('body').on('submit', '#form_addCate', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message);
                initArtCate();
                layer.close(indexAdd);
            }
        })
    })

    $('body').on('click', '#btnEdit', function() {
        var id = $(this).attr("data-id");
        indexEdit = layer.open({
            type: 1,
            title: '修改文章分类',
            area: ["500px", "250px"],
            content: $('#tpl_editCate').html() //这里content是一个普通的String
        });
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                form.val('form_editCate', res.data)
            }
        })
    })

    $('body').on('submit', '#form_editCate', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                initArtCate()
                layer.msg(res.message)
                layer.close(indexEdit);
            }
        })
    })

    $('body').on('click', '#btnDelete', function() {
        var id = $(this).attr('data-id');
        $.ajax({
            method: 'GET',
            url: '/my/article/deletecate/' + id,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                initArtCate()
            }
        })
    })
})