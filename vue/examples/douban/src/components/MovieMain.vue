<template>
  <el-container>
    <el-aside>
      <MovieAside />
    </el-aside>
    <router-view></router-view>
  </el-container>
</template>

<script>
import MovieAside from "@/components/MovieAside.vue";
export default {
  name: "movie-main",
  components: {
    MovieAside
  }
};
</script>

<style scoped>
.el-aside {
  width: 120px !important;
  text-align: center;
}
</style>