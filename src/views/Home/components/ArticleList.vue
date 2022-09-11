<template>
  <div>
    <article-item v-for="item in articles" :key="item.id" :article="item"></article-item>
  </div>
</template>

<script>
import { getArticles } from '@/api'
import ArticleItem from './ArticleItem.vue'
export default {
  name: 'ArticleList',
  components: { ArticleItem },
  data() {
    return {
      articles: []
    }
  },
  props: {
    id: [String, Number]
  },
  created() {
    this.getFirstPageArticle()
  },
  methods: {
    async getFirstPageArticle() {
      try {
        const { data } = await getArticles(this.id, +new Date())
        // console.log(data)
        this.articles = data.data.results
        console.log(this.articles)
      } catch (error) {
        const status = error.response?.status
        if (!error.response || status === 507) {
          throw error
        } else {
          if (status === 400) {
            throw new Error(error.response.data.message)
          }
        }
      }
    }
  }
}
</script>

<style></style>
