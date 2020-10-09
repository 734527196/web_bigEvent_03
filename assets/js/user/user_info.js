$(function() {
    var form = layui.form

    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '用户昵称必须在 1 ~ 6 位之间'
            }
        }
    })

    initUserInfo()

    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                // console.log(res)
                form.val('formUserInfo', res.data)
            }
        })
    }

    $('#btnReset').on('click', function(e) {
        e.preventDefault();
        initUserInfo()
    })

    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg(res.message)

                window.parent.getUserInfo()

            }
        })
    })
})