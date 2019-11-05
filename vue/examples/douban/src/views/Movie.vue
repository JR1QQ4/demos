<template>
  <div id="movie">
    <MovieMain />
  </div>
</template>

<script>
import MovieMain from "@/components/MovieMain.vue";
export default {
  name: "movie",
  components: {
    MovieMain
  }
};
</script>

<style scoped>
#movie {
  width: 1140px;
  margin: 0 auto;
}
@media (max-width: 1140px) {
  #movie {
    width: 100%;
  }
}
</style>