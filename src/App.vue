<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="scss">
.float-right {
  float: right;
}
.float-left {
  float: left;
}
.el-message {
  max-width: 95% !important;
}
.green {
  color: #67c23a;
}
.grey {
  color: #909399;
}
.red {
  color: #f56c6c;
}
.blue {
  color: #409eff;
}
.block-btn {
  display: block;
  width: 100%;
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>
