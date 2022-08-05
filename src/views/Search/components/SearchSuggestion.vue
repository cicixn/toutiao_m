<template>
  <div>
    <van-cell
      v-for="(item, index) in highlightSuggestions"
      :key="index"
      icon="search"
    >
      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestionsAPI } from '@/api'
import { debounce } from 'lodash'
export default {
  data() {
    return {
      suggestions: []
    }
  },
  props: {
    keywords: {
      typeof: 'string',
      required: true
    }
  },
  watch: {
    keywords: {
      immediate: true,
      handler() {
        this.getSearchSuggestion()
      }
    }
  },
  computed: {
    highlightSuggestions() {
      const reg = new RegExp(this.keywords, 'ig')
      return this.suggestions.map((item) => {
        return item.replace(reg, (match) => {
          return `<span style="color:red">${match}</span>`
        })
      })
    }
  },
  methods: {
    getSearchSuggestion: debounce(async function () {
      try {
        const { data } = await getSearchSuggestionsAPI(this.keywords)
        this.suggestions = data.data.options
      } catch (error) {
        this.$toast.fail('获取搜索建议失败')
      }
    }, 300)
  }
}
</script>

<style></style>
