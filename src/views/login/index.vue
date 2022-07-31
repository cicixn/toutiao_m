<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar title="登录" />

    <!-- form 表单，手机号密码 -->
    <van-form @submit="onSubmit" class="form" ref="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRule"
      >
        <template #label>
          <span class="toutiao toutiao-shouji1"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRule"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template #button>
          <van-button
            round
            size="mini"
            class="code-btn"
            native-type="button"
            v-if="isShowCode"
            @click="sendCode"
            >获取验证码</van-button
          >
          <van-count-down
            :time="5 * 1000"
            format="ss秒"
            v-else
            @finish="isShowCode = true"
          />
        </template>
      </van-field>
      <div style="margin: 0.42rem">
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { mobileRule, codeRule } from './rules'
import { login, getCodeAPI } from '@/api'
export default {
  name: 'Login',
  data() {
    return {
      mobile: '',
      code: '',
      mobileRule,
      codeRule,
      isShowCode: true
    }
  },
  methods: {
    loading() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
    },
    async onSubmit() {
      try {
        this.loading()
        const {
          data: { data: token }
        } = await login(this.mobile, this.code)
        this.$store.commit('SET_TOKEN', token)
        this.$router.push('/my')
        this.$toast.success('登陆成功')
      } catch (error) {
        const status = error.response.status
        let message = '请重新登陆'
        if (status === 400) {
          message = error.response.data.message
        }
        this.$toast.fail(message)
        // console.log(error)
      }
    },
    sendCode() {
      this.$refs.form.validate('mobile').then(async () => {
        this.loading()
        try {
          await getCodeAPI(this.mobile)
          this.$toast.success('获取验证码成功')
          this.isShowCode = false
        } catch (error) {
          // console.log(error)
          const status = error.response.status
          let message = '手机号不正确'
          if (status === 429) {
            message = error.response.data.message
          }
          this.$toast.fail(message)
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
// 头部导航
.van-nav-bar {
  background-color: #1989fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
}
// form 表单
:deep(.form) {
  .van-field__label {
    flex: 1;
  }
  .van-field__value {
    flex: 20;
  }
  .toutiao {
    font-size: 40px;
  }
}
// 获取验证码按钮
:deep(.code-btn) {
  &.van-button--mini {
    padding: 0 0.2rem;
  }
  &.van-button--default {
    background: #eee;
    color: #a9929b;
  }
}
</style>
