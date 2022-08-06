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
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image round width="0.8rem" height="0.8rem" :src="userInfo.photo">
        <input
          type="file"
          hidden
          ref="file"
          accept=".jpg,.png"
          @change="selectPhoto"
        />
      </van-image>
    </van-cell>
    <!-- 头像弹出层 -->
    <van-popup
      class="avator-popup"
      v-model="isShowAvator"
      closeable
      :style="{ height: '100%', width: '100%' }"
    >
      <UpdateAvator
        :photo="photo"
        v-if="isShowAvator"
        @update-avator="userInfo.photo = $event"
      ></UpdateAvator>
    </van-popup>
  </div>
</template>

<script>
import { getUserInfoAPI } from '@/api'
import UpdateAvator from './components/UpdateAvator'
import { resolveToBase64 } from '@/utils'
export default {
  name: 'User',
  data() {
    return {
      userInfo: {},
      isShowAvator: false,
      photo: ''
    }
  },
  components: { UpdateAvator },
  created() {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      try {
        const { data } = await getUserInfoAPI()
        this.userInfo = data.data
      } catch (error) {
        this.$toast.fail('获取用户信息失败，请刷新重试')
      }
    },
    async selectPhoto(e) {
      const file = e.target.files[0]
      this.photo = await resolveToBase64(file)
      e.target.value = ''
      this.isShowAvator = true
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

.avator-popup {
  background-color: #000;
}
</style>
