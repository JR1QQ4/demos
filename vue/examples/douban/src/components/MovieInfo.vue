<template>
  <div id="total-info">
    <el-page-header @back="goBack" content="详情页面"></el-page-header>
    <div class="banner">
      <div class="wrapper clearfix">
        <div class="celeInfo-left">
          <div class="avatar-shadow">
            <img :src="require('@/'+ this.src+ this.item.img_src)" alt />
          </div>
        </div>
        <div class="celeInfo-right clearfix">
          <div class="movie-brief-container">
            <h3 class="name">{{this.item.title.split("/")[0].trim()}}</h3>
            <div class="ename">{{this.item.title.substr(this.item.title.indexOf("/")+1).trim()}}</div>
            <ul>
              <li class="ellipsis">{{this.item.types.split(" ").join(",")}}</li>
              <li class="ellipsis">{{this.item.area}}</li>
              <li class="ellipsis">{{this.item.time}}</li>
            </ul>
          </div>
          <div class="movie-stats-container">
            <p>用户评分</p>
            <el-rate
              v-model="rate"
              disabled
              show-score
              text-color="#ff9900"
              :score-template="this.item.rate"
            ></el-rate>
          </div>
        </div>
      </div>
    </div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="介绍" name="first">
        <div class="module">
          <div class="mod-title">
            <h3>剧情简介</h3>
          </div>
          <div class="mod-content">
            <span ref="content"></span>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "movieinfo",
  props: {
    item: Object,
    src: String
  },
  methods: {
    goBack() {
      this.$emit("showall");
    }
  },
  mounted() {
    this.$refs.content.innerHTML = this.item.all_info;
  },
  data() {
    return {
      rate: Number(((this.item.rate * 10 * 5) / 100).toFixed(1)),
      activeName: "first"
    };
  }
};
</script>

<style scoped>
#total-info {
  min-width: 900px;
  margin-left: 15px;
  padding-bottom: 80px;
}
#total-info .el-page-header {
  padding: 15px 15px;
}
#total-info .banner {
  background: #392f59;
}
#total-info .wrapper {
  width: calc(100% - 120px);
  min-width: 800px;
  margin: 0 auto;
}
#total-info .celeInfo-left {
  width: 300px;
  float: left;
  position: relative;
  top: 70px;
  overflow: hidden;
  z-index: 9;
}
#total-info .avatar-shadow {
  position: relative;
  margin: 0 30px;
  width: 240px;
  height: 330px;
  padding-bottom: 40px;
}
#total-info .celeInfo-left img {
  border: 4px solid #fff;
  height: 322px;
  width: 232px;
}
#total-info .celeInfo-right {
  position: relative;
  margin-right: 30px;
  margin-left: 300px;
  margin-top: 70px;
}
#total-info .movie-brief-container {
  position: absolute;
  top: 0;
  left: 0;
  color: #fff;
  font-size: 14px;
  z-index: 1;
}
#total-info .movie-brief-container .name {
  margin-top: 0;
  font-size: 26px;
  line-height: 32px;
  font-weight: 700;
  margin-bottom: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  max-height: 64px;
}
#total-info .movie-brief-container .ename {
  font-size: 18px;
  line-height: 1.3;
  margin-bottom: 14px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
#total-info .movie-brief-container ul {
  width: 250px;
  margin-bottom: 20px;
}
#total-info .movie-brief-container .ellipsis {
  margin: 12px 0;
  line-height: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
#total-info .movie-stats-container {
  position: absolute;
  bottom: 20px;
}
#total-info .movie-stats-container p {
  font-size: 12px;
  margin-bottom: 8px;
  margin-bottom: 16px;
  color: #fff;
}
#total-info .el-tabs {
  margin-top: 80px;
}
#total-info .mod-title h3 {
  display: inline-block;
  margin: 0;
  padding: 0;
  font-weight: 400;
  font-size: 18px;
  color: #333;
  line-height: 18px;
}
#total-info .mod-title h3::before {
  float: left;
  content: "";
  display: block;
  width: 4px;
  height: 18px;
  margin-right: 6px;
  background-color: #409eff;
}
#total-info .mod-content {
  margin-top: 20px;
  color: #333;
}
#total-info .mod-content span {
  font-size: 14px;
  line-height: 26px;
  text-indent: 2em;
}
</style>
<style>
.el-tabs__item {
  cursor: pointer;
  font-size: 18px !important;
  text-align: center;
}
</style>