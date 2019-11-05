<template>
  <el-container v-loading.fullscreen.lock="fullscreenLoading">
    <el-header>
      <el-row :gutter="10">
        <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
          <div class="grid-content bg-purple"></div>
        </el-col>
        <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
          <div class="grid-content bg-purple-light"></div>
        </el-col>
        <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
          <div class="grid-content bg-purple"></div>
        </el-col>
        <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
          <div class="grid-content bg-purple-light"></div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="16">
          <div class="grid-content bg-purple"></div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple"></div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4">
          <div class="grid-content bg-purple"></div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple"></div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple"></div>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <ul class="icon-list">
        <li>
          <span>
            <i class="el-icon-user-solid"></i>
          </span>
        </li>
        <li>
          <span>
            <i class="el-icon-star-on"></i>
          </span>
        </li>
        <li>
          <span>
            <i class="el-icon-star-off"></i>
          </span>
        </li>
        <li>
          <span>
            <i class="el-icon-picture"></i>
          </span>
        </li>
        <li>
          <span>
            <i class="el-icon-s-operation"></i>
          </span>
        </li>
        <li>
          <span>
            <i class="el-icon-menu"></i>
          </span>
        </li>
        <li>
          <span>
            <i class="el-icon-shopping-cart-2"></i>
          </span>
        </li>
        <li>
          <span>
            <i class="el-icon-shopping-bag-2"></i>
          </span>
        </li>
        <li>
          <span>
            <i class="el-icon-coin"></i>
          </span>
        </li>
        <li>
          <span>
            <i class="el-icon-chat-round e"></i>
          </span>
        </li>
        <li>
          <span>
            <i class="el-icon-location-outline"></i>
          </span>
        </li>
        <li>
          <span>
            <i class="el-icon-lollipop"></i>
          </span>
        </li>
      </ul>
      <el-row>
        <el-button>默认按钮</el-button>
        <el-button type="primary">主要按钮</el-button>
        <el-button type="success">成功按钮</el-button>
        <el-button type="info">信息按钮</el-button>
        <el-button type="warning">警告按钮</el-button>
        <el-button type="danger">危险按钮</el-button>
      </el-row>
      <el-row>
        <el-button plain>朴素按钮</el-button>
        <el-button type="primary" plain>主要按钮</el-button>
        <el-button type="success" plain>成功按钮</el-button>
        <el-button type="info" plain>信息按钮</el-button>
        <el-button type="warning" plain>警告按钮</el-button>
        <el-button type="danger" plain>危险按钮</el-button>
      </el-row>
      <el-row>
        <el-button round>圆角按钮</el-button>
        <el-button type="primary" round>主要按钮</el-button>
        <el-button type="success" round>成功按钮</el-button>
        <el-button type="info" round>信息按钮</el-button>
        <el-button type="warning" round>警告按钮</el-button>
        <el-button type="danger" round>危险按钮</el-button>
      </el-row>
      <el-row>
        <el-button icon="el-icon-search" circle></el-button>
        <el-button type="primary" icon="el-icon-edit" circle></el-button>
        <el-button type="success" icon="el-icon-check" circle></el-button>
        <el-button type="info" icon="el-icon-message" circle></el-button>
        <el-button type="warning" icon="el-icon-star-off" circle></el-button>
        <el-button type="danger" icon="el-icon-delete" circle></el-button>
      </el-row>
      <el-row :gutter="10">
        <el-button-group>
          <el-button type="primary" icon="el-icon-arrow-left">上一页</el-button>
          <el-button type="primary">
            下一页
            <i class="el-icon-arrow-right el-icon--right"></i>
          </el-button>
        </el-button-group>
        <el-button-group>
          <el-button type="primary" icon="el-icon-edit"></el-button>
          <el-button type="primary" icon="el-icon-share"></el-button>
          <el-button type="primary" icon="el-icon-delete"></el-button>
        </el-button-group>
      </el-row>
      <el-row>
        <el-switch
          style="margin-right: 10px;"
          v-model="value1"
          active-color="#13ce66"
          inactive-color="#ff4949"
        ></el-switch>
        <el-switch
          v-model="value2"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-text="按月付费"
          inactive-text="按年付费"
        ></el-switch>
      </el-row>
      <el-row>
        <el-slider v-model="sliderValue"></el-slider>
      </el-row>
      <el-row>
        <el-rate v-model="value" disabled show-score text-color="#ff9900" score-template="{value}"></el-rate>
      </el-row>
      <el-table
        v-loading="loading"
        :data="tableData"
        height="250"
        :row-class-name="tableRowClassName"
        border
        style="width: 100%"
      >
        <el-table-column prop="date" label="日期" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
      </el-table>
      <el-pagination background layout="prev, pager, next" :total="250" :page-size="25"></el-pagination>
      <el-carousel indicator-position="outside">
        <el-carousel-item v-for="item in 4" :key="item">
          <h3>{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
      <el-collapse v-model="activeNames" @change="handleChange" accordion>
        <el-collapse-item title="一致性 Consistency" name="1">
          <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
          <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
        </el-collapse-item>
        <el-collapse-item title="反馈 Feedback" name="2">
          <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
          <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
        </el-collapse-item>
        <el-collapse-item title="效率 Efficiency" name="3">
          <div>简化流程：设计简洁直观的操作流程；</div>
          <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
          <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
        </el-collapse-item>
        <el-collapse-item title="可控 Controllability" name="4">
          <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
          <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
        </el-collapse-item>
      </el-collapse>
      <el-calendar v-model="dateValue"></el-calendar>
      <el-image></el-image>
    </el-main>
    <el-footer>
      <el-steps :active="active" finish-status="success">
        <el-step title="步骤 1"></el-step>
        <el-step title="步骤 2"></el-step>
        <el-step title="步骤 3"></el-step>
      </el-steps>
      <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
    </el-footer>    
  </el-container>
</template>

<script>
export default {
  name: "example",
  data() {
    return {
      value1: true,
      value2: true,
      sliderValue: 30,
      value: 3.7,
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      loading: false,
      fullscreenLoading: false,
      active: 0,
      activeNames: [""],
      dateValue: new Date()
    };
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 == 1) {
        return "warning-row";
      } else if (rowIndex % 2 == 0) {
        return "success-row";
      }
    },
    next() {
      if (this.active++ > 2) this.active = 0;
    },
    handleChange(val) {
    }
  }
};
</script>

