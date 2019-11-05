<template>
  <div id="home">
    <h2>使用 Vue2.x + Element 开发的电影页面</h2>
    <div class="jumbotron">
      <img src="@/assets/img/base/theme-blue.png" alt="blue" />
      <div class="jumbotron-red" ref="display" :style="{height:this.heightScroll + 'px'}">
        <img src="@/assets/img/base/theme-red.png" alt="red" />
      </div>
    </div>
    <Example />
  </div>
</template>

<script>
import Example from "@/components/Example.vue";

export default {
  name: "home",
  data() {
    return {
      scroll: ""
    };
  },
  computed: {
    heightScroll() {
      return this.scroll > 590 ? 590 : this.scroll;
    }
  },
  methods: {
    handleScroll() {
      this.scroll =
        document.documentElement.scrollTop || document.body.scrollTop;
    }
  },
  components: {
    Example
  },
  mounted() {
    document.querySelector("title").innerHTML = "首页";
    window.addEventListener("scroll", this.handleScroll, false);
  },
  destroyed: function() {
    window.removeEventListener("scroll", this.handleScroll, false);
  }
};
</script>

<style scoped>
#home h2 {
  padding: 30px 0 20px;
  text-align: center;
  font-size: 34px;
}
.jumbotron {
  width: 890px;
  margin: 30px auto;
  position: relative;
}
.jumbotron img {
  width: 100%;
}
.jumbotron-red {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 0;
  overflow: hidden;
}
.el-backtop {
  position: fixed;
  right: 40px;
  bottom: 40px;
  background-color: #fff;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: #409eff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
  cursor: pointer;
  z-index: 5;
}
@media screen and (max-width: 890px) {
  .jumbotron {
    display: none;
  }
}
</style>
