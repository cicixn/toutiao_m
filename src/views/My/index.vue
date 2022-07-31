<template>
  <div>
    <!-- 头部 -->
    <header>
      <div class="login" v-if="isLogin">已登录</div>
      <div class="logout" v-else>
        <img src="../../assets/images/登录手机图.png" alt="" />
        <router-link to="/login" class="goLogin">登录 / 注册</router-link>
      </div>
    </header>
    <!-- 中间 -->
    <main>
      <ul class="main-menu">
        <li>
          <span class="toutiao toutiao-shoucang1"></span>
          <p>收藏</p>
        </li>
        <li>
          <span class="toutiao toutiao-lishi1"></span>
          <p>历史</p>
        </li>
      </ul>
    </main>
    <!-- 底部 -->
    <footer>
      <button v-if="isLogin" @click="logout">退出</button>
    </footer>
  </div>
</template>

<script>
export default {
  computed: {
    isLogin() {
      return !!this.$store.state.tokenObj.token
    }
  },
  methods: {
    logout() {
      this.$store.commit('SET_TOKEN', {})
    }
  }
}
</script>

<style scoped lang="less">
header {
  width: 100%;
  height: 400px;
  background: url(http://110.42.202.109/toutiao/img/banner.d4257372.png)
    no-repeat 50% / cover;
  .logout {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    // justify-content: space-evenly;
    img {
      width: 132px;
      height: 132px;
      margin-top: 100px;
      margin-bottom: 15px;
    }
    .goLogin {
      color: #fff;
      font-size: 30px;
    }
  }
}

main {
  .main-menu {
    display: flex;
    justify-content: space-evenly;
    .toutiao-shoucang1 {
      font-size: 30px;
      color: #ef6e79;
    }
    .toutiao-lishi1 {
      color: #ffbc62;
    }
  }
}
</style>
