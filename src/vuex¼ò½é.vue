<template>
  <div>
    <h1>{{ count }}</h1>
    <button @click="SET_COUNT(10)">点击count</button>
    <h1>{{ bigNum }}</h1>
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
// git log 查看commit记录
// mapState -->将vuex里面state映射到computed
// 使用
// -引入mapState:函数,返回一个对象
// -参数:['映射的属性']
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  data() {
    return {}
  },
  methods: {
    // increment() {
    //   this.$store.commit('SET_COUNT', 10)
    // }
    ...mapMutations(['SET_COUNT'])
  },
  computed: {
    ...mapState(['count']),
    ...mapGetters(['bigNum'])
  }
}
</script>

<style scoped>
.box {
  width: 700px;
  height: 88px;
  background-color: green;
}
</style>
