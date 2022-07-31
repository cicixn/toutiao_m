<template>
  <div>
    <!-- 头部 -->
    <header>
      <div class="login" v-if="isLogin">已登录</div>
      <div class="logout" v-else>
        未登录
        <img src="../../assets/images/登录手机图.png" alt="" />
      </div>
    </header>
    <!-- 中间 -->
    <main>收藏/历史/小智</main>
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
    justify-content: space-evenly;
    img {
      width: 132px;
      height: 132px;
    }
  }
}
</style>
