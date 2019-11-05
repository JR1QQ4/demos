<template>
  <ul class="category">
    <li @click="clickHandle(index)" :key="item" v-for="(item, index) in types">
      <span :class="index == checkedIndex? 'checkedTag' : ''">{{ item }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: "filter-type",
  props: {
    types: Array
  },
  data() {
    return {
      checkedIndex: 0
    };
  },
  methods: {
    clickHandle(index) {
      this.checkedIndex = index;
      this.$emit("filterclick", index);
    }
  }
};
</script>

<style scoped>
.category {
  margin: 17px 0;
  display: flex;
  flex-wrap: wrap;
}
.category li {
  margin-right: 3px;
  padding-top: 3px;
}
.category li span {
  display: inline-block;
  padding: 2px 10px;
  font-size: 14px;
  cursor: pointer;
}
.category li span:hover {
  color: #409eff;
}
.category li span.checkedTag {
  background: #409eff;
  color: #fff;
}
</style>