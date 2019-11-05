<template>
  <ul class="otheritem">
    <li
      class="poster"
      v-loading="loading"
      element-loading-spinner="el-icon-loading"
      element-loading-background="#e5e9f2"
    >
      <a>
        <img @load="imgload" :src="require('@/'+totalsrc)" :alt="objdata.id" />
      </a>
    </li>
    <li class="stitle">
      <a>{{objdata.title}}</a>
    </li>
    <li class="srating">
      <div v-if="objdata.score == '' || objdata.score == 0">{{ showText }}</div>
      <div v-else>
        <el-rate
          v-model="value"
          disabled
          show-score
          text-color="#ff9900"
          :score-template="this.objdata.score"
        ></el-rate>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: "other-item",
  props: {
    objdata: Object,
    src: String
  },
  data() {
    return {
      loading: true
    };
  },
  computed: {
    totalsrc() {
      return this.src + this.objdata.id + ".jpg";
    },
    value() {
      return Number(((this.objdata.score * 10 * 5) / 100).toFixed(1));
    },
    showText() {
      return location.pathname.includes("future") ? "即将上映" : "暂无评分";
    }
  },
  methods: {
    imgload() {
      this.loading = false;
    }
  },
  mounted() {}
};
</script>

<style>
.otheritem .poster {
  height: 161px;
  overflow: hidden;
  margin-bottom: 12px;
  position: relative;
}
.otheritem .poster a {
  display: block;
  opacity: 1;
  cursor: pointer;
}
.otheritem .poster img {
  width: 115px;
}
.otheritem .stitle a {
  display: block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  letter-spacing: normal;
  word-spacing: normal;
  height: 24px;
  line-height: 24px;
  font-size: 14px;
  color: #333;
  opacity: 1;
  cursor: pointer;
}
.otheritem .srating {
  display: inline-block;
  vertical-align: top;
  letter-spacing: normal;
  word-spacing: normal;
  height: 19px;
  margin-bottom: 5px;
  font-size: 12px;
  color: #111;
}
.otheritem .el-rate__icon {
  margin-right: 0;
  font-size: 13px;
}
.otheritem .el-rate__text {
  font-size: 13px;
}
</style>