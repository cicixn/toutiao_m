<template>
  <div>
    <!-- 头部搜索 -->
    <van-nav-bar class="navbar">
      <template #title>
        <van-button
          round
          class="search-btn"
          icon="search"
          @click="$router.push('/search')"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>
    <!-- 导航标签 -->
    <van-tabs v-model="active" swipeable>
      <van-tab v-for="item in MyChannels" :key="item.id" :title="item.name">
        <ArticleList :id="item.id"></ArticleList>
      </van-tab>
      <span class="toutiao toutiao-gengduo1" @click="show = true"></span>
    </van-tabs>
    <!-- 频道弹出层 -->
    <van-popup
      v-model="show"
      position="bottom"
      :style="{ height: '100%' }"
      closeable
      close-icon-position="top-left"
    >
      <ChannelPopup
        :MyChannels="MyChannels"
        @change-active="active = $event"
        @del-channel="delChannel"
        @add-channel="addChannel"
      ></ChannelPopup>
    </van-popup>
  </div>
</template>

<script>
import {
  getMyChannel as getMyChannelApi,
  delChannelAPI,
  addChannel,
  setMyChannelsToLocal,
  getMyChannelsToLocal
} from '@/api'
import ArticleList from './components/ArticalList.vue'
import ChannelPopup from './components/ChannelPopup.vue'
export default {
  name: 'Home',
  data() {
    return {
      active: 0,
      MyChannels: [],
      show: false
    }
  },
  components: { ArticleList, ChannelPopup },
  computed: {
    isLogin() {
      return !!this.$store.state.tokenObj.token
    }
  },
  created() {
    this.initMychannels()
  },
  methods: {
    initMychannels() {
      if (this.isLogin) {
        this.getMyChannel()
      } else {
        if (getMyChannelsToLocal()) {
          this.MyChannels = getMyChannelsToLocal()
        } else {
          this.getMyChannel()
        }
      }
    },
    async getMyChannel() {
      try {
        const { data } = await getMyChannelApi()
        this.MyChannels = data.data.channels
        // console.log(data)
      } catch (error) {
        console.dir(error)
        this.$toast.fail('获取频道失败，请刷新')
      }
    },
    async delChannel(id) {
      this.$toast.loading({
        message: '正在删除频道...',
        forbidClick: true
      })
      try {
        const newChannels = this.MyChannels.filter((item) => item.id !== id)
        if (this.isLogin) {
          await delChannelAPI(id)
        } else {
          setMyChannelsToLocal(newChannels)
        }
        this.MyChannels = newChannels
        this.$toast.success('删除成功~')
      } catch (error) {
        this.$toast.fail('删除失败，请重试')
      }
    },
    async addChannel(channel) {
      this.$toast.loading({
        message: '正在添加频道...',
        forbidClick: true
      })
      try {
        if (this.isLogin) {
          await addChannel(channel.id, this.MyChannels.length)
        } else {
          setMyChannelsToLocal(...this.MyChannels, channel)
        }
        this.MyChannels.push(channel)
        this.$toast.success('添加成功~')
      } catch (error) {
        this.$toast.fail('添加失败，请重试')
      }
    }
  }
}
</script>

<style scoped lang="less">
// 头部搜索
.navbar {
  background-color: #3296fa;
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }

  :deep(.van-icon) {
    color: #fff;
  }
}

.search-btn {
  width: 7.4rem;
  height: 0.85333rem;
  background-color: #5babfb;
  color: #fff;

  &.van-button--default {
    border: 0.02667rem solid #5babfb;
  }
}

/* tabs导航条样式 */
:deep(.van-tabs__wrap) {
  padding-right: 66px;

  position: sticky;
  top: 91px;
  left: 0;
  z-index: 99;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.toutiao-gengduo1 {
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 1;
  border-bottom: 1px solid #eee;
  background-color: #fff;
  z-index: 999;

  position: fixed;
  top: 92px;
  right: 0;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}

:deep(.van-tabs__content) {
  // 符号的两侧必须由空格
  max-height: calc(100vh - 92px - 88px - 100px);
  padding-bottom: 100px;
  overflow: auto;
}
</style>
