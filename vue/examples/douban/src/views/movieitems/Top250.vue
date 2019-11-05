<template>
  <div id="top250">
    <keep-alive>
      <div v-if="!showTotalInfo">
        <el-container>
          <el-header height="auto">
            <FilterItems />
          </el-header>
          <el-main>
            <ul v-if="arr.length != 0 && !loading" class="lists">
              <li class="list-item" v-for="item in arr" :key="item.id">
                <MovieItem @handleSubmit="changeDiaplay" ref="item" :itemobj="item" :src="imgSrc" />
              </li>
            </ul>
            <div
              v-else-if="arr.length == 0 && !loading"
              style="line-height: 200px; text-align: center;"
            >
              <p>当前筛选没有找到结果</p>
            </div>
            <div
              v-else
              element-loading-background="rgba(255, 255, 255, 0.8)"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              v-loading="loading"
              style="height: 200px"
            ></div>
          </el-main>
          <el-footer>
            <el-pagination
              @current-change="handleCurrentChange"
              background
              :page-size="25"
              layout="prev, pager, next"
              :total="250"
            ></el-pagination>
          </el-footer>
        </el-container>
      </div>
      <div v-else>
        <MovieInfo @showall="showall" :item="displayObj" :src="imgSrc" />
      </div>
    </keep-alive>
  </div>
</template>

<script>
import FilterItems from "@/components/FilterItems.vue";
import MovieItem from "@/components/MovieItem.vue";
import MovieInfo from "@/components/MovieInfo.vue";

export default {
  name: "top250",
  computed: {
    arr() {
      let type = this.$store.state.filters.types;
      let area = this.$store.state.filters.areas;
      let year = this.$store.state.filters.years;
      if (this.top250.length != 0) {
        this.loading = false;
      }
      let newArr = this.top250
        .filter(item => {
          if (type == "全部类型") {
            return item;
          }
          return item.types.includes(type);
        })
        .filter(item => {
          if (area == "全部地区") {
            return item;
          }
          return item.area.includes(area);
        })
        .filter(item => {
          if (year == "全部年代") {
            return item;
          }
          let t = item.time.match(/(\d+)/)[0];
          switch (year) {
            case "2019":
              return t == 2019;
            case "2018":
              return t == 2018;
            case "2010年代":
              return t >= 2010 && t < 2020;
            case "2000年代":
              return t >= 2000 && t < 2010;
            case "90年代":
              return t >= 1900 && t < 2000;
            case "80年代":
              return t >= 1800 && t < 1900;
            case "70年代":
              return t >= 1700 && t < 1800;
            case "60年代":
              return t >= 1600 && t < 1700;
            default:
              return t < 1600;
          }
        });
      return newArr.slice(this.start, this.end);
    }
  },
  components: {
    FilterItems,
    MovieItem,
    MovieInfo
  },
  data() {
    return {
      start: 0,
      end: 25,
      top250: [],
      showTotalInfo: false,
      imgSrc: "assets/img/top250/",
      displayObj: null,
      loading: true
    };
  },
  methods: {
    getData() {
      this.axios
        .get("/data/top250.json")
        .then(response => {
          this.top250 = response.data.data;
        })
        .then(err => {});
    },
    handleCurrentChange(val) {
      this.start = (val - 1) * 25;
      this.end = val * 25;
    },
    changeDiaplay(obj) {
      this.displayObj = obj;
      this.showTotalInfo = true;
      location.hash = obj.id;
    },
    showall() {
      this.showTotalInfo = false;
    }
  },
  created() {
    document.querySelector("title").innerHTML = "TOP250";
    this.getData();
  },
  mounted() {}
};
</script>

<style scoped>
#top250 {
  width: calc(100% - 120px);
}
.list-item {
  display: inline-block;
  vertical-align: top;
  letter-spacing: normal;
  word-spacing: normal;
  text-align: center;
  width: 115px;
  margin: 0 0 32px 25px;
}
</style>