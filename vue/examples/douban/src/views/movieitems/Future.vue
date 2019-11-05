<template>
  <div id="future">
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
  name: "future",
  data() {
    return {
      jsondata: [],
      src: "assets/img/upcoming/p"
    };
  },
  methods: {
    getdata() {
      this.axios
        .get("/data/upcoming.json")
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
    document.querySelector("title").innerHTML = "即将上映";
    this.getdata();
  }
};
</script>
<style scoped>
#future .lists {
  margin-top: 20px;
}
#future .list-item {
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