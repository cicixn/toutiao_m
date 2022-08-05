<template>
  <div>
    <!-- 上方搜索框 -->
    <form action="/">
      <van-search
        v-model.trim="keywords"
        shape="round"
        show-action
        background="#3296fa"
        placeholder="请输入搜索关键词"
        class="search"
        @search="onSearch"
        @focus="onSearchFocus"
        @cancel="$router.back()"
      />
    </form>
    <!-- 下方展示 -->
    <component :is="componentName" :keywords="keywords"></component>
  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory'
import SearchResult from './components/SearchResult'
import SearchSuggestion from './components/SearchSuggestion'
export default {
  name: 'Search',
  data() {
    return {
      keywords: '',
      isShowSearchResult: false
    }
  },
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion
  },
  computed: {
    componentName() {
      if (!this.keywords) {
        return 'SearchHistory'
      }
      if (this.isShowSearchResult) {
        return 'SearchResult'
      }

      return 'SearchSuggestion'
    }
  },
  methods: {
    onSearch() {
      console.log('search')
      this.isShowSearchResult = true
    },
    onSearchFocus() {
      this.isShowSearchResult = false
    }
  }
}
</script>

<style scoped lang="less">
.search {
  [role='button'] {
    color: #fff;
  }
}
</style>
