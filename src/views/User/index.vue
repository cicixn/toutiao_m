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
    <!-- 头像 -->
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
    <!-- 昵称 -->
    <van-cell
      title="昵称"
      :value="userInfo.name"
      is-link
      @click="isShowNameEdit = true"
    >
    </van-cell>
    <!-- 性别 -->
    <van-cell
      title="性别"
      :value="userInfo.gender === 0 ? '男' : '女'"
      is-link
      @click="isShowGender = true"
    >
    </van-cell>
    <!-- 性别选择弹出层 -->
    <van-popup v-model="isShowGender" round position="bottom">
      <van-picker
        show-toolbar
        title="更新性别"
        :columns="genderColumns"
        @cancel="isShowGender = false"
        @confirm="updateGender"
      />
    </van-popup>

    <!-- 生日 -->
    <van-cell
      title="生日"
      :value="userInfo.birthday"
      is-link
      @click="isShowDate = true"
    >
    </van-cell>
    <van-popup
      v-model="isShowDate"
      position="bottom"
      :style="{ height: '50%', width: '100%' }"
    >
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="isShowDate = false"
        @confirm="updateBirthday"
      />
    </van-popup>
    <!-- --------------------------------------------------------- -->
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
    <!-- 昵称编辑弹出层 -->
    <van-popup
      class="nameEdit-popup"
      v-model="isShowNameEdit"
      :style="{ height: '100%', width: '100%' }"
    >
      <NameEdit :name="userInfo.name"></NameEdit>
    </van-popup>
  </div>
</template>

<script>
import { getUserInfoAPI, editUserGenderAPI, editUserBirthdayAPI } from '@/api'
import UpdateAvator from './components/UpdateAvator'
import NameEdit from './components/NameEdit'
import { resolveToBase64 } from '@/utils'
export default {
  name: 'User',
  data() {
    return {
      userInfo: {},
      photo: '',
      isShowAvator: false,
      isShowNameEdit: false,
      isShowGender: false,
      isShowDate: false,
      genderColumns: ['男', '女'],
      minDate: new Date(1990, 0, 1),
      maxDate: new Date(2022, 8, 1),
      currentDate: new Date(1998, 0, 1)
    }
  },
  components: { UpdateAvator, NameEdit },
  created() {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      try {
        const { data } = await getUserInfoAPI()
        // console.log(data)
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
    },
    async updateGender(value) {
      try {
        this.userInfo.gender = value
        const gender = value === '男' ? 0 : 1
        await editUserGenderAPI(gender)
        this.$toast.success('更改性别成功')
        this.isShowGender = false
      } catch (error) {
        this.$toast.fail('更改性别失败，请重试')
      }
    },
    async updateBirthday() {
      const birthday = this.$formatTime(this.currentDate, 'YYYY-MM-DD')

      try {
        this.$toast.success('更改生日成功~')
        await editUserBirthdayAPI(birthday)
        this.userInfo.birthday = birthday
        this.isShowDate = false
      } catch (error) {
        this.$toast.fail('更改生日失败，请重试')
      }
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
.nameEdit-popup {
  background-color: #fff;
}
</style>
