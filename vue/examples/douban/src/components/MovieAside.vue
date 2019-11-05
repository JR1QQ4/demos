<template>
  <div id="aside">
    <router-link
      @click="handleClick(0)"
      :class="activeIndex == 0 ? 'active' : ''"
      to="/movie/hot"
    >正在上映</router-link>
    <router-link
      @click="handleClick(1)"
      :class="activeIndex == 1 ? 'active' : ''"
      to="/movie/future"
    >即将上映</router-link>
    <router-link
      @click="handleClick(2)"
      :class="activeIndex == 2 ? 'active' : ''"
      to="/movie/top250"
    >Top 250</router-link>
  </div>
</template>

<script>
export default {
  name: "movie-aside",
  data() {
    return {
      activeIndex: 2
    };
  },
  methods: {
    handleClick(index) {
      this.activeIndex = index;
      console.log(this.activeIndex);
    }
  }
};
</script>

<style scoped>
#aside a {
  display: block;
  margin: 10px 0;
  padding: 10px 0;
  opacity: 1;
}
#aside a.router-link-active {
  background: #409eff;
  color: #fff;
}
</style>