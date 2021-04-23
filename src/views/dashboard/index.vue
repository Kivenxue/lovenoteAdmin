<template>
  <div class="container">
    <el-row :gutter="20">
      <template v-for="(item, index) in dataList">
        <el-col :span="8" :key="index">
          <el-card shadow="always" :body-style="{ padding: '20px' }">
            <div slot="header">
              <span>{{ item.title }}</span>
            </div>
            <div>
              {{ item.data }}
            </div>
          </el-card>
        </el-col>
      </template>
    </el-row>
  </div>
</template>

<script>
// import { Bar } from "vue-chartjs";
// import Chart from "@/components/Chart";
export default {
  name: "Dashboard",
  // components: { Chart },
  computed: {},
  data() {
    return {
      dataList: [
        {
          title: "用户量",
          data: 203954,
        },
        {
          title: "情侣数",
          data: 2020,
        },
        {
          title: "评论数",
          data: 10000,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
