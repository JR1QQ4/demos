<template>
  <div>
    <FilterType @filterclick="typeclick" :types="typeArr" />
    <FilterType @filterclick="areaclick" :types="areaArr" />
    <FilterType @filterclick="yearclick" :types="timeArr" />
  </div>
</template>

<script>
import FilterType from "@/components/FilterType";
export default {
  name: "filter-items",
  components: {
    FilterType
  },
  data() {
    return {
      typeArr: [
        "全部类型",
        "剧情",
        "喜剧",
        "动作",
        "爱情",
        "科幻",
        "动画",
        "悬疑",
        "惊悚",
        "恐怖",
        "犯罪",
        "同性",
        "音乐",
        "歌舞",
        "传记",
        "历史",
        "战争",
        "西部",
        "奇幻",
        "冒险",
        "灾难",
        "武侠",
        "情色"
      ],
      areaArr: [
        "全部地区",
        "中国大陆",
        "美国",
        "中国香港",
        "中国台湾",
        "日本",
        "韩国",
        "英国",
        "法国",
        "德国",
        "意大利",
        "西班牙",
        "印度",
        "泰国",
        "俄罗斯",
        "伊朗",
        "加拿大",
        "澳大利亚",
        "爱尔兰",
        "瑞典",
        "巴西",
        "丹麦"
      ],
      timeArr: [
        "全部年代",
        "2019",
        "2018",
        "2010年代",
        "2000年代",
        "90年代",
        "80年代",
        "70年代",
        "60年代",
        "更早"
      ]
    };
  },
  methods: {
    typeclick(index) {
      this.$store.commit("changetype", {
        type: this.typeArr[index]
      });
    },
    areaclick(index) {
      this.$store.commit("changearea", {
        area: this.areaArr[index]
      });
    },
    yearclick(index) {
      this.$store.commit("changeyear", {
        year: this.timeArr[index]
      });
    }
  },
  mounted() {}
};
</script>

<style>
</style>