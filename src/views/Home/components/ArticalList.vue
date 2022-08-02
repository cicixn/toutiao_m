<template>
  <div>
    <van-pull-refresh v-model="refreshLoading" @refresh="loadNextPageArticle">
      <van-list
        v-model="loading"
        @load="loadNextPageArticle"
        offset="0"
        :immediate-check="false"
        :finished="isFinished"
        finished-text="没有更多喽~~~"
        :error.sync="error"
        error-text="加载失败，请点击此处重试"
      >
        <ArticleItem
          v-for="item in articles"
          :key="item.art_id"
          :articleInfo="item"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleAPI } from '@/api'
import ArticleItem from '@/components/ArticleItem.vue'
export default {
  name: 'ArticleList',
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  components: { ArticleItem },
  data() {
    return {
      articles: [],
      pre_timestamp: '',
      loading: false,
      isFinished: false,
      error: false,
      refreshLoading: false
    }
  },
  created() {
    this.getFirstPageArticle()
  },
  methods: {
    async getFirstPageArticle() {
      try {
        const { data } = await getArticleAPI(this.id, +new Date())
        this.articles = data.data.results
        this.pre_timestamp = data.data.pre_timestamp
      } catch (error) {
        this.$toast.fail('请求失败，请刷新重试')
      }
    },
    async loadNextPageArticle() {
      try {
        // if (Math.random() < 0.5) {
        //   console.log(a)
        // }
        const { data } = await getArticleAPI(this.id, this.pre_timestamp)
        if (data.data.pre_timestamp === null) {
          this.isFinished = true
        }
        if (this.refreshLoading) {
          this.articles.unshift(...data.data.results)
        } else {
          this.articles.push(...data.data.results)
        }
        this.pre_timestamp = data.data.pre_timestamp
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
        this.refreshLoading = false
      }
    }
  }
}
</script>

<style></style>
