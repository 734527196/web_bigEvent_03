$(function() {
    $('#link_reg').on('click', function() {
        $('.box_login').hide();
        $('.box_reg').show();
    })

    $('#link_login').on('click', function() {
        $('.box_login').show();
        $('.box_reg').hide();
    })

    var form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,16}$/, '密码必须6到16位，且不能出现空格'
        ],
        repwd: function(value) {
            var pwd = $('#form_reg [name=password]').val();
            if (pwd !== value) {
                return '两次密码必须输入一致'
            }
        }
    })

    var layer = layui.layer;
    // 登录
    $('#form_login').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('登录成功！')
                localStorage.setItem('token', res.token);
                location.href = '/index.html'
            }
        })
    })

    // 注册
    $('#form_reg').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功！');
                $('#link_login').click();
                $('#form_reg')[0].reset();
            }
        })
    })
})