<style scoped>
.el-container {
  width: 1140px;
  margin: 0 auto;
}
.el-header,
.el-main,
.el-footer {
  height: auto !important;
  width: 100%;
  padding: 0 30px;
}
.el-footer {
  margin: 30px 0;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.el-row {
  margin: 10px 0;
}
.el-col {
  border-radius: 4px;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.icon-list {
  overflow: hidden;
  border-top: 1px solid #eee;
  border-left: 1px solid #eee;
}
.icon-list li {
  float: left;
  height: 60px;
  width: 16.66%;
  line-height: 60px;
  text-align: center;
  border-right: 1px solid #eee;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}
.icon-list li i {
  display: inline-block;
  font-size: 32px;
  color: #606266;
  transition: color 0.15s linear;
}
.icon-list li:hover i {
  color: #409eff;
}
.el-button-group {
  margin: 0 5px;
}
.el-table .warning-row {
  background: oldlace;
}
.el-table .success-row {
  background: #f0f9eb;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.el-image {
  width: 300px;
  height: 200px;
  text-align: center;
  border-right: 1px solid #eff2f6;
  display: inline-block;
  vertical-align: top;
}
.el-pagination {
  margin:  10px 0;
}
@media (max-width: 1140px) {
  .el-container {
    width: 100%;
  }
}
</style>