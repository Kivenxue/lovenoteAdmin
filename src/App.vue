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
.block-btn {
  display: block;
  width: 100%;
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>
