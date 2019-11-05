<template>
  <ul class="movie-item">
    <li @click="submitobj" class="poster" element-loading-background="#efefef" v-loading="loading">
      <a>
        <img
          @load="imageLoaded"
          :src="require('@/'+ this.src+ this.itemobj.img_src)"
          :alt="this.itemobj.title"
        />
      </a>
    </li>
    <li @click="submitobj" class="stitle">
      <a>{{this.itemobj.title.split("/")[0].trim()}}</a>
    </li>
    <li>
      <el-rate :value="value" disabled show-score text-color="#ff9900" score-template="{value}"></el-rate>
    </li>
  </ul>
</template>

<script>
export default {
  name: "movie-item",
  props: {
    itemobj: Object,
    src: String
  },
  computed: {
    value() {
      return parseFloat(((this.itemobj.rate * 10 * 5) / 100).toFixed(1));
    }
  },
  data() {
    return {
      loading: true
    };
  },
  methods: {
    imageLoaded() {
      console.log(12);
      this.loading = false;
    },
    submitobj() {
      this.$emit("handleSubmit", this.itemobj);
    }
  },
  mounted() {}
};
</script>
<style scoped>
.movie-item {
  width: 115px;
}
.movie-item .poster {
  width: 115px;
  height: 161px;
  margin-bottom: 12px;
  overflow: hidden;
}
.movie-item .poster a {
  display: block;
}
.movie-item a {
  opacity: 1;
  color: #333;
}
.movie-item .poster img {
  display: inline-block;
  width: 115px;
  transition: all ease 0.5s;
}
.movie-item .poster:hover img {
  transform: scale(1.15);
}
.movie-item .stitle {
  width: 115px;
  font-size: 14px;
}
.movie-item .stitle a {
  display: inline-block;
  width: 115px;
  height: 24px;
  line-height: 24px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  text-align: center;
}
.movie-item .stitle a:hover {
  color: #409eff;
}
</style>
<style>
.movie-item {
  text-align: center;
}
.movie-item .el-rate__item i.el-rate__icon {
  margin: 0;
  font-size: 14px;
}
</style>