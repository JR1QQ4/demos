<template>
  <div id="hot">
    <ul class="lists">
      <li v-for="item in jsondata" :key="item.id" class="list-item">
        <OtherItem :objdata="item" :src="src" />
      </li>
    </ul>
  </div>
</template>

<script>
import OtherItem from "@/components/OtherItem.vue";
export default {
  name: "hot",
  data() {
    return {
      jsondata: [],
      src: "assets/img/nowplaying/p"
    };
  },
  methods: {
    getdata() {
      this.axios
        .get("/data/nowplaying.json")
        .then(res => {
          this.jsondata = res.data;
        })
        .then(err => {});
    }
  },
  components: {
    OtherItem
  },
  mounted() {
    document.querySelector("title").innerHTML = "正在上映";
    this.getdata();
  }
};
</script>

<style scoped>
#hot .lists {
  margin-top: 20px;
}
#hot .list-item {
  display: inline-block;
  vertical-align: top;
  letter-spacing: normal;
  word-spacing: normal;
  text-align: center;
  width: 115px;
  margin: 0 0 32px 25px;
  overflow: hidden;
}
</style>