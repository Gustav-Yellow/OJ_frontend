import store from "@/store";
import router from "@/router";
import ACCESS_ENUM from "@/access/accessEnum";
import checkAccess from "@/access/checkAccess";

// 这里单独将路由守卫提出来，方便在登录页面使用
router.beforeEach(async (to, from, next) => {
  console.log("登录用户的信息：", store.state.user.loginUser);

  const loginUser = store.state.user.loginUser;

  // 如果之前没有登录过或者当前登录用户没有权限，自动登录
  if (!loginUser || !loginUser.userRole) {
    // 添加 await 的原因是防止在登录时，用户信息还没获取到，就跳转了
    await store.dispatch("user/getLoginUser");
  }

  // 获取需要访问的权限，从路由中获取当前要访问的页面需要什么权限
  const needAccess = (to.meta?.access as string) ?? ACCESS_ENUM.NOT_LOGIN;
  // 如果要跳转的页面必须登录
  if (needAccess !== ACCESS_ENUM.NOT_LOGIN) {
    // 如果没有登录或者当前用户没有权限这个属性，那么跳转到登录页面
    if (!loginUser || !loginUser.userRole) {
      next(`/user/login?redirect=${to.fullPath}`);
      return;
    }
    // 如果用户已经登录，但是权限不足，那么跳转到无权限页面
    if (!checkAccess(loginUser, needAccess)) {
      next("/noAuth");
      return;
    }
  }

  next();
});
