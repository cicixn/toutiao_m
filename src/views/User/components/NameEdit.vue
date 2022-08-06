<template>
  <div>
    <van-nav-bar
      title="更新昵称"
      left-text="取消"
      right-text="保存"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <van-field
      v-model="currentName"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入昵称"
      show-word-limit
    />
  </div>
</template>

<script>
import { editUserNameAPI } from '@/api'
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      currentName: this.name
    }
  },
  methods: {
    onClickLeft() {
      this.$parent.$parent.isShowNameEdit = false
    },
    async onClickRight() {
      this.$toast.loading({
        message: '正在更改昵称...',
        forbidClick: true
      })
      try {
        await editUserNameAPI(this.currentName)
        this.$toast.success('更改昵称成功~')
        this.$parent.$parent.userInfo.name = this.currentName
        this.$parent.$parent.isShowNameEdit = false
      } catch (error) {
        this.$toast.fail('更改昵称失败，请重试')
      }
    }
  }
}
</script>

<style></style>
