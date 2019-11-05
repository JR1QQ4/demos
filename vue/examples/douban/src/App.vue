<template>
  <div id="app">
    <NavBar />
    <router-view />
    <el-backtop></el-backtop>
  </div>
</template>

<style>
@import "assets/css/base.css";
</style>
<script>
import NavBar from "@/components/NavBar.vue";
export default {
  name: "app",
  components: {
    NavBar
  }
};
</script>