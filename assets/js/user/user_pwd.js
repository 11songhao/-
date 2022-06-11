$(function () {
  const form = layui.form;
  //自定义验证规则
  form.verify({
    // 密码验证
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    samePwd: (val) => {
      //校验原密码和新密码不能相同
      if (val === $("[name=oldPwd]").val()) return "新旧密码不能相同！";
    },
    rePwd: (val) => {
      //校验原密码和新密码相同
      if (val !== $("[name=newPwd]").val()) return "两次密码不一致！";
    },
  });
  // 发送请求，重置密码
  $(".layui-form").submit(function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/my/updatepwd",
      data: $(this).serialize(),
      success: (res) => {
        if (res.status !== 0) return layer.msg("更新密码失败！");
        layer.msg("更新密码成功！");
        //1.强制清空 token
        localStorage.removeItem("token");
        //2.强制跳转 login.html
        window.parent.location.href = "/login.html";
      },
    });
  });
});
