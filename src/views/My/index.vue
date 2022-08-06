<template>
  <div class="my-container">
    <!-- 头部 -->
    <header>
      <!-- 已登录 -->
      <div class="login" v-if="isLogin">
        已登录
        <div class="userInfo">
          <van-image
            round
            width="56px"
            height="56px"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
          />
          <button @click="$router.push('/user')">编辑按钮</button>
        </div>
        <van-grid>
          <van-grid-item icon="photo-o" text="文字" />
          <van-grid-item icon="photo-o" text="文字" />
          <van-grid-item icon="photo-o" text="文字" />
          <van-grid-item icon="photo-o" text="文字" />
        </van-grid>
      </div>
      <!-- 未登录 -->
      <div class="logout" v-else>
        <img src="../../assets/images/mobile.png" alt="" />
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
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link />
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
.my-container {
  background-color: #f5f7f9;
}

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

  .login {
    display: flex;
    flex-direction: column;
  }
}

main {
  .main-menu {
    display: flex;
    justify-content: space-around;
    padding: 28px 0;
    margin-bottom: 10px;
    background-color: #fff;
    text-align: center;
    .toutiao-shoucang1 {
      font-size: 50px;
      color: #ef6e79;
    }
    .toutiao-lishi1 {
      font-size: 50px;

      color: #ffbc62;
    }
    p {
      margin: 2px;
      font-size: 12px;
    }
  }
}
</style>
