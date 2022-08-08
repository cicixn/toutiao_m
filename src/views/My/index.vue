<template>
  <div class="my-container">
    <!-- 头部 -->
    <header>
      <!-- 已登录 -->
      <div class="login" v-if="isLogin">
        <!-- <div class="empty"></div> -->
        <div class="userInfo">
          <div class="infoLeft">
            <van-image round width="56px" height="56px" :src="photo" />
            <span class="name">{{ name }}</span>
          </div>
          <van-button
            type="default"
            round
            size="mini"
            @click="$router.push('/user')"
            >编辑资料</van-button
          >
        </div>
        <ul class="nav">
          <li>
            <span>0</span>
            <span>头条</span>
          </li>
          <li>
            <span>0</span>
            <span>粉丝</span>
          </li>
          <li>
            <span>0</span>
            <span>关注</span>
          </li>
          <li>
            <span>0</span>
            <span>获赞</span>
          </li>
        </ul>
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
      <div class="logoutButton" v-if="isLogin" @click="logout">退出</div>
    </footer>
  </div>
</template>

<script>
import { getUserInfoAPI } from '@/api'
export default {
  data() {
    return {
      name: '',
      photo: ''
    }
  },
  computed: {
    isLogin() {
      return !!this.$store.state.tokenObj.token
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    logout() {
      this.$dialog
        .confirm({
          title: '提示',
          message: '确认退出登陆吗？'
        })
        .then(() => {
          // on confirm
          this.$store.commit('SET_TOKEN', {})
          this.$toast.success('已退出登录')
        })
        .catch(() => {
          // on cancel
          this.$toast.fail('退出登录失败，请重试')
        })
    },
    async getUserInfo() {
      const { data } = await getUserInfoAPI()
      this.name = data.data.name
      this.photo = data.data.photo
    }
  }
}
</script>

<style scoped lang="less">
.my-container {
  background-color: #f5f7f9;
  height: 100vh;
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
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .userInfo {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
      margin-top: 140px;
      // background-color: #911;
      .infoLeft {
        display: flex;
        align-items: center;
        text-align: center;
        .name {
          margin-left: 30px;
          color: #fff;
          font-size: 15px;
        }
      }
    }
    .nav {
      display: flex;
      justify-content: space-around;
      li {
        display: flex;
        flex-direction: column;
        text-align: center;
        padding: 30px 8px;
        font-size: 18px;
        color: #fff;
        span {
          margin-bottom: 7px;
        }
      }
    }
  }
}

main {
  margin-bottom: 15px;
  .main-menu {
    display: flex;
    justify-content: space-around;
    padding: 28px 0;
    margin-bottom: 10px;
    background-color: #fff;
    text-align: center;
    .toutiao-shoucang1 {
      font-size: 45px;
      color: #ef6e79;
    }
    .toutiao-lishi1 {
      font-size: 45px;
      color: #ffbc62;
    }
    p {
      margin: 2px;
      font-size: 12px;
    }
  }
}

footer {
  .logoutButton {
    height: 85px;
    background-color: #fff;
    text-align: center;
    color: red;
    font-size: 18px;
    line-height: 85px;
  }
}
</style>
