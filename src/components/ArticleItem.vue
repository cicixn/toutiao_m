<template>
  <div>
    <!-- 没有图片 -->
    <van-cell
      :title="articleInfo.title"
      :label="label"
      v-if="articleInfo.cover.type === 0"
    />
    <!-- 一张图片 -->
    <van-cell
      v-else-if="articleInfo.cover.type === 1"
      :title="articleInfo.title"
      :label="label"
      value="内容"
    >
      <van-image width="100" height="100" :src="articleInfo.cover.images[0]" />
    </van-cell>
    <!-- 三张图片 -->
    <van-cell :title="articleInfo.title" :label="label" v-else>
      <van-image
        v-for="(item, index) in articleInfo.cover.images"
        :key="index"
        :src="item"
        width="100"
        height="100"
      />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    articleInfo: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    label() {
      const art = this.articleInfo
      return `${art.aut_name} ${art.comm_count}评论 ${art.pubdate}`
    }
  }
}
</script>

<style></style>
