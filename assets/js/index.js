$(function() {
    getUserInfo()

    $('#btnLogout').on('click', function() {
        layer.confirm('是否确认退出登录?', { icon: 3, title: '提示' }, function(index) {
            //do something
            localStorage.removeItem('token')
            location.href = '/login.html'

            layer.close(index);
        });
    })
})

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            // console.log(res)
            // layui.layer.msg(res.message)
            renderAvatar(res.data)
        }
    })
}

function renderAvatar(user) {
    var name = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)


    if (user.user_pic !== null) {
        $('.layui-nav-img').show().attr('src', user.user_pic);
        $('.text_avatar').hide();
    } else {
        var first = name[0].toUpperCase();
        $('.layui-nav-img').hide();
        $('.text_avatar').show().html(first);
    }
}