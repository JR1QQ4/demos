<template>
  <div id="nav">
    <h1>
      <a href="https://movie.douban.com/"></a>
    </h1>
    <ul>
      <li @click="activeIndex = 0" :class="{'active' : activeIndex == 0 }">
        <router-link to="/home">首页</router-link>
      </li>
      <li @click="activeIndex = 1" :class="{'active' : activeIndex == 1 }">
        <router-link to="/movie/top250">电影</router-link>
      </li>
      <li @click="activeIndex = 2" :class="{'active' : activeIndex == 2 }">
        <router-link to="/about">关于</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "navbar",
  data() {
    return {
      activeIndex: 0
    };
  },
  mounted() {
    if (location.pathname.includes("home")) {
      this.activeIndex = 0;
    } else if (location.pathname.includes("movie")) {
      this.activeIndex = 1;
    } else {
      this.activeIndex = 2;
    }
  }
};
</script>

<style scoped>
#nav {
  width: 1140px;
  margin: 0 auto;
  height: 80px;
  line-height: 80px;
  background-color: #fff;
  color: #fff;
  border-bottom: 1px solid #dcdfe6;
  font-size: 16px;  
}
#nav h1 {
  float: left;
  width: 145px;
  height: 80px;
  line-height: 100px;
}
#nav h1 a {
  display: inline-block;
  width: 100%;
  height: 38px;
  opacity: 1;
  background-image: url(../assets/logo.png);
  background-repeat: no-repeat;
  background-size: contain;
}
#nav ul {
  float: right;
}
#nav li {
  float: left;
}
#nav li a {
  display: block;
  height: 80px;
  padding: 0 22px;
  position: relative;
}
#nav li.active a {
  opacity: 1;
  color: #409eff;
}
#nav a::after {
  content: "";
  position: absolute;
  height: 2px;
  width: 100%;
  bottom: 0;
  left: 0;
  background-color: #409eff;
  transform: scale(0);
  transition: all ease 0.8s;
}
#nav li.active a::after {
  transform: scale(1);
}

@media screen and (max-width: 1140px) {
  #nav h1 {
    width: 45px;
  }
  #nav h1 a {
    background-image: url(../assets/nav.png);
  }
  #nav {
    width: 100%;
  }
  #nav li a {
    padding: 0 8px;
  }
}
</style>