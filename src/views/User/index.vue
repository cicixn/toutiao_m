<template>
  <div>
    <!-- 头 -->
    <van-nav-bar
      class="navbar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- 身体 -->
    <van-cell title="头像" is-link>
      <van-image
        round
        width="0.8rem"
        height="0.8rem"
        src="https://img01.yzcdn.cn/vant/cat.jpeg"
      >
      </van-image>
    </van-cell>
  </div>
</template>

<script>
import { getUserInfoAPI } from '@/api'
export default {
  name: 'User',
  created() {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      const { data } = await getUserInfoAPI()
      console.log(data)
    }
  }
}
</script>

<style scoped lang="less">
:deep(.navbar) {
  background-color: #3296fa;
  .van-nav-bar__title {
    color: #fff;
  }
  .van-icon {
    color: #fff;
  }
}
</style>
